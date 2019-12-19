<template>
  <Page class="page" :actionBarHidden="true" @loaded="handleLoaded">
    <home v-if="hasSignedIn" />
    <sign-in v-else />
  </Page>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { getAPIURL } from '@/helpers';

const api = getAPIURL();

export default {
  computed: {
    hasSignedIn() {
      return this.getAccount();
    }
  },
  methods: {
    ...mapGetters([
      'getAccount'
    ]),
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

            return;
          });

          this.setAccount(account);
        }
      });
    }
  }
}
</script>
