<template>
  <FlexboxLayout v-if="isBusy" flexDirection="column" alignItems="center" justifyContent="center">
    <ActivityIndicator :busy="isBusy" />
  </FlexboxLayout>
  <StackLayout v-else class="container" orientation="vertical" verticalAlignemnt="stretch">
    <!-- Header -->
    <FlexboxLayout class="header" flexDirection="row" justifyContent="stretch">
      <FlexboxLayout v-if="hasResults" class="flex-1" flexDirection="column" alignItems="flex-start">
        <Label class="text-button" text="Go Back" @tap="handleGoBack" />
      </FlexboxLayout>
      <FlexboxLayout v-else-if="isServiceProvider" class="flex-1" flexDirection="column" alignItems="flex-start">
        <Label class="text-button" text="My Listings" />
      </FlexboxLayout>
      <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-end">
        <Label class="text-button" text="Sign Out" @tap="handleSignOut" />
      </FlexboxLayout>
    </FlexboxLayout>

    <!-- Search Results -->
    <FlexboxLayout v-if="hasResults" class="query" flexDirection="column">
      <Label :text="getQueryText" />
    </FlexboxLayout>
    <ScrollView v-if="hasResults" orientation="vertical" :scrollBarIndicatorVisible="false" height="100%">
      <StackLayout orientation="vertical" verticalAlignment="stretch">
        <listing
          v-bind:class="{ spacing: index !== (listings.length - 1) }"
          v-bind:key="listing._id"
          v-for="(listing) in listings"
          :id="listing._id"
          :accountId="listing.accountId"
          :topic="listing.topic"
          :tutor="listing.tutor"
          :location="listing.location"
          :price="listing.price"
          :duration="listing.duration"
          :time="listing.time"
          :ratings="listing.ratings"
        />
      </StackLayout>
    </ScrollView>

    <!-- Search Bar -->
    <FlexboxLayout v-else flexDirection="row" height="100%">
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
  </StackLayout>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { getAPIURL } from '@/helpers';

const api = getAPIURL();

export default {
  computed: {
    ...mapGetters([
      'getIsBusy',
      'getAccount',
      'getSearchQuery',
      'getResults'
    ]),
    isBusy() {
      return this.getIsBusy;
    },
    isServiceProvider() {
      return this.getAccount.accountType === 'Service Provider';
    },
    hasResults() {
      return this.getResults.length > 0;
    },
    getQueryText() {
      const query = this.getSearchQuery;
      const results = this.getResults;

      return `Search Results for "${query}" (${results.length})`;
    },
    listings() {
      return this.getResults;
    }
  },
  methods: {
    ...mapMutations([
      'setIsBusy',
      'clearResults',
      'resetApp'
    ]),
    handleGoBack() {
      this.clearResults();
    },
    handleSignOut() {
      this.setIsBusy(true);

      this.axios.post(`${api}/account/logout`).then(() => {
        this.resetApp();
      }).catch(() => {
        this.setIsBusy(false);
      });
    }
  }
}
</script>

<style scoped>
.container {
  padding: 0px 80px;
}

.header {
  padding: 20px 0px;
}

.heading {
  padding-bottom: 20px;
  font-size: 34px;
}

.flex-1 {
  flex: 1;
}

.text-button {
  font-size: 16px;
  font-weight: 500;
}

.query {
  font-size: 16px;
  margin: 10px 0;
}

.spacing {
  margin-bottom: 40px;
}
</style>
