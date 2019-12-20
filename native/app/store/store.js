import Vue from 'nativescript-vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isBusy: false,
    account: null,
    listings: []
  },
  getters: {
    getIsBusy: ({ isBusy }) => (
      isBusy
    ),
    getAccount: ({ account }) => (
      account
    ),
    getListings: ({ listings }) => (
      listings
    )
  },
  mutations: {
    setIsBusy: (store, newIsBusy) => {
      store.isBusy = newIsBusy
    },
    setAccount: (store, newAccount) => {
      store.account = newAccount;
    },
    setListings: (store, newListings) => {
      store.listings = newListings
    },
    resetApp: (store) => {
      store.isBusy = false;
      store.account = null;
      store.listings = [];
    }
  }
});

export default store;
