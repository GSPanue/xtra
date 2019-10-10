import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import App from '@/App';

Vue.use(Vuetify);

export default new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
