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
    <el-row :gutter="10" class="bigRow srcontainer">
      <el-col :span="22" :offset="1">
        <A class="el-icon-d-arrow-left" style="float: left;" v-on:click="backToSearch" >&nbsp;Back to Search</A>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="22" :offset="1">
          {{message}}
        </el-col>
    </el-row>
      <div class="searchResultContainer" v-if="isShowSearchResult">
        <ResultByGroup v-if="isGroup" v-bind:sourceData="resultData"  :tbHeight="tbHeight" 
                    v-bind:authorFilter="srAuthorFilters" v-bind:tagFilter="srTagFilters" v-bind:groups="groups" v-bind:groupKey="groupKey"
                    v-bind:fiscalYearFilter="srFiscalYearFilters"
                    v-bind:projectNameFilter="srProjectNameFilters" v-bind:vendorFilter="srVendorFilters">

        </ResultByGroup>
        <SearchResult v-else v-bind:resultData="resultData"  v-bind:departmentFilter="srDepartmentFilters"
                    v-bind:authorFilter="srAuthorFilters" v-bind:tagFilter="srTagFilters" v-bind:projectDoctypeFileter="srProjectDocTypeFilters"
                     :tbHeight="tbHeight" v-bind:fiscalYearFilter="srFiscalYearFilters"
                    v-bind:projectNameFilter="srProjectNameFilters" v-bind:vendorFilter="srVendorFilters">
        </SearchResult>

    </div>
  </div>
</template>

