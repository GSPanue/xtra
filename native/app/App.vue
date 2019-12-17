<template>
  <Page class="page" :actionBarHidden="true" @loaded="handleLoaded">
    <home v-if="isAuthenticated" />
    <sign-in v-else />
  </Page>
</template>

<script>
import { mapMutations } from 'vuex';
import { getAPIURL } from '@/helpers';

const api = getAPIURL();

export default {
  data() {
    return {
      isAuthenticated: false
    }
  },
  methods: {
    ...mapMutations([
      'setAccount',
      'setListings'
    ]),
    handleLoaded() {
      this.axios.get(`${api}/account/find`).then(({ data }) => {
        const account = data;
        const isServiceProvider = account.accountType === 'Service Provider';

        if (isServiceProvider) {
          this.axios.get(`${api}/listing/find`, {
            params: {
              accountId: account._id
            }
          }).then(({ data: listings }) => {
            this.setAccount(account);
            this.setListings(listings);

            this.isAuthenticated = true;
            return;
          });

          this.setAccount(account);

          this.isAuthenticated = true;
        }
      })
      .catch(() => {
        this.isAuthenticated = false
      });
    }
  }
}
</script>
