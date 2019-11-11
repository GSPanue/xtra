<template>
  <el-menu default-active="home" :collapse="true" @select="handleSelect">
    <el-menu-item index="home">
      <i class="el-icon-house"></i>
      <span slot="title">Home</span>
    </el-menu-item>
    <div class="profile">
      <el-menu-item index="profile">
        <i class="el-icon-user"></i>
        <span slot="title">Profile</span>
      </el-menu-item>
    </div>
    <el-menu-item index="signout">
      <i class="el-icon-switch-button"></i>
      <span slot="title">Sign Out</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations([
      'setRootView'
    ]),
    handleSelect(index) {
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

.profile {
  flex: 1;
}
</style>
