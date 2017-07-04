<template>
  <div>
    <div class='modalLayout' v-if="isLoading === true">
      <Spinner class="spinnerLoader"></Spinner>
    </div>

    <!-- <div v-if="isShowSearchBox">
      <SearchBox  v-on:dosearch="SearchDataFromSP($event)">
      </SearchBox>

      <div class="errorMessage">
        {{message}}
      </div>
    </div> -->
    <el-row :gutter="10" class="bigRow">
      <el-col :span="9" :offset="1">
        <A class="el-icon-d-arrow-left" style="float: left;" v-on:click="backToSearch" >&nbsp;Back to Search</A>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="9" :offset="1">
          {{message}}
        </el-col>
    </el-row>
      <div class="searchResultContainer" v-if="isShowSearchResult">
      <SearchResult v-bind:resultData="resultData" v-bind:dateFilter="srCreatedFilters" v-bind:departmentFilter="srDepartmentFilters"
                    v-bind:authorFilter="srAuthorFilters" v-bind:tagFilter="srTagFilters" v-bind:projectDoctypeFileter="srProjectDocTypeFilters"
                    v-bind:modifiedDateFilter="srModifiedFilters" v-bind:editorFilter="srEditorFilters">
      </SearchResult>
    </div>
  </div>
</template>

