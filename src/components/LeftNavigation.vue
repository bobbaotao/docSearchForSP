<template>
  <el-tree :data="linkData" :props="defaultProps" @node-click="nodeClicked" :default-expand-all=true class="leftNav">
  </el-tree>
</template>

<script>
var moment = require('moment');

export default {
    data() {
      return {
        linkData: [{Title: "Recent Document", LinkType: "RecentDoc", keywords: ""},
                   {Title: "MED", LinkType: "Department", keywords: "MED"},
                   {Title: "MIK", LinkType: "Department", keywords: "MIK"},
                   {Title: "IMT", LinkType: "Department", keywords: "IMT"},
                   {Title: "Vision", LinkType: "Department", keywords: "Vision"},
                   {Title: "SHIC", LinkType: "Department", keywords: "SHIC"},
                   {Title: "CZFS", LinkType: "Department", keywords: "CZFS"},
                   {Title: "CZIMT", LinkType: "Department", keywords: "CZIMT"},
                   {Title: "CZSZ", LinkType: "Department", keywords: "CZSZ"},
                   {Title: "Corporate", LinkType: "Department", keywords: "Corporate"}],
        defaultProps: {
          children: 'children',
          label: "Title"
        }
      }
    },
    name: "LeftNavigation",
    methods: {
      nodeClicked: function(data) {
        if(data.LinkType === "RecentDoc") {
          var dateParam = moment().add(-1, "week").format("YYYY-MM-DD");
          var strquery = "<Where><Geq><FieldRef Name='Created' /><Value IncludeTimeValue='FALSE' Type='DateTime'>"
            + dateParam + "</Value></Geq></Where>";

          this.$router.push({name: 'SearchPage', params: {queryText: strquery}});
        } else if (data.LinkType === "Department") {
          var strquery = "<Where><Eq><FieldRef Name='ZeissDepartmentOfDoc' /><Value Type='Choice'>"
            + data.keywords + "</Value></Eq></Where>";

          this.$router.push({name: 'SearchPage', params: {queryText: strquery, isGroup : true, groupKey: "ZeissProjectDocType"}});
        }
      }
    }
}

</script>

<style scoped>
.leftNav {
  border: 0;
  text-align: left;
}
</style>
