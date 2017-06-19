<template>
  <div>
    <!--<div class='modalLayout' v-if="isLoading === true">
      <Spinner class="spinnerLoader"></Spinner>
    </div>
  -->
    <div v-if="isShowSearchBox">
      <SearchBox  v-on:dosearch="SearchDataFromSP($event)">
      </SearchBox>
      <!--<el-button v-on:click="initConnect" type="primary" icon="share">
      </el-button>
    -->
      <div class="errorMessage">
        {{message}}
      </div>
    </div>
    <div v-if="isShowSearchResult">
      <SearchResult v-bind:resultData="resultData" v-bind:dateFilter="srCreatedFilters"
                    v-bind:authorFilter="srAuthorFilters" v-bind:tagFilter="srTagFilters">
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
                  srTagFilters: []
                }
            },
            create: function() {

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
                  const requestUrl = "/sites/DevSite_Bob/_vti_bin/Zeiss.DocManagement/DocMService.svc/Search";
                  //const requestUrl = "http://localhost:3000/doc/docsearch";
                  var requestData = {
                    param : {
                      query: strQuery,
                      viewFields: "<FieldRef Name='FileLeafRef' /><FieldRef Name='FileRef' /><FieldRef Name='Created' /><FieldRef Name='File_x0020_Type' /><FieldRef Name='Editor' /><FieldRef Name='Author' /><FieldRef Name='TaxKeywordTaxHTField' />",
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
                        if(item.TaxKeywordTaxHTField != null) {
                          if(item.TaxKeywordTaxHTField.indexOf(";") > 0 ) {
                            var keywords = item.TaxKeywordTaxHTField.split(";");
                            for(var ikey = 0; ikey < keywords.length; ikey ++ ) {
                              keywords[ikey] = keywords[ikey].substring(0,  keywords[ikey].indexOf('|'));
                              tagFilter.push({text: keywords[ikey], value: keywords[ikey]});
                            }
                            item.TaxKeywordTaxHTField = keywords;
                          }
                        }
                        var createdDate = item.Created.substring(0,10)
                        dateFilter.push({text: createdDate, value: createdDate});
                        authorFilter.push({text: item.Author, value: item.Author});
                      }
                      this.srCreatedFilters = dateFilter.unique("value").toArray();
                      this.srAuthorFilters = authorFilter.unique("value").toArray();
                      this.srTagFilters = tagFilter.unique("value").toArray();

                      this.resultData = resultRows;
                      this.isShowSearchResult = true;
                    } else {
                      this.message = response.data.SearchDocByKeyResult.mesage;
                    }
                  }).catch((error) => {
                    this.isLoading = false;
                  });
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
</style>
