import Vue from 'vue'
import App from './App'
import BuyDialogComponent from '@/components/Common/BuyDialog'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase/app'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.component('app-buy-dialog', BuyDialogComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyCB8X8udk-tm4ufvctjglI9ILHgOjbHuPg',
      authDomain: 'onlinestore-12cd1.firebaseapp.com',
      databaseURL: 'https://onlinestore-12cd1.firebaseio.com',
      projectId: 'onlinestore-12cd1',
      storageBucket: 'onlinestore-12cd1.appspot.com',
      messagingSenderId: '485037345670'
    }
    fb.initializeApp(config)

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchProducts')
  }
})
