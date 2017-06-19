<template>
  <div>
    <el-table :data="resultData"  :height="600" style="width: 820px">
      <el-table-column label="Created Date" :width="180" sortable prop="Created"
          :filters="dateFilter" :filter-method="filterCreateDate" filter-placement="bottom-end">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.Created.substring(0, 10) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Document" :width="260">
        <template scope="scope">
          <a v-bind:href="'\\' + scope.row.FileRef" target="_blank">{{ scope.row.FileLeafRef }}</a>
        </template>
      </el-table-column>
      <el-table-column label="Author" :width="160"  sortable prop="Author"
            :filters="authorFilter" :filter-method="filterAuthor" filter-placement="bottom-end">
        <template scope="scope">
          {{scope.row.Author}}
        </template>
      </el-table-column>
      <el-table-column label="Keywords" :width="200" prop="TaxKeywordTaxHTField"
            :filters="tagFilter" :filter-method="filterTag" filter-placement="bottom-end">
        <template scope="scope">
          <el-tag class="sr-el-tag"  v-for="tagText in scope.row.TaxKeywordTaxHTField">{{tagText}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'SearchResult',
    props: ['resultData', 'dateFilter', 'authorFilter', 'tagFilter'],
    data() {
      return {
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
      }
    }
  }
</script>

<style scoped>
.sr-el-tag
{
  margin-right: 5px;
}
</style>
