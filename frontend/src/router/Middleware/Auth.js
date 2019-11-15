import store from '@/store';

class Auth {
  handle({ name }, from, next) {
    const account = store.getters.getAccount;
    const isAuthenticated = account !== null;

    if (name === 'home') {
      if (isAuthenticated) {
        return next();
      }

      return next('signin');
    }
    else if (name === 'signIn') {
      if (isAuthenticated) {
        return next('/');
      }

      return next();
    }
  }
}

export default Auth;
