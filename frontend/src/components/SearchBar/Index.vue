<template>
  <el-row type="flex">
    <el-input
      @keypress.enter.native="handleSubmit"
      placeholder="Search for a class or activity..."
      v-model="input"
      :disabled="getSearchIsFetching"
    />
    <el-tooltip content="Search" placement="bottom">
      <el-button
        icon="el-icon-search"
        @click="handleSubmit"
        :loading="getSearchIsFetching"
      />
    </el-tooltip>
  </el-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { getAPIURL } from '@/helpers';

const api = getAPIURL();

export default {
  computed: {
    ...mapGetters([
      'getSearchIsFetching'
    ])
  },
  data() {
    return {
      input: ''
    };
  },
  methods: {
    ...mapGetters([
      'getHomeShowInitialView'
    ]),
    ...mapMutations([
      'setHomeShowInitialView',
      'setSearchQuery',
      'setSearchResults',
      'setSearchIsFetching',
      'setSortBy',
      'setOrder',
      'setRatingFilter',
      'setPriceRangeFilter',
      'setTopicsFilter'
    ]),
    handleSubmit() {
      const query = this.input;

      if (query.length > 0) {
        this.setSearchIsFetching(true);

        this.axios.get(`${api}/listing/find`, {
          params: {
            topic: query
          }
        }).then(({ data: listings }) => {
          this.setSearchQuery(query);
          this.setSearchResults(listings);
          this.clearInput();

          this.setSortBy('Default');
          this.setOrder(null);
          this.setRatingFilter(null);
          this.setPriceRangeFilter([null, null]);
          this.setTopicsFilter([]);

          this.setSearchIsFetching(false);

          const isShowingInitialView = this.getHomeShowInitialView();

          if (isShowingInitialView) {
            this.setHomeShowInitialView(false);
          }
        });
      }
    },
    clearInput() {
      this.input = '';
    }
  }
};
</script>

<style scoped>
.el-input {
  margin-right: 2.5px;
}

.el-button {
  margin-left: 2.5px;
}
</style>
