import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    root: {
      view: 'home',
    },
    home: {
      showInitialView: true
    },
    account: null,
    search: {
      query: '',
      results: [],
      isFetching: false,
      sortBy: 'Default',
      order: null,
      filters: {
        rating: {
          option: null
        },
        price: {
          range: [null, null]
        },
        topics: []
      }
    },
    listings: []
  },
  getters: {
    getRootView: ({ root: { view } }) => (
      view
    ),
    getHomeShowInitialView: ({ home: { showInitialView } }) => (
      showInitialView
    ),
    getAccount: ({ account }) => (
      account
    ),
    getSearchQuery: ({ search: { query } }) => (
      query
    ),
    getSearchResults: ({ search: { results } }) => (
      results
    ),
    getSortBy: ({ search: { sortBy } }) => (
      sortBy
    ),
    getOrder: ({ search: { order } }) => (
      order
    ),
    getRatingFilter: ({ search: { filters: { rating: { option } } } }) => (
      option
    ),
    getPriceRangeFilter: ({ search: { filters: { price: { range } } } }) => (
      range
    ),
    getTopicsFilter: ({ search: { filters: { topics } } }) => (
      topics
    ),
    getSearchIsFetching: ({ search: { isFetching } }) => (
      isFetching
    ),
    getListings: ({ listings }) => (
      listings
    )
  },
  mutations: {
    setRootView: (store, newView) => {
      store.root.view = newView;
    },
    setHomeShowInitialView: (store, newInitialView) => {
      store.home.showInitialView = newInitialView;
    },
    setAccount: (store, newAccount) => {
      store.account = newAccount;
    },
    setSearchQuery: (store, newQuery) => {
      store.search.query = newQuery;
    },
    setSearchResults: (store, newResults) => {
      store.search.results = newResults;
    },
    setSortBy: (store, newSortBy) => {
      store.search.sortBy = newSortBy;
    },
    setOrder: (store, newOrder) => {
      store.search.order = newOrder;
    },
    setRatingFilter: (store, newRatingFilter) => {
      store.search.filters.rating.option = newRatingFilter;
    },
    setPriceRangeFilter: (store, newPriceRangeFilter) => {
      store.search.filters.price.range = newPriceRangeFilter;
    },
    setTopicsFilter: (store, newTopics) => {
      store.search.filters.topics = newTopics;
    },
    setSearchIsFetching: (store, newIsFetching) => {
      store.search.isFetching = newIsFetching;
    },
    setListings: (store, newListings) => {
      store.listings = newListings;
    }
  }
});

export default store;