<script>
      import Spinner from 'vue-simple-spinner';
      import SearchResult from './SearchResult';
      import ResultByGroup from './ResultByGroup';
      import SearchBox from './SearchBox';
      var JSON2 = require('JSON2');
      var array = require('array');

      export default {
            name: 'SearchPage',
            data() {
                var size = {
                  width: window.innerWidth || document.body.clientWidth,
                  height: window.innerHeight || document.body.clientHeight
                };
                return {
                  isLoading : false,
                  isShowSearchBox : true,
                  isShowSearchResult: false,
                  suggestionAttribute: 'original_title',
                  suggestions: [{"original_title":"t1"},{"original_title": "i2"}],
                  searchKey: "",
                  message:"",
                  resultData: [{create:"",FileRef:"",FileLeafRef:"",Author:"",TaxKeywordTaxHTField:[]}],
                  //srCreatedFilters: [],
                  srAuthorFilters: [],
                  srTagFilters: [],
                  srDepartmentFilters: [],
                  srProjectDocTypeFilters: [],
                  srFiscalYearFilters: [],
                  //srModifiedFilters: [],
                  //srEditorFilters: [],
                  srProjectNameFilters: [],
                  srVendorFilters: [],
                  isGroup: false,
                  groupKey: "",
                  groups:[],
                  size
                }
            },
            computed: {
              tbHeight: function() {
                return this.size.height - 100;
              }
            },
            created: function() {
              if(this.$route.params && this.$route.params.queryText) {
                if(this.$route.params.isGroup) {
                  this.isGroup = this.$route.params.isGroup;
                  this.groupKey = this.$route.params.groupKey;
                }
                this.SearchDataFromSP(this.$route.params.queryText);
              } else {
                this.message ="no avaliable search keywords";
              }
            },
            components: { Spinner, SearchResult, ResultByGroup },
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
                      viewFields: "<FieldRef Name='FileLeafRef' /><FieldRef Name='FileRef' /><FieldRef Name='Title' /><FieldRef Name='Created' />" +
                      "<FieldRef Name='File_x0020_Type' /><FieldRef Name='Author' /><FieldRef Name='ZeissDocAuthor' /><FieldRef Name='ZeissFiscalYear' />" +
                      "<FieldRef Name='TaxKeywordTaxHTField' /><FieldRef Name='File_x0020_Type' /><FieldRef Name='ZeissDepartmentOfDoc' />"
                      + "<FieldRef Name='ZeissProjectName' /><FieldRef Name='ZeissProjectDocType' /><FieldRef Name='ZeissDocDes' /><FieldRef Name='ZeissVendor' />",
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
                      //var dateFilter = new array();
                      var authorFilter = new array();
                      var tagFilter = new array();
                      var departmentFilter = new array();
                      var projectDoctypeFileter = new array();
                      //var modifiedDateFilter = new array();
                      //var editorFilter = new array();
                      var groups = new array();
                      var projectNameFilter = new array();
                      var vendorFilter = new array();
                      var fiscalYearFilter = new array();

                      for(var i=0; i< resultRows.length; i++) {
                        var item = resultRows[i];
                        if(item.FileLeafRef.indexOf(";#") > 0) {
                          item.FileLeafRef = item.FileLeafRef.substring(item.FileLeafRef.indexOf(";#") + 2);
                        }

                        if(item.FileRef.indexOf(";#") > 0) {
                          item.FileRef = item.FileRef.substring(item.FileRef.indexOf(";#") + 2);
                        }

                        if(item.ZeissDocAuthor.indexOf(";#") > 0) {
                          item.ZeissDocAuthor = item.ZeissDocAuthor.substring(item.ZeissDocAuthor.indexOf(";#") + 2);
                        }

                        // if(item.Editor.indexOf(";#") > 0) {
                        //   item.Editor = item.Editor.substring(item.Editor.indexOf(";#") + 2);
                        // }

                        //init doc icon
                        if(item.File_x0020_Type == null || item.File_x0020_Type == "") {
                          item._FileIcon = "../../../_layouts/15/images/folder.gif";
                        } else if(item.File_x0020_Type == "docx" || item.File_x0020_Type == "doc") {
                          item._FileIcon = "../../../_layouts/15/images/icdocx.png";
                        } else if (item.File_x0020_Type == "xlsx" || item.File_x0020_Type == "csv") {
                          item._FileIcon = "../../../_layouts/15/images/icxlsx.png";
                        } else if (item.File_x0020_Type == "pptx" || item.File_x0020_Type == "ppt") {
                          item._FileIcon = "../../../_layouts/15/images/icpptx.png";
                        } else if (item.File_x0020_Type == "pdf") {
                          item._FileIcon = "../../../_layouts/15/images/icpdf.png";
                        } else {
                          item._FileIcon = "../../../_layouts/15/images/mb_file.png";
                        }

                        // deal with tag
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

                        // var createdDate = item.Created.substring(0,10);
                        // dateFilter.push({text: createdDate, value: createdDate});

                        // var modifiedDate = item.Modified.substring(0,10);
                        // modifiedDateFilter.push({text: modifiedDate, value:modifiedDate});

                        if(item.ZeissDocAuthor != null && item.ZeissDocAuthor != '')
                        {
                          authorFilter.push({text: item.ZeissDocAuthor, value: item.ZeissDocAuthor});
                        } else {
                          authorFilter.push({text: "", value: ""});
                        }
                        //editorFilter.push({text: item.Editor, value: item.Editor});
                        
                        if(item.ZeissFiscalYear != null && item.ZeissFiscalYear != '')
                        {
                          fiscalYearFilter.push({text: item.ZeissFiscalYear, value: item.ZeissFiscalYear});
                        } else {
                          fiscalYearFilter.push({text: "", value: ""});
                        }

                        if(item.ZeissProjectName != null && item.ZeissProjectName != '')
                        {
                          projectNameFilter.push({text: item.ZeissProjectName, value: item.ZeissProjectName});
                        } else {
                          projectNameFilter.push({text: "", value: ""});
                        }

                        if(item.ZeissVendor != null && item.ZeissVendor != '')
                        {
                          vendorFilter.push({text: item.ZeissVendor, value: item.ZeissVendor});
                        } else {
                          vendorFilter.push({text: "", value: ""});
                        }

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
                      //this.srCreatedFilters = dateFilter.unique("value").toArray();
                      this.srAuthorFilters = authorFilter.unique("value").toArray();
                      this.srTagFilters = tagFilter.unique("value").toArray();
                      var uniqueDepartment = departmentFilter.unique("value").toArray();
                      var uniqueProjectDocType = projectDoctypeFileter.unique("value").toArray();
                      this.srDepartmentFilters = uniqueDepartment;
                      this.srProjectDocTypeFilters = uniqueProjectDocType;
                      this.srFiscalYearFilters = fiscalYearFilter.unique("value").toArray();
                      //this.srModifiedFilters = modifiedDateFilter.unique("value").toArray();
                      //this.srEditorFilters = editorFilter.unique("value").toArray();
                      this.srProjectNameFilters = projectNameFilter.unique("value").toArray();
                      this.srVendorFilters = vendorFilter.unique("value").toArray();

                      //count group info
                      if(this.groupKey === "ZeissDepartmentOfDoc") {
                        for(var uIndex = 0; uIndex < uniqueDepartment.length; uIndex++) {
                          var curDepText = uniqueDepartment[uIndex].value;
                          var count = departmentFilter.count(function(dpFilterItem) {
                            return dpFilterItem.text == curDepText;
                          });
                          groups.push({isSelect: true, key: uniqueDepartment[uIndex].value,
                            num: count});
                        }
                      } else if(this.groupKey === "ZeissProjectDocType") {
                        for(var singleFilter in uniqueProjectDocType) {
                          var curPDTText = uniqueProjectDocType[singleFilter].value;
                          var count = projectDoctypeFileter.count(function(projectdocitem) {
                              return projectdocitem.text === curPDTText
                          });
                          groups.push({isSelect: true, key: curPDTText,num: count});
                        }
                      }

                      this.groups = groups.toArray();
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
  padding-top: 5px;
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
.srcontainer
{
  padding-top: 15px;
}
</style>
