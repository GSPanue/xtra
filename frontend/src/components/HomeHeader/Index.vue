<template>
  <el-row class="container" type="flex" align="middle" justify="center">
    <el-col v-if="shouldShowSearchBar">
      <el-row type="flex" justify="start">
        <search-bar class="search-bar" />
      </el-row>
    </el-col>
    <el-col>
      <el-row type="flex" align="middle" justify="end">
        <h4 class="h4">Hello, {{`${getAccount.firstName} ${getAccount.lastName}`}}&nbsp;</h4>
        <el-tooltip content="Sign Out" placement="bottom">
          <el-button
            class="sign-out-button"
            icon="el-icon-switch-button"
            @click="handleSignOut"
          />
        </el-tooltip>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: [
    'shouldShowSearchBar'
  ],
  computed: {
    ...mapGetters([
      'getAccount'
    ])
  },
  methods: {
    ...mapMutations([
      'setRootView'
    ]),
    handleSignOut() {
      this.setRootView('signout');
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px 0px 0px 0px;
}

.search-bar {
  max-width: 350px;
  width: 100%;
}

.h4 {
  margin: 0;
}

.sign-out-button {
  margin-left: 5px;
}
</style>
