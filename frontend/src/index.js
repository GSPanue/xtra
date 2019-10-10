import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify/lib';
import App from '@/App';
import routes from '@/router/routes';

Vue.use(VueRouter);
Vue.use(Vuetify);

export default new Vue({
  el: '#app',
  components: { App },
  router: new VueRouter({ mode: 'history', routes }),
  template: '<App/>'
});
