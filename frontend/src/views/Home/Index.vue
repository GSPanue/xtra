<template>
  <el-row class="container" type="flex">
    <el-col class="side-bar">
      <side-bar />
    </el-col>
    <el-col v-bind:class="{content: getRootView === 'home'}">
      <home v-if="getRootView === 'home'" />
      <services v-else-if="getRootView === 'services'" />
      <sign-out v-else-if="getRootView === 'signout'" />
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getRootView'
    ])
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}

.content {
  overflow-y: scroll;
}

.side-bar {
  width: initial;
}
</style>
