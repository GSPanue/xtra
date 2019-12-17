<template>
  <Page class="page" :actionBarHidden="true" @loaded="handleLoaded">
    <home v-if="isAuthenticated" />
    <sign-in v-else />
  </Page>
</template>

<script>
import { getAPIURL } from '@/helpers';

const api = getAPIURL();

export default {
  data() {
    return {
      isAuthenticated: false
    }
  },
  methods: {
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
            /**
             * ToDo:
             *
             * setAccount(account);
             * setListings(lsitings);
             *
             */

            this.isAuthenticated = true;
            return;
          });

          /**
           * ToDo:
           *
           * setAccount(account);
           */
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
