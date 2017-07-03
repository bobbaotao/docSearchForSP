<template>
  <div class="container">
    <div class="searchContainer" >
      <el-row :gutter="10" class="bigRow">
        <el-col :span="10" :offset="7">
          <el-input placeholder="Please input keywords" icon="search" v-model="searchKeywords" :on-icon-click="search">
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="bigRow btnRow">
        <el-col :span="4" :offset="8">
          <el-button type="primary" icon="search" v-on:click="search" :disabled="searchKeywords == null || searchKeywords == '' || searchKeywords.trim() == ''">Search</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="plus" v-on:click="advancedSearch">Advanced Search</el-button>
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
          isNormalSearch : true,
          searchKeywords: "",
          departmentOptions: [{value: "MED"},{value: "MIK"},{value: "IMT"},{value: "Strategy"},{value: "Others"}],
          projectDocTypeOptions:[{value: "Startegy"},{value: "Financial Report"},{value: "Economic Report"},{value: "Marketing Report"},{value: "Others"}]
        }
      },
      methods: {
        search: function() {
          var strquery="";

            strquery = "<Where><Or><Or><Or><Or><Or><Contains><FieldRef Name='Title' /><Value Type='Text'>" + this.searchKeywords +
            "</Value></Contains><Contains><FieldRef Name='TaxKeyword' /><Value Type='TaxonomyFieldTypeMulti'>" + this.searchKeywords
             + "</Value></Contains></Or><Contains><FieldRef Name='FileLeafRef' /><Value Type='Text'>" + this.searchKeywords +
             "</Value></Contains></Or><Contains><FieldRef Name='ZeissProjectName' /><Value Type='Text'>" + this.searchKeywords
             + "</Value></Contains></Or><Eq><FieldRef Name='ZeissDepartmentOfDoc' /><Value Type='Choice'>" + this.searchKeywords
             + "</Value></Eq></Or> <Eq><FieldRef Name='ZeissProjectDocType' /><Value Type='Choice'>" + this.searchKeywords +
             "</Value></Eq></Or></Where>";

          //this.$emit("dosearch", strquery);
          this.$router.push({name: 'SearchPage', params: {queryText: strquery}});
        },
        advancedSearch: function() {
          this.$router.push({name: 'AdvancedSearch'});
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
  padding-top: 20px;
  display: block;
}
.searchContainer
{
  padding-top: 120px;
  display: block;
  width: 100%;
}
.bigRow
{
  padding-top: 10px;
}
.btnRow
{
  margin-top: 25px;
}
</style>
