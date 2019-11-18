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
  MenuItem,
  Tooltip,
  Badge,
  Rate,
  InfiniteScroll,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Slider,
  Checkbox
} from 'element-ui';

import SideBar from '@/components/SideBar/Index';
import Home from '@/components/Home/Index';
import Services from '@/components/Services/Index';
import SignOut from '@/components/SignOut/Index';
import SearchBar from '@/components/SearchBar/Index';
import HomeHeader from '@/components/HomeHeader/Index';
import Listing from '@/components/Listing/Index';

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
Vue.use(Tooltip);
Vue.use(Badge);
Vue.use(Rate);
Vue.use(InfiniteScroll);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Slider);
Vue.use(Checkbox);

Vue.component('side-bar', SideBar);
Vue.component('home', Home);
Vue.component('services', Services);
Vue.component('sign-out', SignOut);
Vue.component('search-bar', SearchBar);
Vue.component('home-header', HomeHeader);
Vue.component('listing', Listing);

export default new Vue({
  store,
  el: '#app',
  components: { App },
  router: new VueRouter({ mode: 'history', routes }),
  template: '<App/>'
});
