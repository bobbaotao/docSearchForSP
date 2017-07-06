<template>
  <div class="container">
    <el-row :gutter="0" class="bigRow">
      <el-col :span="2" :offset="2">
        <img class="topLogo" src="../assets/Logo.png" />
      </el-col>
      <el-col :span="18">
        <h1>ZEISS Knowledge Management System</h1>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="bigRow">
      <el-col :span="3" :offset="2">
          <LeftNavigation></LeftNavigation>
      </el-col>
      <el-col :span="17">
        <div class="searchContainer" >
          <el-row :gutter="10" class="bigRow">
            <el-col :span="12" :offset="6">
              <el-input placeholder="Please input keywords" icon="search" v-model="searchKeywords" :on-icon-click="search">
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="bigRow btnRow">
            <!-- <el-col :span="4" :offset="8">
              <el-button type="primary" icon="search" v-on:click="search" :disabled="searchKeywords == null || searchKeywords == '' || searchKeywords.trim() == ''">Search</el-button>
            </el-col> -->
            <el-col :span="4" :offset="10">
              <el-button type="primary" icon="plus" v-on:click="advancedSearch">Advanced Search</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="bigRow ImgLinkRow">
              <el-col :span="6" :offset="3">
                <div class="linkBox" v-on:click="searchByType('Market research')">
                  <img class="docTypeImg" src="../assets/MarketResearch.png" />
                  <br />
                  Market Research
                </div>
              </el-col>
              <el-col :span="6">
                <div class="linkBox" v-on:click="searchByType('Strategic planning')">
                  <img class="docTypeImg" src="../assets/StrategicPlanning.png" />
                  <br />
                  Strategic Planning
                </div>
              </el-col>
              <el-col :span="6">
                <div class="linkBox" v-on:click="searchByType('Financial Reporting & Analysis')">
                  <img class="docTypeImg" src="../assets/FinancialReportingAnalysis.png" />
                  <br />
                  Financial Reporting & Analysis
                </div>
              </el-col>
          </el-row>
          <el-row :gutter="20" class="bigRow">
            <el-col :span="6" :offset="3">
              <div class="linkBox" v-on:click="searchByType('Articles & Reports')">
                <img class="docTypeImg" src="../assets/ArticlesReports.png" />
                <br />
                Articles & Reports
              </div>
            </el-col>
            <el-col :span="6">
              <div class="linkBox" v-on:click="searchByType('Project documents')">
                <img class="docTypeImg" src="../assets/ProjectDocuments.png" />
                <br />
                Project Documents
              </div>
            </el-col>
            <el-col :span="6">
              <div class="linkBox" v-on:click="searchByType('Budgeting')">
                <img class="docTypeImg" src="../assets/Budgeting.png" />
                <br />
                Budgeting
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  var array = require('array');
 import LeftNavigation from './LeftNavigation';

  export default {
      name: "SearchBox",
      data () {
        return {
          isNormalSearch : true,
          searchKeywords: "",
          departmentOptions: [{value: "MED"},{value: "MIK"},{value: "IMT"},{value: "Strategy"},{value: "Others"}],
          projectDocTypeOptions:[{value: "Startegy"},{value: "Financial Report"},{value: "Economic Report"},{value: "Marketing Report"},{value: "Others"}]
        }
      },
      components: {LeftNavigation},
      methods: {
        search: function() {
          var strquery = "<Where><Or><Or><Or><Or><Or><Contains><FieldRef Name='Title' /><Value Type='Text'><![CDATA[" + this.searchKeywords.trim() +
            "]]></Value></Contains><Contains><FieldRef Name='TaxKeyword' /><Value Type='TaxonomyFieldTypeMulti'><![CDATA[" + this.searchKeywords.trim()
             + "]]></Value></Contains></Or><Contains><FieldRef Name='FileLeafRef' /><Value Type='Text'><![CDATA[" + this.searchKeywords.trim() +
             "]]></Value></Contains></Or><Contains><FieldRef Name='ZeissProjectName' /><Value Type='Text'><![CDATA[" + this.searchKeywords.trim()
             + "]]></Value></Contains></Or><Eq><FieldRef Name='ZeissDepartmentOfDoc' /><Value Type='Choice'><![CDATA[" + this.searchKeywords.trim()
             + "]]></Value></Eq></Or> <Eq><FieldRef Name='ZeissProjectDocType' /><Value Type='Choice'><![CDATA[" + this.searchKeywords.trim() +
             "]]></Value></Eq></Or></Where>";

          //this.$emit("dosearch", strquery);
          this.$router.push({name: 'SearchPage', params: {queryText: strquery}});
        },
        advancedSearch: function() {
          this.$router.push({name: 'AdvancedSearch'});
        },
        searchByType: function(docType) {
          var strquery = "<Where><Eq><FieldRef Name='ZeissProjectDocType' /><Value Type='Choice'><![CDATA["
            + docType + "]]></Value></Eq></Where>"

            this.$router.push({name: 'SearchPage', params: {queryText: strquery, isGroup : true, groupKey: "ZeissProjectDocType"}});
        }
        //,
        // runSearchWhenEnter: function() {
        //   var x;
        //   if(window.event) // IE8 以及更早版本
        //   {
        //   	x=event.keyCode;
        //   }
        //   else if(event.which) // IE9/Firefox/Chrome/Opera/Safari
        //   {
        //   	x=event.which;
        //   }
        //
        //   if(x==13) {
        //     search();
        //   }
        // }
      }
  }
</script>

<style scoped>
.container
{
  display: block;
}

.searchSwitchContainer
{
  padding-top: 20px;
  display: block;
}
.searchContainer
{
  padding-top: 15px;
  display: block;
  width: 100%;
}
.bigRow
{
  padding-top: 15px;
}
.btnRow
{
  margin-top: 15px;
}
.docTypeImg
{
  width: 64px;
}
.ImgLinkRow
{
  margin-top: 40px;
  margin-bottom: 25px;
}
.topLogo
{
  width:70px;
}
.linkBox
{
  cursor: pointer;
}
</style>
