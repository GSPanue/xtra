<template>
  <FlexboxLayout flexDirection="row">
    <SearchBar
      ref="searchBar"
      class="search-bar"
      hint="Search for a class or activity..."
      @submit="handleSubmit"
      @clear="clearFocus"
      @loaded="clearFocus"
    />
  </FlexboxLayout>
</template>

<script>
import { mapMutations } from 'vuex';
import { getAPIURL, sendAlert } from '@/helpers';

const api = getAPIURL();

export default {
  methods: {
    ...mapMutations([
      'setIsBusy',
      'setSearchQuery',
      'setResults'
    ]),
    clearFocus(args) {
      const searchBar = args.object;

      searchBar.android.clearFocus();
    },
    handleSubmit(args) {
      const query = args.object.text;
      this.clearFocus(args);
      this.setIsBusy(true);

      this.axios.get(`${api}/listing/find`, {
        params: {
          topic: query
        }
      }).then(({ data: results }) => {
        const hasNoResults = results.length === 0;

        this.setIsBusy(false);

        if (hasNoResults) {
          sendAlert('No listings were found.');
          return;
        }

        this.setSearchQuery(query);
        this.setResults(results);
      }).catch(() => {
        this.setIsBusy(false);
      });
    }
  }
}
</script>

<style scoped>
.search-bar {
  font-size: 16px;
}
</style>
