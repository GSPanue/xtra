import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    root: {
      view: 'home'
    }
  },
  getters: {
    getRootView: ({ root: { view } }) => (
      view
    )
  },
  mutations: {
    setRootView: (store, newView) => {
      store.root.view = newView;
    }
  }
});

export default store;
