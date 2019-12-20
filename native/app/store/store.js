import Vue from 'nativescript-vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    account: null,
    listings: []
  },
  getters: {
    getAccount: ({ account }) => (
      account
    ),
    getListings: ({ listings }) => (
      listings
    )
  },
  mutations: {
    setAccount: (store, newAccount) => {
      store.account = newAccount;
    },
    setListings: (store, newListings) => {
      store.listings = newListings
    },
    resetApp: (store) => {
      store.account = null;
      store.listings = [];
    }
  }
});

export default store;
