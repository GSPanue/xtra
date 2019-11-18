<template>
  <el-menu :default-active="getRootView" :collapse="true" @select="handleSelect">
    <el-menu-item index="home">
      <i class="el-icon-house"></i>
      <span slot="title">Home</span>
    </el-menu-item>
    <el-menu-item index="listings" v-if="getAccount.accountType === 'Service Provider'">
      <i class="el-icon-files"></i>
      <span slot="title">My Listings</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getRootView',
      'getAccount'
    ])
  },
  methods: {
    ...mapGetters([
      'getHomeShowInitialView'
    ]),
    ...mapMutations([
      'setRootView',
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
    handleSelect(index) {
      const currentRootView = this.getRootView;
      const willShowListings = (currentRootView === 'home' && index === 'listings');
      const hasAlreadySelectedHome = (currentRootView === 'home' && index === 'home');

      if (willShowListings || hasAlreadySelectedHome) {
        this.setHomeShowInitialView(true);

        this.setSearchQuery('');
        this.setSearchResults([]);
        this.setSearchIsFetching(false);
        this.setSortBy('Default');
        this.setOrder(null);
        this.setRatingFilter(null);
        this.setPriceRangeFilter([null, null]);
        this.setTopicsFilter([]);
      }

      this.setRootView(index);
    }
  }
};
</script>

<style scoped>
.el-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
