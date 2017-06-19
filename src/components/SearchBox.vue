<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="10">
      <el-switch v-model='isNormalSearch' on-text="Normal Search" off-text="Advanced Search"
                on-color='#20A0FF' off-color="#20A0FF" disable="false" :width=150>
      </el-switch>
    </el-col>
  </el-row>
    <div class="searchContainer" v-if="isNormalSearch">
      <el-row :gutter="20" class="bigRow">
        <el-col :span="10">
          <el-input style="width:50%" placeholder="Please input keywords" icon="search" v-model="searchKeywords" :on-icon-click="search">
          </el-input>
        </el-col>
      </el-row>
    </div>
    <div class="searchContainer" v-else>
      <el-row :gutter="20" class="bigRow">
        <el-col :span="3">
          Keywords:
        </el-col>
        <el-col :span="7">
          <el-input placeholder="Please input keywords" v-model="searchKeywords">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="search" v-on:click="search">Search</el-button>
        </el-col>
        <el-col :span="7">
        </el-col>
      </el-row>
      <el-row :gutter="20" class="bigRow">
        <el-col :span="3">
          Create Date
        </el-col>
        <el-col :span="7">
          From: <el-date-picker style="float:left" v-model="createDateFrom" type="date" placeholder="Please Select From Date">
          </el-date-picker>
        </el-col>
        <el-col :span="10">
          To: <el-date-picker style="float:left" v-model="createDateTo" type="date" placeholder="Please Select To Date">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="bigRow">
        <el-col :span="3">
          Author:
        </el-col>
        <el-col :span="7">
          <el-input  placeholder="Author" v-model="authorKeywords">
          </el-input>
        </el-col>
        <el-col :span="10">
        </el-col>
      </el-row>
      <el-row :gutter="20" class="bigRow">
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
          isNormalSearch : true,
          searchKeywords: "",
          createDateRange: "",
          authorKeywords: "",
          createDateFrom:"",
          createDateFrom: "",
          department: "",
          projectName: "",
          projectDocType: ""
        }
      },
      methods: {
        search: function() {
          var strquery="";
          if(this.isNormalSearch) {
            strquery = "<Where><Or><Contains><FieldRef Name='Title' /><Value Type='Text'>" + this.searchKeywords +
            "</Value></Contains><Contains><FieldRef Name='TaxKeyword' /><Value Type='TaxonomyFieldTypeMulti'>" + this.searchKeywords
             + "</Value></Contains></Or></Where>";
          } else {
            var searchConditions = new array();
            if(this.searchKeywords != "") {
              searchConditions.push("<Or><Contains><FieldRef Name='Title' /><Value Type='Text'>" + this.searchKeywords +
              "</Value></Contains><Contains><FieldRef Name='TaxKeyword' /><Value Type='TaxonomyFieldTypeMulti'>" + this.searchKeywords
               + "</Value></Contains></Or>");
            }
            if(this.authorKeywords != "") {
              searchConditions.push("<Contains><FieldRef Name='Author' /><Value Type='User'>" + this.authorKeywords + "</Value></Contains>");
            }
            // if(this.createDateRange != null && this.createDateRange.length && this.createDateRange.length > 0) {
            //   var startDate = this.createDateRange[0].toLocaleDateString();
            //   var endDate = this.createDateRange[1].toLocaleDateString();
            //   searchConditions.push("<And><Geq><FieldRef Name='Created' /><Value IncludeTimeValue='FALSE' Type='DateTime'>"
            //   + startDate + "</Value></Geq><Leq><FieldRef Name='Created' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" +
            //   endDate + "</Value></Leq></And>");
            // }
            for(var i=0; i< searchConditions.length; i++) {
              if(i != 0){
                strquery = "<And>" + strquery + searchConditions[i] + "</And>";
              } else {
                strquery = searchConditions[i];
              }
            }

            strquery = "<Where>" + strquery + "</Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy>";
          }
          this.$emit("dosearch", strquery);
        },
        switchSearch: function() {
          if(this.isAdvanceSearch) {
            this.isAdvanceSearch = false;
          } else {
            this.isAdvanceSearch = true;
          }
        }
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
  padding-left: 50px;
  padding-top: 20px;
  display: block;
}
.searchContainer
{
  padding-left: 50px;
  padding-top: 15px;
  display: block;
  width: 100%;
}
.bigRow
{
  padding-top: 10px;
}
</style>
