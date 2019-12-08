import axios from 'axios';
import store from '@/store';
import { getAPIURL } from '@/helpers';

class Auth {
  handle({ name }, from, next) {
    const api = getAPIURL();

    axios.get(`${api}/account/find`).then(({ data }) => {
      const account = data;

      store._mutations.setAccount[0](account);

      if (name !== 'home') {
        return next('/');
      }

      return next();
    }).catch(() => {
      if (name !== 'signIn') {
        return next('signin');
      }

      return next();
    });
  }
}

export default Auth;
