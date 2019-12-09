<template>
  <el-card shadow="never">
    <el-row type="flex" slot="header" align="middle">
      <el-col>
        <!-- Topic -->
        <el-row type="flex" align="middle" justify="start">
          <h6 class="h6">Topic</h6>
        </el-row>
        <el-row class="spacing" type="flex" align="middle" justify="start">
          <h5 class="h5">{{topic}}</h5>
        </el-row>

        <!-- Tutor -->
        <el-row type="flex" align="middle" justify="start">
          <h6 class="h6">Tutor</h6>
        </el-row>
        <el-row class="spacing" type="flex" align="middle" justify="start">
          <h5 class="h5">{{tutor}}</h5>
        </el-row>

        <!-- Location -->
        <el-row type="flex" align="middle" justify="start">
          <h6 class="h6">Location</h6>
        </el-row>
        <el-row type="flex" align="middle" justify="start">
          <h5 class="h5">{{location}}</h5>
        </el-row>
      </el-col>

      <el-col>
        <!-- Price -->
        <el-row type="flex" align="middle" justify="end">
          <h6 class="h6">Price</h6>
        </el-row>
        <el-row class="spacing" type="flex" align="middle" justify="end">
          <h5 class="h5">£{{price}}</h5>
        </el-row>

        <!-- Duration -->
        <el-row type="flex" align="middle" justify="end">
          <h6 class="h6">Duration</h6>
        </el-row>
        <el-row class="spacing" type="flex" align="middle" justify="end">
          <h5 class="h5">{{duration}}</h5>
        </el-row>

        <!-- Time -->
        <el-row type="flex" align="middle" justify="end">
          <h6 class="h6">Time</h6>
        </el-row>
        <el-row type="flex" align="middle" justify="end">
          <h5 class="h5 text">{{time}}</h5>
        </el-row>
      </el-col>
    </el-row>

    <!-- Rating -->
    <el-row type="flex" align="middle" justify="space-between">
      <h6 class="h6">
        Rating (Avg. {{averageRating}}/5, {{totalRatings}} Rating{{`${(totalRatings !== 1) ? 's' : ''}`}})
      </h6>
      <el-rate v-model="rating" @change="handleChange" :disabled="shouldDisableRating" />
    </el-row>
  </el-card>
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
    'tutor',
    'location',
    'price',
    'duration',
    'time',
    'ratings'
  ],
  computed: {
    totalRatings() {
      return this.ratings.length;
    },
    averageRating() {
      const totalRatings = this.totalRatings;

      if (totalRatings > 0) {
        const ratings = this.ratings;
        let sum = 0;

        ratings.map(({ rating }) => {
          sum += rating;
        });

        return parseFloat((sum / totalRatings).toFixed(1));
      }

      return 0;
    },
    shouldDisableRating() {
      let shouldDisable = false;
      const account = this.getAccount();
      const ratings = this.ratings;

      const hasVoted = ratings.filter(({ accountId }) => (
        accountId === account._id
      )).length > 0;

      const hasSameAccountId = account._id === this.accountId;

      return (hasSameAccountId || hasVoted);
    }
  },
  data() {
    return {
      rating: 0
    };
  },
  methods: {
    ...mapGetters([
      'getAccount',
      'getSearchResults'
    ]),
    ...mapMutations([
      'setSearchResults'
    ]),
    handleChange(rating) {
      const listingId = this.id;

      const newRating = {
        _id: listingId,
        rating
      };

      this.axios.put(`${api}/listing/update`, {
        ...newRating
      }).then(() => {
        const listings = this.getSearchResults();

        const listingIndex = listings.findIndex(({ _id }) => (
          _id === listingId
        ));

        listings[listingIndex].ratings.push({
          ...newRating
        });

        this.setSearchResults(listings);
        this.rating = this.averageRating;
      });
    }
  },
  mounted() {
    this.rating = this.averageRating;
  }
};
</script>

<style scoped>
.el-card {
  width: 100%;
}

.el-rate >>> span:last-of-type > i {
  margin: 0;
}

.h5, .h6 {
  margin: 0;
}

.text {
  text-align: end;
}

.spacing {
  margin-bottom: 10px;
}
</style>
