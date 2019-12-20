import Vue from 'nativescript-vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isBusy: false,
    account: null,
    searchQuery: '',
    searchResults: [],
    listings: []
  },
  getters: {
    getIsBusy: ({ isBusy }) => (
      isBusy
    ),
    getAccount: ({ account }) => (
      account
    ),
    getSearchQuery: ({ searchQuery }) => (
      searchQuery
    ),
    getSearchResults: ({ searchResults }) => (
      searchResults
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
    setSearchQuery: (store, newSearchQuery) => {
      store.searchQuery = newSearchQuery;
    },
    setSearchResults: (store, newSearchResults) => {
      store.searchResults = newSearchResults;
    },
    setListings: (store, newListings) => {
      store.listings = newListings
    },
    resetApp: (store) => {
      store.isBusy = false;
      store.account = null;
      store.searchQuery = '';
      store.searchResults = [];
      store.listings = [];
    }
  }
});

export default store;