<script>
      import Spinner from 'vue-simple-spinner';
      import SearchResult from './SearchResult';
      import SearchBox from './SearchBox';
      var JSON2 = require('JSON2');
      var array = require('array')

      export default {
            name: 'SearchPage',
            data() {
                return {
                  isLoading : false,
                  isShowSearchBox : true,
                  isShowSearchResult: false,
                  suggestionAttribute: 'original_title',
                  suggestions: [{"original_title":"t1"},{"original_title": "i2"}],
                  searchKey: "",
                  message:"",
                  resultData: [{create:"",FileRef:"",FileLeafRef:"",Author:"",TaxKeywordTaxHTField:[]}],
                  srCreatedFilters: [],
                  srAuthorFilters: [],
                  srTagFilters: [],
                  srDepartmentFilters: [],
                  srProjectDocTypeFilters: [],
                  srModifiedFilters: [],
                  srEditorFilters: []
                }
            },
            created: function() {
              if(this.$route.params && this.$route.params.queryText) {
                this.SearchDataFromSP(this.$route.params.queryText);
              } else {
                this.message ="no avaliable search keywords";
              }
            },
            components: { Spinner, SearchResult, SearchBox },
            methods: {
                SearchDoc: function(){
                  this.isShowSearchBox = false;
                  this.isShowSearchResult = true;
                },
                searchKeyChanged: function() {
                    //todo
                },
                clearSearchKey: function() {
                  //todo
                },
                SearchDataFromSP: function(strQuery) {
                  this.isLoading = true;
                  const requestUrl = "../../../_vti_bin/Zeiss.DocManagement/DocMService.svc/Search";
                  //const requestUrl = "http://localhost:3000/doc/docsearch";   //for test
                  var requestData = {
                    param : {
                      query: strQuery,
                      viewFields: "<FieldRef Name='FileLeafRef' /><FieldRef Name='FileRef' /><FieldRef Name='Created' />" +
                      "<FieldRef Name='File_x0020_Type' /><FieldRef Name='Editor' /><FieldRef Name='Modified' /><FieldRef Name='Author' />" +
                      "<FieldRef Name='TaxKeywordTaxHTField' /><FieldRef Name='File_x0020_Type' /><FieldRef Name='ZeissDepartmentOfDoc' />"
                      + "<FieldRef Name='ZeissProjectName' /><FieldRef Name='ZeissProjectDocType' /><FieldRef Name='ZeissDocDes' />",
                      webScope: "<Webs Scope='Recursive'>",
                      listScope: "<Lists ServerTemplate='10068' />",
                      rowLimit: "500"
                    }
                  };
                  this.axios.post(requestUrl,requestData).then((response) => {
                    this.isLoading = false;
                    //console.dir(response);
                    if(response.data.SearchDocByKeyResult.success) {
                      var resultRows = JSON2.parse(response.data.SearchDocByKeyResult.data);
                      var dateFilter = new array();
                      var authorFilter = new array();
                      var tagFilter = new array();
                      var departmentFilter = new array();
                      var projectDoctypeFileter = new array();
                      var modifiedDateFilter = new array();
                      var editorFilter = new array();

                      for(var i=0; i< resultRows.length; i++) {
                        var item = resultRows[i];
                        if(item.FileLeafRef.indexOf(";#") > 0) {
                          item.FileLeafRef = item.FileLeafRef.substring(item.FileLeafRef.indexOf(";#") + 2);
                        }

                        if(item.FileRef.indexOf(";#") > 0) {
                          item.FileRef = item.FileRef.substring(item.FileRef.indexOf(";#") + 2);
                        }

                        if(item.Author.indexOf(";#") > 0) {
                          item.Author = item.Author.substring(item.Author.indexOf(";#") + 2);
                        }

                        if(item.Editor.indexOf(";#") > 0) {
                          item.Editor = item.Editor.substring(item.Editor.indexOf(";#") + 2);
                        }

                        //init doc icon
                        if(item.File_x0020_Type == null || item.File_x0020_Type == "") {
                          item._FileIcon = "../../../_layouts/15/images/folder.gif";
                        } else if(item.File_x0020_Type == "docx") {
                          item._FileIcon = "../../../_layouts/15/images/icdocx.png";
                        } else if (item.File_x0020_Type == "xlsx" || item.File_x0020_Type == "csv") {
                          item._FileIcon = "../../../_layouts/15/images/icxlsx.png";
                        } else if (item.File_x0020_Type == "pptx") {
                          item._FileIcon = "../../../_layouts/15/images/icpptx.png";
                        } else {
                          item._FileIcon = "../../../_layouts/15/images/mb_file.png";
                        }

                        if(item.TaxKeywordTaxHTField != null) {
                          if(item.TaxKeywordTaxHTField.indexOf(";") > 0 ) {
                            var keywords = item.TaxKeywordTaxHTField.split(";");
                            for(var ikey = 0; ikey < keywords.length; ikey ++ ) {
                              keywords[ikey] = keywords[ikey].substring(0,  keywords[ikey].indexOf('|'));
                              tagFilter.push({text: keywords[ikey], value: keywords[ikey]});
                            }
                            item.TaxKeywordTaxHTField = keywords;
                          } else if(item.TaxKeywordTaxHTField != null && item.TaxKeywordTaxHTField != "") {
                            var keywords = new array();
                            keywords.push(item.TaxKeywordTaxHTField);
                            for(var ikey = 0; ikey < keywords.length; ikey ++ ) {
                              keywords[ikey] = keywords[ikey].substring(0,  keywords[ikey].indexOf('|'));
                              tagFilter.push({text: keywords[ikey], value: keywords[ikey]});
                            }
                            item.TaxKeywordTaxHTField = keywords.toArray();
                          }
                        }

                        var createdDate = item.Created.substring(0,10);
                        dateFilter.push({text: createdDate, value: createdDate});

                        var modifiedDate = item.Modified.substring(0,10);
                        modifiedDateFilter.push({text: modifiedDate, value:modifiedDate});

                        authorFilter.push({text: item.Author, value: item.Author});
                        editorFilter.push({text: item.Editor, value: item.Editor});

                        if(item.ZeissDepartmentOfDoc != null && item.ZeissDepartmentOfDoc != "") {
                          departmentFilter.push({text: item.ZeissDepartmentOfDoc, value: item.ZeissDepartmentOfDoc});
                        } else {
                          departmentFilter.push({text: "", value: ""});
                        }

                        if(item.ZeissProjectDocType != null && item.ZeissProjectDocType != "") {
                          projectDoctypeFileter.push({text: item.ZeissProjectDocType, value: item.ZeissProjectDocType});
                        } else {
                          projectDoctypeFileter.push({text: "", value: ""});
                        }
                      }

                      //set filters
                      this.srCreatedFilters = dateFilter.unique("value").toArray();
                      this.srAuthorFilters = authorFilter.unique("value").toArray();
                      this.srTagFilters = tagFilter.unique("value").toArray();
                      this.srDepartmentFilters = departmentFilter.unique("value").toArray();
                      this.srProjectDocTypeFilters = projectDoctypeFileter.unique("value").toArray();
                      this.srModifiedFilters = modifiedDateFilter.unique("value").toArray();
                      this.srEditorFilters = editorFilter.unique("value").toArray();

                      this.resultData = resultRows;
                      this.isShowSearchResult = true;
                      this.isShowSearchBox = false;
                    } else {
                      this.message = response.data.SearchDocByKeyResult.mesage;
                    }
                  }).catch((error) => {
                    this.isLoading = false;
                  });
                },
                backToSearch: function() {
                  // this.isShowSearchBox = true;
                  // this.isShowSearchResult = false;
                  this.$router.go(-1);
                }
                // initConnect: function(){
                //   axios.defaults.headers.post["Access-Control-Allow-Origin"] ="http://zcnsha10yapp01/sites/DevSite_Bob";
                //   axios.post("http://zcnsha10yapp01/sites/DevSite_Bob/_api/contextinfo").then((response) => {
                //     this.message = response.data;
                //   }).catch((error) => {
                //     this.message = error.message;
                //   });
                // }
            }
      }

</script>

<style scoped>
.errorMessage {
  padding-top: 15px;
  padding-left: 50px;
  color: red;
}
.modalLayout
{
  position: fixed;
  background-color:rgba(0,0,0,.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
  overflow-x: hidden;
  overflow-y: auto;
}
.spinnerLoader
{
  margin-top: 200px;
}
.searchResultContainer
{
  padding-top: 15px;
}
</style>
