import axios from 'axios';
import store from '@/store';
import { getAPIURL } from '@/helpers';

class Auth {
  handle({ name }, from, next) {
    const api = getAPIURL();

    axios.get(`${api}/account/find`).then(({ data }) => {
      const account = data;
      const isServiceProvider = account.accountType === 'Service Provider';

      if (isServiceProvider) {
        axios.get(`${api}/listing/find`, {
          params: {
            accountId: account._id
          }
        }).then(({ data: listings }) => {
          store._mutations.setAccount[0](account);
          store._mutations.setListings[0](listings);

          if (name !== 'home') {
            return next('/');
          }

          return next();
        });
      }
      else {
        store._mutations.setAccount[0](account);

        if (name !== 'home') {
          return next('/');
        }

        return next();
      }
    }).catch(() => {
      if (name !== 'signIn') {
        return next('signin');
      }

      return next();
    });
  }
}

export default Auth;
