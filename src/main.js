
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import router from './router'
Vue.use(Router);

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

axios.defaults.withCredentials=true
axios.defaults.baseURL="http://39.98.165.19:8080"

Vue.prototype.$http=axios;

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

import sellermain from './components/sellerMain'
import managemain from './components/manageMain'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import snav from './components/Snav'
import rules from './components/Rules'
import shopinfors from './components/shopInformation'
import login from './components/login'

const router=new Router({
  mode:'history',
  routes:[
   {
   path: '/',
   name:'sellermain',
   component:sellermain
   },
  {
    path:'/shopInfo',
    name:'shopinfos',
    component:shopinfors
  },
  {
    path:'/managemain',
    component:managemain
  },
  {
    path:'/snav',
    component:snav
  },
  {
    path: '/rules',
    component:rules
  },
  {
    path:'/login',
    component:login
  }
]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
