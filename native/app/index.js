import Vue from 'nativescript-vue'
import App from '@/App'
import store from '@/store';

import Home from '@/views/Home/Index';
import SignIn from '@/views/SignIn/Index';

Vue.component('home', Home);
Vue.component('sign-in', SignIn);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start();
