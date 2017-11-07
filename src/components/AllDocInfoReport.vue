<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="2">
        <el-button type="primary" size="small" v-on:click="DownloadReport">Export to Excel
        </el-button>
      </el-col>
    </el-row>
    <el-row class="smallRow">
      <el-col :span="22" :offset="1">
        <el-table :data="reportData" stripe >
            <el-table-column label="Type" :width="230" prop="ZeissProjectDocType">
            </el-table-column>
            <el-table-column label="Department" :width="180" prop="ZeissDepartmentOfDoc">
            </el-table-column>
            <el-table-column label="Title" prop="Title">
            </el-table-column>
            <el-table-column label="Created" :width="180" prop="Created">
            </el-table-column>
            <el-table-column label="Author" :width="160" prop="Author">
            </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  import Utility from './Utility';
  import FileSaver from "file-saver";
  import { csvParse, csvParseRows, tsvParse, tsvParseRows, csvFormat, csvFormatRows, tsvFormat, tsvFormatRows } from "d3-dsv";
  var JSON2 = require('JSON2');
  var array = require('array');
  var moment = require('moment')

  export default {
    name: "AllDocInfoReport",
    data() {
      return {
        reportData: []
      }
    },
    created: function() {
      this.CheckPermission();
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
        var requestUrl = "../../../_vti_bin/Zeiss.DocManagement/DocMService.svc/CheckPermission/DocReportAllowedAccounts";
        this.ShowLoadingView();
        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          if(response.data && response.data.CheckPermissionResult && response.data.CheckPermissionResult.success) {
            this.loadAllDocReport();
          } else {
            this.$message.error(response.data.CheckPermissionResult.message);
          }

        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },
      loadAllDocReport: function() {
        this.ShowLoadingView();
        const requestUrl = "../../../_vti_bin/Zeiss.DocManagement/DocMService.svc/Search";
        //const requestUrl = "http://localhost:3000/doc/docsearch";   //for test
        var requestData = {
          param : {
            query: "<Where></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy>",
            viewFields: "<FieldRef Name='FileLeafRef' /><FieldRef Name='FileRef' /><FieldRef Name='Title' /><FieldRef Name='Created' />" +
            "<FieldRef Name='File_x0020_Type' /><FieldRef Name='ZeissProjectDocType' /><FieldRef Name='Author' /><FieldRef Name='ZeissDocAuthor' />" +
            "<FieldRef Name='ZeissDepartmentOfDoc' />",
            webScope: "<Webs Scope='Recursive'>",
            listScope: "<Lists ServerTemplate='10068' />",
            rowLimit: "50000"
          }
        };

        this.axios.post(requestUrl,requestData).then((response) => {
          this.HideLoadingView();

          if(response.data && response.data.SearchDocByKeyResult && response.data.SearchDocByKeyResult.success){
            var resultRows = JSON2.parse(response.data.SearchDocByKeyResult.data);
            var arrData = new array();
            for(var i = 0; i< resultRows.length; i++) {
              var rowItem = resultRows[i];
              if(rowItem.File_x0020_Type != null && rowItem.File_x0020_Type != "") {
                arrData.push(rowItem);
              }
            }

            this.reportData = arrData.toArray();
          } else {
            this.$message.error("Load data failed!");
          }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },
      DownloadReport: function() {
        var csvContent = csvFormat(this.reportData, ["ZeissProjectDocType", "ZeissDepartmentOfDoc", "Title", "Created","Author"]);
        var mime_type = "text/csv;charset=utf-8";
        var strNow = moment().format(Utility.dateFormat);

        var filename = "Doc List Report.csv";
        var file = new Blob([csvContent], {type: mime_type});

        FileSaver.saveAs(file, filename);
      }
    }
  }
</script>

<style scoped>
.smallRow {
  padding-top: 10px;
}
</style>
