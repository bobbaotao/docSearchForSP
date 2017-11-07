<template>
  <div>
  <el-row :gutter="10" class="bigRow">
    <el-col :span="22" :offset="1">
      <div class="groupitem" v-bind:class="{groupitem_selected : group.isSelect}" v-for="group in groups" >
        <!-- <i v-if="group.isSelect" class="el-icon-caret-bottom"></i>
        <i v-else class="el-icon-caret-right"></i>&nbsp;&nbsp;{{group.key}}&nbsp;({{group.num}}) -->
        <el-checkbox v-on:change="filterByKey()" v-model="group.isSelect">{{group.key}}&nbsp;({{group.num}})</el-checkbox>
      </div>
    </el-col>
  </el-row>
    <el-row :gutter="10">
    <el-col :span="22" :offset="1">
      <el-table :data="resultData" stripe  :max-height="tbHeight - 60" :border=false>
        <el-table-column :width="50" fixed>
          <template scope="scope">
            <img style="padding-top:5px" v-bind:src="scope.row._FileIcon" />
          </template>
        </el-table-column>
        <el-table-column label="Document" :width="250" prop="FileLeafRef" align="left" fixed>
            <template scope="scope">
              <!-- <el-tooltip placement="bottom" effect="dark">
                <div class="colfontsize" slot="content">{{scope.row.ZeissDocDes == ""? "no description": scope.row.ZeissDocDes}}</div>
                <div class="colfontsize" >{{scope.row.Title}}</div>
              </el-tooltip> -->
              <div class="colfontsize" >{{scope.row.Title}}</div>
            </template>
        </el-table-column>
        <el-table-column :width="50" fixed>
          <template scope="scope">
            <a class="colfontsize" v-bind:href="'../../../_layouts/15/download.aspx?SourceUrl=/' + scope.row.FileRef" target="_blank"><img style="padding-top:5px;" src="../assets/download_easyicon.png" /></a>
          </template>
        </el-table-column>
        <el-table-column label="Description" :width="250">
          <template scope="scope">
            <div  class="colfontsize" >{{scope.row.ZeissDocDes}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Fiscal Year" :width="200" prop="ZeissFiscalYear"
              :filters="fiscalYearFilter" :filter-method="filterFiscalYear" filter-placement="top">
          <template scope="scope">
            <div  class="colfontsize" >{{scope.row.ZeissFiscalYear}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Keywords" :width="200" prop="TaxKeywordTaxHTField"
              :filters="tagFilter" :filter-method="filterTag" filter-placement="top">
          <template scope="scope">
            <el-tag class="sr-el-tag colfontsize"  v-for="tagText in scope.row.TaxKeywordTaxHTField">{{tagText}}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Department" :width="160" prop="ZeissDepartmentOfDoc"
            sortable :filters="departmentFilter" :filter-method="filterDepartment" filter-placement="top">
          <template scope="scope">
            {{scope.row.ZeissDepartmentOfDoc}}
          </template>
        </el-table-column> -->
        <el-table-column label="Project Name" width="200" prop="ZeissProjectName" :filters="projectNameFilter"
            sortable :filter-method="filterProjectName" filter-placement="top" :show-overflow-tooltip=true>
          <template scope="scope">
            <div  class="colfontsize" >{{scope.row.ZeissProjectName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Vendor" width="200" prop="ZeissVendor" :filters="vendorFilter" filter-placement="top"
            sortable :filter-method="filterVendor" :show-overflow-tooltip=true>
          <template scope="scope">
            <div  class="colfontsize" >{{scope.row.ZeissVendor}}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Type" :width="160" prop="ZeissProjectDocType"
            sortable :filters="projectDoctypeFileter" :filter-method="filterProjectDocType" filter-placement="top">
          <template scope="scope">
            {{scope.row.ZeissProjectDocType}}
          </template>
        </el-table-column> -->
        <el-table-column label="Author" :width="160"  sortable prop="ZeissDocAuthor"  :show-overflow-tooltip=true
              :filters="authorFilter" :filter-method="filterAuthor" filter-placement="top">
          <template scope="scope">
            <div  class="colfontsize">{{scope.row.ZeissDocAuthor}}</div>
          </template>
        </el-table-column>
    <!--   <el-table-column label="Created Date" :width="180" sortable prop="Created"
            :filters="dateFilter" :filter-method="filterCreateDate" filter-placement="top">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px"  class="colfontsize" >{{ scope.row.Created.substring(0, 10) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Editor" :width="160"  sortable prop="Editor"  :show-overflow-tooltip=true
              :filters="editorFilter" :filter-method="filterEditor" filter-placement="top">
          <template scope="scope">
            <div class="colfontsize" >{{scope.row.Editor}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Modified Date" :width="180" sortable prop="Modified"
            :filters="modifiedDateFilter" :filter-method="filterModifiedDate" filter-placement="top">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px" class="colfontsize" >{{ scope.row.Modified.substring(0, 10) }}</span>
          </template>
        </el-table-column>
        -->
      </el-table>
    </el-col>
  </el-row>
  </div>
</template>

<script>
var array = require('array');

export default {
  name: "ResultByGroup",
  props: ["sourceData","groups","groupKey","authorFilter", "fiscalYearFilter",
  "tagFilter", "projectNameFilter", "vendorFilter", "tbHeight"],
  data () {
    return {
      resultData: this.sourceData
      // sourceData:[],
      // resultData : [],
      // groups : [{key:"IMT", num: 15, isSelect: true},{key:"MED", num: 20, isSelect: true}],
      // groupkey: "Department", //Department or ZeissProjectDocType
      // dateFilter: [],
      // authorFilter: [],
      // modifiedDateFilter: [],
      // editorFilter: [],
      // tagFilter: []

    }
  },
  methods: {
    // filterCreateDate: function(value, row) {
    //   return row.Created.indexOf(value) >= 0;
    // },
    filterAuthor: function(value, row) {
      return row.ZeissDocAuthor === value;
    },
    filterTag: function(value, row) {
      for(var i = 0; i < row.TaxKeywordTaxHTField.length; i++) {
        if(row.TaxKeywordTaxHTField[i] === value) {
          return true;
        }
      }
      return false;
    },
    // filterEditor: function(value, row) {
    //   return row.Editor === value;
    // },
    // filterModifiedDate(value, row) {
    //   return row.Modified.indexOf(value) >= 0;
    // },
    filterByKey() {
      var selectedArray = new array();
      for(var group in this.groups) {
        if(this.groups[group].isSelect) {
          selectedArray.push(this.groups[group].key);
        }
      }
      var newSources = new array();
      for(var item in this.sourceData) {
        if(this.groupKey === "ZeissDepartmentOfDoc") {
          if(selectedArray.has(this.sourceData[item].ZeissDepartmentOfDoc)) {
            newSources.push(this.sourceData[item]);
          }
        } else if(this.groupKey === "ZeissProjectDocType") {
          if(selectedArray.has(this.sourceData[item].ZeissProjectDocType)) {
            newSources.push(this.sourceData[item]);
          }
        }
      }

      this.resultData = newSources.toArray();
    },
    filterProjectName(value, row) {
      if(value != "") {
        return row.ZeissProjectName === value;
      } else {
        return row.ZeissProjectName == null || row.ZeissProjectName == "";
      }
    },
    filterVendor(value,row) {
      if(value != "") {
        return row.ZeissVendor === value;
      } else {
        return row.ZeissVendor == null || row.ZeissVendor == "";
      }
    },
    filterFiscalYear(value,row) {
      if(value != "") {
        return row.ZeissFiscalYear === value;
      } else {
        return row.ZeissFiscalYear == null || row.ZeissFiscalYear == "";
      }
    }
  }

}
</script>

<style scope>
.groupitem
{
  line-height: 30px;
  float: left;
  cursor: pointer;
  text-align: left;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 10px;
}
.groupitem_selected
{
    background-color: #eef1f6;
}
.groupitem_hover
{
  background-color: #99A9BF;
}
.colfontsize
{
  font-size: 12px;
  word-break: normal;
  text-align: left;
}
.sr-el-tag
{
  margin-right: 5px;
}
.bigRow
{
  margin-bottom: 15px;
}
</style>
