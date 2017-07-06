<template>
  <div>
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
      <el-table-column label="Department" :width="160" prop="ZeissDepartmentOfDoc"
          sortable :filters="departmentFilter" :filter-method="filterDepartment" filter-placement="top">
        <template scope="scope">
          {{scope.row.ZeissDepartmentOfDoc}}
        </template>
      </el-table-column>
      <el-table-column label="Project Name" width="200" prop="ZeissProjectName"
          sortable :show-overflow-tooltip=true>
        <template scope="scope">
          {{scope.row.ZeissProjectName}}
        </template>
      </el-table-column>
      <el-table-column label="Type" :width="160" prop="ZeissProjectDocType"
          sortable :filters="projectDoctypeFileter" :filter-method="filterProjectDocType" filter-placement="top">
        <template scope="scope">
          {{scope.row.ZeissProjectDocType}}
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
  export default {
    name: 'SearchResult',
    props: ['resultData', 'dateFilter', 'authorFilter', 'modifiedDateFilter', 'editorFilter', 'tagFilter', 'departmentFilter', 'projectDoctypeFileter'],
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
      },
      filterDepartment: function(value, row) {
        return row.ZeissDepartmentOfDoc === value;
      },
      filterProjectDocType: function(value, row) {
        return row.ZeissProjectDocType === value;
      },
      filterEditor: function(value, row) {
        return row.Editor === value;
      },
      filterModifiedDate(value, row) {
        return row.Modified.indexOf(value) >= 0;
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
