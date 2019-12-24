<template>
  <FlexboxLayout flexDirection="column">
    <!-- Remove Listing Button -->
    <FlexboxLayout v-if="editable" flexDirection="row">
      <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-end">
        <Label class="text-button" text="Remove" @tap="handleRemove" />
      </FlexboxLayout>
    </FlexboxLayout>
    <FlexboxLayout class="listing-top" flexDirection="column">
      <!-- Topic & Price -->
      <FlexboxLayout flexDirection="row">
        <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-start">
          <Label
            class="listing-heading"
            :text="getListingHeadingText('Topic')"
            v-on="{ tap: editable ? handleEdit.bind(this, 'Topic') : null }"
          />
          <Label class="listing-value" :text="topic" />
        </FlexboxLayout>
        <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-end">
          <Label
            class="listing-heading"
            :text="getListingHeadingText('Price')"
            v-on="{ tap: editable ? handleEdit.bind(this, 'Price') : null }"
          />
          <Label class="listing-value" :text="`£${price}`" />
        </FlexboxLayout>
      </FlexboxLayout>

      <!-- Tutor & Duration -->
      <FlexboxLayout flexDirection="row">
        <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-start">
          <Label
            class="listing-heading"
            text="Tutor"
          />
          <Label class="listing-value" :text="tutor" />
        </FlexboxLayout>
        <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-end">
          <Label
            class="listing-heading"
            :text="getListingHeadingText('Duration')"
            v-on="{ tap: editable ? handleEdit.bind(this, 'Duration') : null }"
          />
          <Label class="listing-value" :text="duration" />
        </FlexboxLayout>
      </FlexboxLayout>

      <!-- Location & Time -->
      <FlexboxLayout flexDirection="row">
        <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-start">
          <Label
            class="listing-heading"
            :text="getListingHeadingText('Location')"
            v-on="{ tap: editable ? handleEdit.bind(this, 'Location') : null }"
          />
          <Label class="listing-value" :text="location" />
        </FlexboxLayout>
        <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-end">
          <Label
            class="listing-heading"
            :text="getListingHeadingText('Time')"
            v-on="{ tap: editable ? handleEdit.bind(this, 'Time') : null }"
          />
          <Label class="listing-value" :text="time" />
        </FlexboxLayout>
      </FlexboxLayout>
    </FlexboxLayout>

    <!-- Rating -->
    <FlexboxLayout class="listing-bottom" flexDirection="row" alignItems="center">
      <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-start">
        <Label class="listing-value" :text="getRatingText" />
      </FlexboxLayout>
      <FlexboxLayout class="flex-1" flexDirection="column" alignItems="flex-end">
        <Button class="rate-button" text="Rate" @tap="handleRating" :isEnabled="shouldEnableRating" />
      </FlexboxLayout>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { getAPIURL } from '@/helpers';

const api = getAPIURL();

export default {
  props: [
    'id',
    'accountId',
    'topic',
    'price',
    'tutor',
    'duration',
    'location',
    'time',
    'ratings',
    'editable'
  ],
  computed: {
    ...mapGetters([
      'getAccount'
    ]),
    getRatingText() {
      const ratings = this.ratings;
      const totalRatings = ratings.length;

      let rating = 0;

      if (totalRatings > 0) {
        let sum = 0;

        ratings.map(({ rating }) => {
          sum += rating;
        });

        rating = parseFloat((sum / totalRatings).toFixed(1));
      }

      return `Rating (Avg. ${rating}/5, ${totalRatings} Rating${(totalRatings !== 1) ? 's' : ''})`;
    },
    shouldEnableRating() {
      const { _id: accountId } = this.getAccount;
      const listingAccountId = this.accountId;
      const ratings = this.ratings;

      const isNotListing = (accountId !== listingAccountId);
      const hasNotRated = ratings.filter(({ accountId: ratingAccountId }) => (
        ratingAccountId === accountId
      )).length === 0;

      return isNotListing && hasNotRated;
    }
  },
  methods: {
    ...mapGetters([
      'getResults'
    ]),
    ...mapMutations([
      'setIsBusy',
      'setResults',
      'setListings'
    ]),
    getListingHeadingText(heading) {
      return (this.editable) ? `${heading} (Edit)` : heading;
    },
    handleRating() {
      const ratings = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];

      action('Choose a Rating', 'CANCEL', ratings).then((selected) => {
        if (selected !== 'CANCEL') {
          const listingId = this.id;

          const newRating = {
            _id: listingId,
            rating: parseInt(selected.match(/\d/g)[0])
          }

          this.axios.put(`${api}/listing/update`, {
            ...newRating
          }).then(() => {
            return this.axios.get(`${api}/listing/find`, {
              params: {
                _id: listingId
              }
            });
          }).then(({ data: listing }) => {
            const listings = this.getResults();
            const listingIndex = listings.findIndex(({ _id }) => (
              _id === listingId
            ));

            const newListings = [
              ...listings
            ];

            newListings[listingIndex] = listing[0];

            this.setResults(newListings);
          });
        }
      });
    },
    handleEdit(field) {
      const defaultText = this[field.toLowerCase()].toString();

      prompt({
        title: `Edit ${field}`,
        inputType: 'text',
        okButtonText: 'OK',
        cancelButtonText: 'CANCEL',
        defaultText
      }).then(({ result, text }) => {
        const listingId = this.id;

        if (result) {
          this.setIsBusy(true);

          this.axios.get(`${api}/listing/find`, {
            params: {
              _id: listingId
            }
          }).then(({ data: listing }) => {
            const key = field.toLowerCase();

            listing[0] = {
              ...listing[0],
              [key]: text
            }

            return this.axios.put(`${api}/listing/update`, {
              ...listing[0]
            });
          }).then(() => {
            const { _id: accountId } = this.getAccount;

            return this.axios.get(`${api}/listing/find`, {
              params: {
                accountId
              }
            });
          }).then(({ data: listings }) => {
            this.setListings(listings);
          }).finally(() => {
            this.setIsBusy(false);
          });
        }
      });
    },
    handleRemove() {
      const account = this.getAccount;
      const listingId = this.id;

      this.setIsBusy(true);

      this.axios.post(`${api}/listing/remove`, {
        _id: listingId
      }).then(() => {
        return this.axios.get(`${api}/listing/find`, {
          params:{
            accountId: account._id
          }
        });
      }).then(({ data: listings }) => {
        this.setListings(listings);
      }).finally(() => {
        this.setIsBusy(false);
      });
    }
  }
}
</script>

<style scoped>
.flex-1 {
  flex: 1;
}

.listing-top {
  border-color: black;
  border-width: 1px;
  padding: 20px;
}

.listing-bottom {
  padding: 20px;
  border-color: black;
  border-left-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
}

.listing-heading {
  font-weight: 500;
  font-size: 16px;
}

.listing-value {
  font-size: 14px;
}

.rate-button {
  font-size: 12px;
  padding: 0;
  margin: 0;
  height: 80px;
}

.text-button {
  font-size: 14px;
  font-weight: 500;
}
</style>
