import store from 'store';

class Auth {
  handle({ name }, from, next) {
    const auth = (store.get('auth') === undefined) ? {} : store.get('auth');
    const isAuthenticated = Object.keys(auth).length > 0;

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
