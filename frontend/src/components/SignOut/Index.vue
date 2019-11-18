<template>
  <el-col class="container">
    <el-row type="flex" align="middle" justify="center">
      <el-col>
        <h3>Are you sure you want to sign out?</h3>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" justify="center">
      <el-col>
        <el-button class="cancel-button" @click="handleCancel">Cancel</el-button>
      </el-col>
      <el-col>
        <el-button class="sign-out-button" type="primary" @click="handleSignOut">Sign Out</el-button>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import store from 'store';
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations([
      'setRootView',
      'setHomeShowInitialView',
      'setAccount',
      'setSearchQuery',
      'setSearchResults',
      'setSortBy',
      'setOrder',
      'setRatingFilter',
      'setPriceRangeFilter',
      'setTopicsFilter',
      'setSearchIsFetching',
    ]),
    handleCancel() {
      this.setRootView('home');
    },
    handleSignOut() {
      this.setAccount(null);
      this.$router.push('/signin');

      this.setRootView('home');
      this.setHomeShowInitialView(true);
      this.setSearchQuery('');
      this.setSearchResults([]);
      this.setSortBy('Default');
      this.setOrder(null);
      this.setRatingFilter(null);
      this.setPriceRangeFilter([null, null]);
      this.setTopicsFilter([]);
      this.setSearchIsFetching(false);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.cancel-button {
  margin-right: 5px;
}

.sign-out-button {
  margin-left: 5px;
}
</style>
