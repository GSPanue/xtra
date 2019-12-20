<template>
  <FlexboxLayout v-if="isBusy" flexDirection="column" alignItems="center" justifyContent="center">
    <ActivityIndicator :busy="isBusy" />
  </FlexboxLayout>
  <FlexboxLayout v-else class="container" flexDirection="column" alignItems="stretch">
    <!-- Header -->
    <FlexboxLayout flexDirection="row" justifyContent="stretch">
      <FlexboxLayout v-if="isServiceProvider" class="flex-1" flexDirection="column" alignItems="flex-start">
        <Label class="text-button" text="My Listings" />
      </FlexboxLayout>
      <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-end">
        <Label class="text-button" text="Sign Out" @tap="handleSignOut" />
      </FlexboxLayout>
    </FlexboxLayout>

    <!-- Search Bar -->
    <FlexboxLayout class="flex-1" flexDirection="row">
      <FlexboxLayout
        class="flex-1"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Label class="heading" text="Xtra" />
        <search-bar />
      </FlexboxLayout>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { getAPIURL } from '@/helpers';

const api = getAPIURL();

export default {
  data() {
    return {
      isBusy: false
    }
  },
  computed: {
    ...mapGetters([
      'getAccount'
    ]),
    isServiceProvider() {
      return this.getAccount.accountType === 'Service Provider';
    }
  },
  methods: {
    ...mapMutations([
      'resetApp'
    ]),
    handleSignOut() {
      this.isBusy = true;

      this.axios.post(`${api}/account/logout`).then(() => {
        this.resetApp();
      }).catch(() => {
        this.isBusy = false;
      });
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px 80px 0 80px
}

.heading {
  padding-bottom: 60px;
  font-size: 34px;
}

.flex-1 {
  flex: 1;
}

.text-button {
  font-size: 16px;
}
</style>
