
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import router from './router'
Vue.use(Router);

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import locale from 'iview/dist/locale/en-US';
Vue.use(iView, {locale: locale});

Vue.use(iView);

import echarts from 'echarts'

Vue.prototype.$echarts=echarts

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://39.98.165.19:8080"
// http://176.122.152.6:8080
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

import sellermain from './components/sellerMain'
import managemain from './components/manageMain'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import snav from './components/Snav'
import rules from './components/registerRules'
import shopinfors from './components/shopInformation'
import login from './components/login'
import advertise from './components/advertisement'
import allproducts from './components/Allproducts'
import advertisehomepage from './components/AdvertiseHomepage'
import manageadvertise from './components/ManageAdvertisement'
import changepassword from './components/changePassword'
import home from './components/home'
import manageorders from './components/ManageOrders'
import saleshistory from './components/salesHistory'
import shopincome from './components/shopIncome'
const router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: changepassword
    },
    {
      path: '/manageadvertise',
      component: manageadvertise
    },
    {
      path: '/advertise/advertisehomepage',
      name: 'advertisehomepage',
      component: advertisehomepage
    },
    {
      path: '/advertise/allproducts',
      name: 'allproducts',
      component: allproducts
    },
    {
      path: '/sellermain',
      name: 'sellermain',
      component: sellermain
    },
    {
      path: '/shopInfo',
      name: 'shopinfos',
      component: shopinfors
    },
    {
      path: '/managemain',
      component: managemain
    },
    {
      path: '/snav',
      component: snav
    },
    {
      path: '/rules',
      component: rules
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/advertise',
      component: advertise
    },
    {
      path:'/manageorders',
      component:manageorders
    },
    {
      path:'/saleshistory',
      component:saleshistory
    },
    {
      path:'/shopincome',
      component:shopincome
    }
  ],
  components: {
    default: home,
    advertise: advertise,
    shopInfo: shopinfors
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
