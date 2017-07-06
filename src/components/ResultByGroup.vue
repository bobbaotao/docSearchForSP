<template>
  <el-row :gutter="10" class="bigRow">
    <el-col :span="5" :offset="1">
      <div class="groupitem" v-bind:class="{groupitem_selected : group.isSelect}" v-for="group in groups" v-on:click="group.isSelect = !group.isSelect; filterByKey()">
        <i v-if="group.isSelect" class="el-icon-caret-bottom"></i><i v-else class="el-icon-caret-right"></i>&nbsp;&nbsp;{{group.key}}&nbsp;({{group.num}})
      </div>
    </el-col>
    <el-col :span="17">
      <el-table :data="resultData" stripe  :max-height="500" :width="900" :border=false>
        <el-table-column type="expand" fixed>
          <template scope="scope">
            <!-- <el-form label-position="left">
              <el-form-item label="Document Description" align="left">
                {{ scope.row.ZeissDocDes }}
              </el-form-item>
            </el-form> -->
            <el-row>
              <el-col :span="4" :offser="1">
                Document Description:
              </el-col>
              <el-col :span="12">
                  {{ scope.row.ZeissDocDes }}
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="Document" :width="250" prop="FileLeafRef" :show-overflow-tooltip=true align="left" fixed>

        </el-table-column>
        <el-table-column :width="60" fixed>
          <template scope="scope">
            <a v-bind:href="'\\' + scope.row.FileRef" target="_blank"><img src="../assets/download_easyicon.png" /></a>

          </template>
        </el-table-column>
        <el-table-column label="Keywords" :width="200" prop="TaxKeywordTaxHTField"
              :filters="tagFilter" :filter-method="filterTag" filter-placement="top">
          <template scope="scope">
            <el-tag class="sr-el-tag"  v-for="tagText in scope.row.TaxKeywordTaxHTField">{{tagText}}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Department" :width="160" prop="ZeissDepartmentOfDoc"
            sortable :filters="departmentFilter" :filter-method="filterDepartment" filter-placement="top">
          <template scope="scope">
            {{scope.row.ZeissDepartmentOfDoc}}
          </template>
        </el-table-column> -->
        <el-table-column label="Project Name" width="200" prop="ZeissProjectName"
            sortable :show-overflow-tooltip=true>
          <template scope="scope">
            {{scope.row.ZeissProjectName}}
          </template>
        </el-table-column>
        <!-- <el-table-column label="Type" :width="160" prop="ZeissProjectDocType"
            sortable :filters="projectDoctypeFileter" :filter-method="filterProjectDocType" filter-placement="top">
          <template scope="scope">
            {{scope.row.ZeissProjectDocType}}
          </template>
        </el-table-column> -->
        <el-table-column label="Author" :width="160"  sortable prop="Author"  :show-overflow-tooltip=true
              :filters="authorFilter" :filter-method="filterAuthor" filter-placement="top">
          <template scope="scope">
            {{scope.row.Author}}
          </template>
        </el-table-column>
        <el-table-column label="Created Date" :width="180" sortable prop="Created"
            :filters="dateFilter" :filter-method="filterCreateDate" filter-placement="top">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.Created.substring(0, 10) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Editor" :width="160"  sortable prop="Editor"  :show-overflow-tooltip=true
              :filters="editorFilter" :filter-method="filterEditor" filter-placement="top">
          <template scope="scope">
            {{scope.row.Editor}}
          </template>
        </el-table-column>
        <el-table-column label="Modified Date" :width="180" sortable prop="Modified"
            :filters="modifiedDateFilter" :filter-method="filterModifiedDate" filter-placement="top">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.Modified.substring(0, 10) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
var array = require('array');

export default {
  name: "ResultByGroup",
  props: ["sourceData","groups","groupKey","dateFilter","authorFilter","modifiedDateFilter","editorFilter","tagFilter"],
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
    filterCreateDate: function(value, row) {
      return row.Created.indexOf(value) >= 0;
    },
    filterAuthor: function(value, row) {
      return row.Author === value;
    },
    filterTag: function(value, row) {
      for(var i = 0; i < row.TaxKeywordTaxHTField.length; i++) {
        if(row.TaxKeywordTaxHTField[i] === value) {
          return true;
        }
      }
      return false;
    },
    filterEditor: function(value, row) {
      return row.Editor === value;
    },
    filterModifiedDate(value, row) {
      return row.Modified.indexOf(value) >= 0;
    },
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
  width: 90%;
  text-align: left;
  padding-left: 5px;
}
.groupitem_selected
{
    background-color: #eef1f6;
}
.groupitem_hover
{
  background-color: #99A9BF;
}
</style>
