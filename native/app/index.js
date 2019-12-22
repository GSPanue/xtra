import Vue from 'nativescript-vue'
import Axios from 'axios';
import VueAxios from 'vue-axios';
import App from '@/App'
import store from '@/store';

import Home from '@/views/Home/Index';
import SignIn from '@/views/SignIn/Index';

import Input from '@/components/Input/Index';
import SearchBar from '@/components/SearchBar/Index';
import Listing from '@/components/Listing/Index';

Vue.use(VueAxios, Axios);

Vue.component('home', Home);
Vue.component('sign-in', SignIn);
Vue.component('input', Input);
Vue.component('search-bar', SearchBar);
Vue.component('listing', Listing);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start();
