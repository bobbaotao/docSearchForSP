import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'
import SearchPage from  '@/components/SearchPage'
import SearchBox from '@/components/SearchBox'
import AdvancedSearch from '@/components/AdvancedSearch'
//import SearchResult from '@/components/SearchResult'
//import LeftNavigation from '@/components/LeftNavigation'
import ResultByGroup from '@/components/ResultByGroup'
import DocAuditReport from '@/components/DocAuditReport'
import AllDocInfoReport from '@/components/AllDocInfoReport'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchBox',
      component: SearchBox
    },
    {
      path: '/AdvancedSearch',
      name: 'AdvancedSearch',
      component: AdvancedSearch
    },
    {
      path: '/SearchPage',
      name: 'SearchPage',
      component: SearchPage
    }//,
    // {
    //   path: '/LeftNavigation',
    //   name: 'LeftNavigation',
    //   component: LeftNavigation
    // }
    ,
    {
      path: '/ResultByGroup',
      name: 'ResultByGroup',
      component: ResultByGroup
    }
    ,
    {
      path: '/DocAuditReport',
      name: 'DocAuditReport',
      component: DocAuditReport
    }
    ,
    {
      path: '/AllDocInfoReport',
      name: 'AllDocInfoReport',
      component: AllDocInfoReport
    }
  ]
})
