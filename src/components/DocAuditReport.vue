<template>
  <div v-if="showReport">
    <el-row>
      <el-col :span="12" :offset="1" style="text-align:left">
        <el-date-picker v-model="dateRange" :picker-options="drOptions"
                        type="daterange" placeholder="Please Select Date Range">
        </el-date-picker>
        <el-button type="primary" icon="Search" v-on:click="LoadReportFromServer">Search
        </el-button>
        <!-- <el-button type="primary" icon="Search" v-on:click="test">Search
        </el-button> -->
      </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" icon="Download" v-on:click="downloadReport">Downoad Report
          </el-button>
        </el-col>
    </el-row>
    <el-row class="smallRow">
      <el-col :span="15" :offset="1">
        <div ref="chartDiv" style="height: 400px">
          <IEcharts ref="echart" :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
        </div>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-table :data="auditSummaryByUserData" stripe :height="tbHeight" >
          <el-table-column label="User Name"  prop="userName"
              sortable>
          </el-table-column>
          <el-table-column label="Download Times" prop="number"
              sortable>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  import { Loading } from 'element-ui';
  import Utility from './Utility';
  import FileSaver from "file-saver";
  import { csvParse, csvParseRows, tsvParse, tsvParseRows, csvFormat, csvFormatRows, tsvFormat, tsvFormatRows } from "d3-dsv";
  var JSON2 = require('JSON2');
  var array = require('array');

  export  default {
    name: 'DocAuditReport',
    data() {
      var size = {
          width: window.innerWidth || document.body.clientWidth,
          height: window.innerHeight || document.body.clientHeight
      };
      return {
        showReport: false,
        dateRange: '',
        strStart: '',
        strEnd: '',
        auditResponseData: [],
        loading: true,
        showLength: 12,
        auditSummaryByUserData: [],
        size,
        bar: {
          title: {
            text: 'Audit Report By user'
          },
          tooltip: {},
          xAxis: {
            type: 'value',
            data: []
          },
          yAxis: {
            type: 'category',
            data: []
          },
          series: [{
            name: 'User',
            type: 'bar',
            barMaxWidth: 30,
            data: []
          }]
        },
        showChart: false,
        drOptions: {
          shortcuts:[
          {
            text: 'Last Week',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: 'Last 30 Days',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: 'Last 90 Days',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    created: function() {
      this.CheckPermission();
    },
    computed: {
      tbHeight: function() {
        return this.size.height - 90;
      }
    },
    components: {
      IEcharts
    },
    methods: {
      ShowLoadingView: function() {
        Loading.service({ fullscreen: true });
      },
      HideLoadingView: function() {
        let curLoadingInstance = Loading.service({ fullscreen: true });
        curLoadingInstance.close();
      },
      CheckPermission: function() {
        var requestUrl = "../../../_vti_bin/Zeiss.DocManagement/DocMService.svc/CheckPermission/AuditReportAllowedAccounts";
        this.ShowLoadingView();
        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          if(response.data && response.data.CheckPermissionResult && response.data.CheckPermissionResult.success) {
            this.showReport = true;
          } else {
            this.$message.error(response.data.CheckPermissionResult.message);
          }

        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },
      LoadReportFromServer: function() {
        if(this.dateRange != null && this.dateRange != '' && this.dateRange.length && this.dateRange.length == 2) {
          var startDate = Utility.formatDateToString(this.dateRange[0]);
          var endDate = Utility.formatDateToString(this.dateRange[1]);
          this.strStart = startDate;
          this.strEnd = endDate;
          var requestUrl = "../../../_vti_bin/Zeiss.DocManagement/DocMService.svc/LoadAuditInfo/"
                          + startDate + "/" + endDate;
          this.ShowLoadingView();
          this.loading = true;
          this.axios.post(requestUrl).then((response) => {
            this.HideLoadingView();
            if(response.data && response.data.LoadAuditInfoResult && response.data.LoadAuditInfoResult.success) {
              var auditDatas = JSON2.parse(response.data.LoadAuditInfoResult.data);
              this.auditResponseData =  auditDatas;
              this.setChartData();

            } else if (response.data && response.data.LoadAuditInfoResult){
              this.$message.error(response.data.LoadAuditInfoResult.message)
            } else {
              this.$message.error(response.message);
            }
          }).catch((error) => {
            this.HideLoadingView();
            this.$message.error(error.message);
          });

        } else {
          this.HideLoadingView();
          this.$message.error("Please select date range!");
        }
      },
      setChartData: function() {
        this.$refs.chartDiv.style.height = this.tbHeight + "px";
        this.$refs.echart.resize();
        if(this.auditResponseData.length == 0) {
          this.loading = true;
          this.$message.error("Can't find any user view history!");
        }
        var auditArr = new array();
        for(var i=0; i<this.auditResponseData.length; i++) {
          var auditItem = this.auditResponseData[i];
          //auditItem.occDate = Utility.formatDateToString(auditItem.occTime);
          auditArr.push(auditItem);
        }

        var uniqueUser = auditArr.unique('userName');
        var uniqueDoc = auditArr.unique('docName');

        var auditGroupByUser = new array();
        for(var i=0; i<uniqueUser.length; i++) {
          var count =  auditArr.count((item) => {
            return item.userName == uniqueUser[i].userName;
          });
          auditGroupByUser.push({userName: uniqueUser[i].userName, number: count});
        }
        auditGroupByUser.sort('number', -1);
        this.auditSummaryByUserData =  auditGroupByUser.toArray();

        if(auditGroupByUser.length > this.showLength) {
          var count = 0;
          for(var i = this.showLength - 1; i < auditGroupByUser.length; i++) {
            count+= auditGroupByUser[i].number;
          }
          auditGroupByUser = array(auditGroupByUser.slice(0,this.showLength -1));
          auditGroupByUser.sort('number', 1);
          auditGroupByUser.splice(0,0,{userName: 'Others', number: count});
        } else {
            auditGroupByUser.sort('number', 1);
        }

        var userNameArr = auditGroupByUser.map('userName').toArray();
        var userNameNumArr = auditGroupByUser.map('number').toArray();
        this.bar.yAxis.data = userNameArr;
        this.bar.series[0].data = userNameNumArr;
        this.loading = false;

        // var auditGroupByDoc = new array();
        // for(var i=0; i<uniqueDoc.length; i++) {
        //   var count =  auditArr.count((item) => {
        //     return item.docName == uniqueDoc[i].docName;
        //   });
        //   auditGroupByDoc.push({userName: uniqueDoc[i].docName, number: count});
        // }
      },
      downloadReport: function() {
        var csvContent = csvFormat(this.auditSummaryByUserData, ["userName", "number"]);
        var mime_type = "text/csv;charset=utf-8";
        var filename = "Doc Download Report_" + this.strStart + "__" + this.strEnd + ".csv";
        var file = new Blob([csvContent], {type: mime_type});

        FileSaver.saveAs(file, filename);
      },
      onReady(instance) {
        console.log(instance);
      },
      onClick(event, instance, echarts) {
        console.log(arguments);
      },
      test: function() {
        var testData = [];
        var a = {userID: 1, userName: "Bob Bao", docName: "xxx.pdf"};
        var b = {userID: 2, userName: "xx", docName: "dg.pdf"};
        var c = {userID: 3, userName: "yy", docName: "dgd.pdf"};
        var d = {userID: 4, userName: "dd", docName: "bg.pdf"};
        var e = {userID: 11, userName: "ee", docName: "5hg.pdf"};
        var f = {userID: 21, userName: "ds", docName: "mh.pdf"};
        var g = {userID: 13, userName: "ewr", docName: "dfg.pdf"};
        var h = {userID: 14, userName: "dsfe", docName: "iy.pdf"};
        var i = {userID: 16, userName: "vv", docName: "sw.pdf"};
        var j = {userID: 7, userName: "s32", docName: "xxx.pdf"};
        var k = {userID: 9, userName: "fdj", docName: "bvr.pdf"};
        var l = {userID: 6, userName: "ui", docName: "tr.pdf"};
        var m = {userID: 37, userName: "jk", docName: "xfht.pdf"};
        var n = {userID: 27, userName: "uy", docName: "d.pdf"};
        var o = {userID: 45, userName: "bht", docName: "z.pdf"};
        var p = {userID: 43, userName: "tyhd", docName: "e.pdf"};
        testData.push(a);testData.push(c);testData.push(l);
        testData.push(d);testData.push(a);testData.push(a);
        testData.push(e);testData.push(i);testData.push(l);
        testData.push(p);testData.push(i);testData.push(l);
        testData.push(d);testData.push(i);testData.push(l);
        // testData.push(e);testData.push(i);testData.push(a);
        // testData.push(b);testData.push(i);testData.push(l);
        // testData.push(c);testData.push(c);testData.push(p);
        // testData.push(c);testData.push(c);testData.push(k);
        // testData.push(h);testData.push(c);testData.push(k);
        // testData.push(h);testData.push(g);testData.push(a);
        // testData.push(i);testData.push(g);testData.push(k);
        // testData.push(i);testData.push(a);testData.push(k);
        // testData.push(f);testData.push(g);testData.push(o);
        //testData.push(d);testData.push(a);testData.push(n);
        //testData.push(b);testData.push(a);testData.push(m);

        this.auditResponseData = testData;
        this.setChartData();
      }
    }
  }
</script>

<style scoped>
  .smallRow {
    padding-top: 15px;
  }
</style>
