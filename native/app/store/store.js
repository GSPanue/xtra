import Vue from 'nativescript-vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isBusy: false,
    account: null,
    searchQuery: '',
    results: [],
    listings: [],
    showListings: false
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
    getResults: ({ results }) => (
      results
    ),
    getListings: ({ listings }) => (
      listings
    ),
    getShowListings: ({ showListings }) => (
      showListings
    )
  },
  mutations: {
    setIsBusy: (store, newIsBusy) => {
      store.isBusy = newIsBusy;
    },
    setAccount: (store, newAccount) => {
      store.account = newAccount;
    },
    setSearchQuery: (store, newSearchQuery) => {
      store.searchQuery = newSearchQuery;
    },
    setResults: (store, newResults) => {
      store.results = newResults;
    },
    setListings: (store, newListings) => {
      store.listings = newListings;
    },
    setShowListings: (store, newShowListings) => {
      store.showListings = newShowListings;
    },
    clearResults: (store) => {
      store.searchQuery = '';
      store.results = [];
    },
    resetApp: (store) => {
      store.isBusy = false;
      store.account = null;
      store.searchQuery = '';
      store.results = [];
      store.listings = [];
      store.showListings = false;
    }
  }
});

export default store;
