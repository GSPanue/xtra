import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import Axios from 'axios';
import App from '@/App';
import routes from '@/router/routes';
import { Row, Col, Card, Form, FormItem, Input, Button, Radio, Dialog } from 'element-ui';

Vue.use(VueRouter);
Vue.use(VueAxios, Axios);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Radio);
Vue.use(Dialog);

export default new Vue({
  el: '#app',
  components: { App },
  router: new VueRouter({ mode: 'history', routes }),
  template: '<App/>'
});
