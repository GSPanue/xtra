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
        <el-button class="sign-out-button" type="primary" @click="handleSignOut" :loading="isLoggingOut">Sign Out</el-button>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import { mapMutations } from 'vuex';
import { getAPIURL } from '@/helpers';

const api = getAPIURL();

export default {
  data() {
    return {
      isLoggingOut: false
    };
  },
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
      'setSearchIsFetching',,
      'setListings'
    ]),
    handleCancel() {
      this.setRootView('home');
    },
    handleSignOut() {
      this.isLoggingOut = true;

      this.axios.post(`${api}/account/logout`).then(() => {
        this.$router.push('/signin', () => {
          this.setAccount(null);
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
          this.setListings([]);

          this.isLoggingOut = false;
        });
      }).catch(() => {
        this.isLoggingOut = false;
      });
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
