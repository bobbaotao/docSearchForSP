import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'
import SearchPage from  '@/components/SearchPage'
import SearchBox from '@/components/SearchBox'
import AdvancedSearch from '@/components/AdvancedSearch'
//import SearchResult from '@/components/SearchResult'

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
    }
  ]
})
