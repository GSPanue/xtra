import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import Axios from 'axios';
import App from '@/App';
import store from '@/store';
import routes from '@/router/routes';
import {
  Row,
  Col,
  Card,
  Form,
  FormItem,
  Input,
  Button,
  Radio,
  Dialog,
  Menu,
  MenuItemGroup,
  MenuItem
} from 'element-ui';

import SideBar from '@/components/SideBar/Index';

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
Vue.use(Menu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);

Vue.component('side-bar', SideBar);

export default new Vue({
  store,
  el: '#app',
  components: { App },
  router: new VueRouter({ mode: 'history', routes }),
  template: '<App/>'
});
