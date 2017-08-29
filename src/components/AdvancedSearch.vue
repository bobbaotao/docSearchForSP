<template>
  <div class="container">
    <div class="searchContainer">
      <el-row :gutter="5" class="bigRow returnLink">
        <el-col :span="9" :offset="1">
          <A class="el-icon-d-arrow-left" style="float: left;" v-on:click="backToSearch" >&nbsp;Back to Search</A>
        </el-col>
      </el-row>
      <el-row :gutter="5" class="bigRow">
        <el-col :span="3" class="keywordTitle">
          Title:
        </el-col>
          <el-col :span="2">
            <el-select v-model="csTitleKeywords">
              <el-option v-for="item in conditionOptions" :key="item.value" :label="item.value" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        <el-col :span="7">
          <el-input placeholder="Please input Title" v-model="titleKeywords">
          </el-input>
        </el-col>
        <el-col :span="3" class="keywordTitle">
          Keywords:
        </el-col>
        <el-col :span="2">
          <el-select v-model="csSearchKeywords">
            <el-option v-for="item in conditionOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input placeholder="Please input keywords" v-model="searchKeywords">
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="5" class="bigRow">
        <el-col :span="3" class="keywordTitle">
          Project Name:
        </el-col>
        <el-col :span="2">
          <el-select v-model="csProjectNameKeywords">
            <el-option v-for="item in conditionOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input placeholder="Project Name" v-model="projectNameKeywords">
          </el-input>
        </el-col>
        <el-col :span="3" class="keywordTitle">
          Description:
        </el-col>
        <el-col :span="2">
          <el-select v-model="csProjectDesKeywords">
            <el-option v-for="item in conditionOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input placeholder="Project Description" v-model="projectDescriptionKeywords">
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="5" class="bigRow">
        <el-col :span="3" class="keywordTitle">
          Created Date
        </el-col>
        <el-col :span="2">
          <el-select v-model="csCreatedDate">
            <el-option v-for="item in conditionOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
           <el-date-picker style="float:left; width:100%" v-model="createDateFrom" type="date" :editable=false placeholder="Please Select From Date">
          </el-date-picker>
        </el-col>

        <el-col :span="7">
          <el-date-picker style="float:left; width:100%" v-model="createDateTo" type="date" :editable=false placeholder="Please Select To Date">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="5" class="bigRow">
        <el-col :span="3" class="keywordTitle">
          Modified Date
        </el-col>
        <el-col :span="2">
          <el-select v-model="csModifiedDate">
            <el-option v-for="item in conditionOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
           <el-date-picker style="float:left; width:100%" v-model="modifiedDateFrom" type="date" :editable=false placeholder="Please Select From Date">
          </el-date-picker>
        </el-col>

        <el-col :span="7">
          <el-date-picker style="float:left; width:100%" v-model="modifiedDateTo" type="date" :editable=false placeholder="Please Select To Date">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="5" class="bigRow">
        <el-col :span="3" class="keywordTitle">
          Author:
        </el-col>
        <el-col :span="2">
          <el-select v-model="csAuthorKeywords">
            <el-option v-for="item in conditionOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input  placeholder="Author English Name" v-model="authorKeywords">
          </el-input>
        </el-col>
        <el-col :span="3" class="keywordTitle">
          Editor:
        </el-col>
        <el-col :span="2">
          <el-select v-model="csEditorKeywords">
            <el-option v-for="item in conditionOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input placeholder="Editor English Name" v-model="editorKeywords">
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="5" class="bigRow">
        <el-col :span="3" class="keywordTitle">
          Department:
        </el-col>
        <el-col :span="2">
          <el-select v-model="csDepartmentKeywords">
            <el-option v-for="item in conditionOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-select  style="float:left; width:100%" v-model="departmentKeywords" :multiple=true clearable placeholder="Please Select Department">
            <el-option v-for="item in departmentOptions"
              :key="item.value" :value="item.value" :label="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3" class="keywordTitle">
          Project or Doc Type:
        </el-col>
        <el-col :span="2">
          <el-select v-model="csProjectDocTypeKeyowrds">
            <el-option v-for="item in conditionOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-select style="float:left; width:100%" v-model="projectDocTypeKeywords" :multiple=true clearable placeholder="Please Select Type">
            <el-option v-for="item in projectDocTypeOptions"
              :key="item.value" :value="item.value" :label="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="5" class="bigRow">
        <el-col :span="3" class="keywordTitle">
          Vendor:
        </el-col>
        <el-col :span="2">
          <el-select v-model="csVendorKeywords">
            <el-option v-for="item in conditionOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input placeholder="Vendor" v-model="vendorKeywords">
          </el-input>
        </el-col>
         <el-col :span="3" class="keywordTitle">
          Fiscal Year:
        </el-col>
        <el-col :span="2">
          <el-select v-model="csFiscalYearKeywords">
            <el-option v-for="item in conditionOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input placeholder="Fiscal Year" v-model="fiscalYearKeywords">
          </el-input>
        </el-col>
      </el-row>
      <el-row  :gutter="5" class="bigRow btnRow">

        <el-col :span="4" :offset="8">
          <el-button type="primary" icon="search" v-on:click="search">Search</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="close" v-on:click="clearParam">Clear Param</el-button>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          {{message}}
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  var array = require('array');

  export default {
      name: "SearchBox",
      data () {
        return {
          //isNormalSearch : true,
          message: "",
          searchKeywords: "",
          csSearchKeywords: "And",
          titleKeywords: "",
          csTitleKeywords: "And",
          projectDescriptionKeywords: "",
          csProjectDesKeywords: "And",
          authorKeywords: "",
          csAuthorKeywords: "And",
          editorKeywords: "",
          csEditorKeywords: "And",
          createDateFrom:"",
          csCreatedDate: "And",
          createDateTo: "",
          modifiedDateFrom:"",
          csModifiedDate: "And",
          modifiedDateTo: "",
          departmentKeywords: "",
          csDepartmentKeywords: "And",
          projectNameKeywords: "",
          csProjectNameKeywords: "And",
          projectDocTypeKeywords: "",
          csProjectDocTypeKeyowrds : "And",
          vendorKeywords: "",
          csVendorKeywords: "And",
          fiscalYearKeywords: "",
          csFiscalYearKeywords: "And",
          conditionOptions: [{value: "And"}, {value: "Or"}],
          departmentOptions: [{value: "MED"},{value: "MIK"},{value: "IMT"},{value: "Vision"},{value: "SHIC"},{value: "CZFS"},{value: "CZIMT"},{value: "CZSZ"},{value: "Corporate"}],
          projectDocTypeOptions:[{value: "Market research"},{value: "Strategic planning"},{value: "Financial Reporting & Analysis"},
          {value: "Articles & Reports"},{value: "Project documents"},{value: "Budgeting"},{value: "Legal Document"}]
        }
      },
      methods: {
        search: function() {
          var strquery="";
            this.message = "";
            var searchConditions = new array();
            var searchOrConditin = new array();

            //push search keywords to array
            if(this.titleKeywords != null && this.titleKeywords != "" && this.titleKeywords.trim() != "") {
              if(this.csTitleKeywords === 'Or') {
                searchOrConditin.push("<Or><Contains><FieldRef Name='Title' /><Value Type='Text'><![CDATA[" + this.titleKeywords.trim() +
                  "]]></Value></Contains><Contains><FieldRef Name='FileLeafRef' /><Value Type='Text'><![CDATA[" + this.titleKeywords.trim() +
                  "]]></Value></Contains></Or>");
              } else {
                searchConditions.push("<Or><Contains><FieldRef Name='Title' /><Value Type='Text'><![CDATA[" + this.titleKeywords.trim() +
                  "]]></Value></Contains><Contains><FieldRef Name='FileLeafRef' /><Value Type='Text'><![CDATA[" + this.titleKeywords.trim() +
                  "]]></Value></Contains></Or>");
              }
            }
            if(this.searchKeywords != null && this.searchKeywords != ""  && this.searchKeywords.trim() != "") {
              if(this.csSearchKeywords === 'Or') {
                searchOrConditin.push("<Contains><FieldRef Name='TaxKeyword' /><Value Type='TaxonomyFieldTypeMulti'><![CDATA[" + this.searchKeywords.trim()
                + "]]></Value></Contains>");
              } else {
                searchConditions.push("<Contains><FieldRef Name='TaxKeyword' /><Value Type='TaxonomyFieldTypeMulti'><![CDATA[" + this.searchKeywords.trim()
                + "]]></Value></Contains>");
              }
            }
            if(this.vendorKeywords != null && this.vendorKeywords != ""  && this.vendorKeywords.trim() != "") {
              if(this.csSearchKeywords === 'Or') {
                searchOrConditin.push("<Contains><FieldRef Name='ZeissVendor' /><Value Type='Text'><![CDATA[" + this.vendorKeywords.trim()
                + "]]></Value></Contains>");
              } else {
                searchConditions.push("<Contains><FieldRef Name='ZeissVendor' /><Value Type='Text'><![CDATA[" + this.vendorKeywords.trim()
                + "]]></Value></Contains>");
              }
            }
            if(this.fiscalYearKeywords != null && this.fiscalYearKeywords != ""  && this.fiscalYearKeywords.trim() != "") {
              if(this.csFiscalYearKeywords === 'Or') {
                searchOrConditin.push("<Contains><FieldRef Name='ZeissFiscalYear' /><Value Type='Text'><![CDATA[" + this.fiscalYearKeywords.trim()
                + "]]></Value></Contains>");
              } else {
                searchConditions.push("<Contains><FieldRef Name='ZeissFiscalYear' /><Value Type='Text'><![CDATA[" + this.fiscalYearKeywords.trim()
                + "]]></Value></Contains>");
              }
            }
            if(this.authorKeywords != null && this.authorKeywords != "" &&  this.authorKeywords.trim() != "") {
              if(this.csAuthorKeywords === 'Or') {
                searchOrConditin.push("<Contains><FieldRef Name='ZeissDocAuthor' /><Value Type='User'><![CDATA["
                  + this.authorKeywords.trim() + "]]></Value></Contains>");
              } else {
                searchConditions.push("<Contains><FieldRef Name='ZeissDocAuthor' /><Value Type='User'><![CDATA["
                  + this.authorKeywords.trim() + "]]></Value></Contains>");
              }
            }
            if(this.editorKeywords != null && this.editorKeywords != "" &&  this.editorKeywords.trim() != "") {
              if(this.csEditorKeywords === 'Or') {
                searchOrConditin.push("<Contains><FieldRef Name='Editor' /><Value Type='User'><![CDATA[" +
                  this.editorKeywords.trim() + "]]></Value></Contains>");
              } else {
                searchConditions.push("<Contains><FieldRef Name='Editor' /><Value Type='User'><![CDATA[" +
                  this.editorKeywords.trim() + "]]></Value></Contains>");
              }
            }
            if(this.projectNameKeywords != null && this.projectNameKeywords != "" &&  this.projectNameKeywords.trim() != "") {
              if(this.csProjectNameKeywords === 'Or') {
                searchOrConditin.push("<Contains><FieldRef Name='ZeissProjectName' /><Value Type='Text'><![CDATA[" +
                this.projectNameKeywords.trim() +"]]></Value></Contains>");
              } else {
                searchConditions.push("<Contains><FieldRef Name='ZeissProjectName' /><Value Type='Text'><![CDATA[" +
                this.projectNameKeywords.trim() +"]]></Value></Contains>");
              }
            }
            if(this.projectDescriptionKeywords != null && this.projectDescriptionKeywords != "" && this.projectDescriptionKeywords.trim() != "") {
              if(this.csProjectDesKeywords === 'Or') {
                searchOrConditin.push("<Contains><FieldRef Name='ZeissDocDes' /><Value Type='Note'><![CDATA[" +
                  this.projectDescriptionKeywords.trim() +"]]></Value></Contains>");
              } else {
                searchConditions.push("<Contains><FieldRef Name='ZeissDocDes' /><Value Type='Note'><![CDATA[" +
                  this.projectDescriptionKeywords.trim() +"]]></Value></Contains>");
              }
            }
            //department allows mutiple select
            if(this.departmentKeywords != null && this.departmentKeywords.length > 0) {
              var strDepartmentQuery = "";
              for(var deprtmentKeyIndex = 0;  deprtmentKeyIndex < this.departmentKeywords.length; deprtmentKeyIndex++)
              {
                if (deprtmentKeyIndex != 0) {
                  strDepartmentQuery = "<Or>" + strDepartmentQuery + "<Eq><FieldRef Name='ZeissDepartmentOfDoc' /><Value Type='Choice'><![CDATA["
                  + this.departmentKeywords[deprtmentKeyIndex] +"]]></Value></Eq></Or>";
                } else {
                  strDepartmentQuery = "<Eq><FieldRef Name='ZeissDepartmentOfDoc' /><Value Type='Choice'><![CDATA["
                  + this.departmentKeywords[deprtmentKeyIndex] +"]]></Value></Eq>";
                }
              }
              if(this.csDepartmentKeywords === 'Or') {
                searchOrConditin.push(strDepartmentQuery);
              } else {
                searchConditions.push(strDepartmentQuery);
              }
            }
            //project doc type allows mutiple select
            if(this.projectDocTypeKeywords != null && this.projectDocTypeKeywords.length > 0)
            {
              var strProjectTypeQuery = "";
              for(var projectTypeIndex = 0; projectTypeIndex < this.projectDocTypeKeywords.length; projectTypeIndex++){
                if(projectTypeIndex != 0) {
                  strProjectTypeQuery = "<Or>" + strProjectTypeQuery + "<Eq><FieldRef Name='ZeissProjectDocType' /><Value Type='Choice'><![CDATA["
                   + this.projectDocTypeKeywords[projectTypeIndex] + "]]></Value></Eq></Or>";
                } else {
                  strProjectTypeQuery = "<Eq><FieldRef Name='ZeissProjectDocType' /><Value Type='Choice'><![CDATA[" + this.projectDocTypeKeywords[projectTypeIndex] + "]]></Value></Eq>";
                }
              }

              if(this.csProjectDocTypeKeyowrds === 'Or') {
                searchOrConditin.push(strProjectTypeQuery);
              } else {
                searchConditions.push(strProjectTypeQuery);
              }
            }

            //create date from and to was consider as one parameter
            var strQueryCreatedDate = "";
            if(this.createDateFrom != null && this.createDateFrom != "")
            {
              var month = this.createDateFrom.getMonth() + 1;
              strQueryCreatedDate = "<Geq><FieldRef Name='Created' /><Value IncludeTimeValue='FALSE' Type='DateTime'>"
                + this.createDateFrom.getFullYear() + "-" + month + "-" + this.createDateFrom.getDate() + "</Value></Geq>";
            }
            if(this.createDateTo != null && this.createDateTo != "")
            {
              var month = this.createDateTo.getMonth() + 1;
              if(strQueryCreatedDate == "" || strQueryCreatedDate.trim() == "") {
                  strQueryCreatedDate = "<Leq><FieldRef Name='Created' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" +
                          this.createDateTo.getFullYear() + "-" + month + "-" + this.createDateTo.getDate() + "</Value></Leq>";
              } else {
                  strQueryCreatedDate = "<And>" +   strQueryCreatedDate +  "<Leq><FieldRef Name='Created' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" +
                          this.createDateTo.getFullYear() + "-" + month + "-" + this.createDateTo.getDate() + "</Value></Leq></And>";
              }
            }
            //push created date parameters
            if(strQueryCreatedDate != "") {
              if(this.csCreatedDate === 'Or') {
                searchOrConditin.push(strQueryCreatedDate);
              } else {
                searchConditions.push(strQueryCreatedDate);
              }
            }

            var strQueryModifiedDate = "";
            if(this.modifiedDateFrom != null && this.modifiedDateFrom != "")
            {
              var month = this.modifiedDateFrom.getMonth() + 1;
              strQueryModifiedDate = "<Geq><FieldRef Name='Modified' /><Value IncludeTimeValue='FALSE' Type='DateTime'>"
               +  this.modifiedDateFrom.getFullYear() + "-" + month + "-" + this.modifiedDateFrom.getDate() + "</Value></Geq>";
            }
            if(this.modifiedDateTo != null && this.modifiedDateTo != "")
            {
              var month = this.modifiedDateTo.getMonth() + 1;
              if(strQueryModifiedDate == "") {
                strQueryModifiedDate = "<Leq><FieldRef Name='Modified' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" +
                     this.modifiedDateTo.getFullYear() + "-" + month + "-" + this.modifiedDateTo.getDate() + "</Value></Leq>";
              } else {
                strQueryModifiedDate = "<And>" + strQueryModifiedDate + "<Leq><FieldRef Name='Modified' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" +
                     this.modifiedDateTo.getFullYear() + "-" + month + "-" + this.modifiedDateTo.getDate() + "</Value></Leq></And>";
              }
            }
            //push modified date parameters
            if(strQueryModifiedDate != "") {
              if(this.csCreatedDate === 'Or') {
                searchOrConditin.push(strQueryModifiedDate);
              } else {
                searchConditions.push(strQueryModifiedDate);
              }
            }

            //if no parameter, return
            if(searchConditions.length == 0 && searchOrConditin.length == 0) {
              this.message ="Please at least input one search parameter";
              return;
            }

            searchConditions.push("<IsNotNull><FieldRef Name='File_x0020_Type' /></IsNotNull>");

            //join all And parameter;
            var strqueryAnd = "";
            for(var i = 0; i< searchConditions.length; i++) {
              if(i != 0){
                strqueryAnd = "<And>" + strqueryAnd + searchConditions[i] + "</And>";
              } else {
                strqueryAnd = searchConditions[i];
              }
            }

            //final join all Or paramter
            searchOrConditin.push(strqueryAnd);
            for(var i = 0; i< searchOrConditin.length; i++) {
              if(i != 0){
                strquery = "<Or>" + strquery + searchOrConditin[i] + "</Or>";
              } else {
                strquery = searchOrConditin[i];
              }
            }

            strquery = "<Where>" + strquery + "</Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy>";

            this.$router.push({name: 'SearchPage', params: { queryText : strquery } });
        },
        clearParam: function() {
          this.titleKeywords = "";
          this.searchKeywords = "";
          this.authorKeywords = "";
          this.editorKeywords = "";
          this.createDateFrom = "";
          this.createDateTo = "";
          this.modifiedDateFrom = "";
          this.modifiedDateTo = "";
          this.departmentKeywords = "";
          this.projectNameKeywords = "";
          this.projectDocTypeKeywords = "";
          this.vendorKeywords = "";
          this.message = "";
        },
        backToSearch: function() {
          this.$router.go(-1);
        }
      }
  }
</script>

<style scoped>
.container
{
  display: block;
  width: 95%;
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
  padding-top: 10px;
}
.keywordTitle
{
  text-align: right;
  line-height: 36px;
}
.returnLink
{
  margin-bottom: 15px;
}
.btnRow
{
  margin-top: 25px;
}
</style>
