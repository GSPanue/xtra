<template>
  <el-col class="col container" v-if="getHomeShowInitialView">
    <home-header :shouldShowSearchBar="false" />
    <el-col class="search-bar-container">
      <h1 class="heading">Xtra</h1>
      <h4 class="subheading">Find After School Classes & Activites</h4>
      <search-bar class="search-bar" />
    </el-col>
  </el-col>
  <el-row class="container" type="flex" v-else>
    <el-col>
      <home-header :shouldShowSearchBar="true" />
      <el-row type="flex" align="middle">
        <h3>Search Results for "{{getSearchQuery}}"</h3>
        <el-badge :value="`${getSearchResults.length}`" class="mark badge" type="primary" />
        <el-row class="options" type="flex" justify="end">
          <el-tooltip content="Search Options" placement="bottom">
            <el-button
              class="options-button"
              icon="el-icon-setting"
              size="mini"
              @click="showDialog"
              v-if="shouldShowSearchOptions"
            />
          </el-tooltip>
        </el-row>
      </el-row>

      <!-- Results -->
      <el-row
        type="flex"
        justify="space-between"
        v-bind:key="index"
        v-bind:class="{ spacing: index !== (listings.length - 1) }"
        v-for="(pair, index) in listings"
      >
        <el-row
          class="listing-pair"
          v-bind:key="listing.id"
          v-for="(listing) in pair"
        >
          <listing
            :aid="listing.aid"
            :id="listing.id"
            :topic="listing.topic"
            :tutor="listing.tutor"
            :location="listing.location"
            :price="listing.price"
            :duration="listing.duration"
            :time="listing.time"
            :ratings="listing.ratings"
          />
        </el-row>
      </el-row>
    </el-col>

    <!-- Sort & Filter Dialog -->
    <el-dialog
      class="dialog-container"
      title="Search Options"
      :visible.sync="dialogVisible"
      top="0"
      width="32.5%"
      v-if="shouldShowSearchOptionsDialog"
    >
      <!-- Sort Options -->
      <h5 class="h5">Sort</h5>
      <el-row type="flex" justify="space-between">
        <h4 class="h4">Sort By</h4>
        <el-dropdown @command="handleSortByCommand" trigger="click">
          <span class="el-dropdown-link">
            {{getSortBy}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-if="getSortBy !== 'Default'"
              command="Default"
              icon="el-icon-refresh-left"
            >
              Default
            </el-dropdown-item>
            <el-dropdown-item
              v-if="getSortBy !== 'Price'"
              command="Price"
              icon="el-icon-money"
            >
              Price
            </el-dropdown-item>
            <el-dropdown-item
              v-if="getSortBy !== 'Topic'"
              command="Topic"
              icon="el-icon-chat-round"
            >
              Topic
            </el-dropdown-item>
            <el-dropdown-item
              v-if="getSortBy !== 'Rating'"
              command="Rating"
              icon="el-icon-star-off"
            >
              Rating
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-row type="flex" justify="space-between" v-if="getSortBy !== 'Default'">
        <h4 class="h4">Order</h4>
        <el-dropdown @command="handleOrderCommand" trigger="click">
          <span class="el-dropdown-link">
            {{getOrder}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-if="getOrder !== 'Ascending'"
              command="Ascending"
              icon="el-icon-sort-up"
            >
              {{getOrderAscendingText}}
            </el-dropdown-item>
            <el-dropdown-item
              v-if="getOrder !== 'Descending'"
              command="Descending"
              icon="el-icon-sort-down"
            >
              {{getOrderDescendingText}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>

      <!-- Filter Options -->
      <h5 class="h5 spacing-top">Filter</h5>
      <el-row type="flex" justify="space-between">
        <h4 class="h4">Rating</h4>
        <el-dropdown @command="handleRatingFilterCommand" trigger="click">
          <span class="el-dropdown-link">
            {{getRatingFilterText}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              command="Default"
              icon="el-icon-refresh-left"
              v-if="hasFilteredRating"
            >
              Default
            </el-dropdown-item>
            <el-dropdown-item
              command="4 Stars & Above"
              v-if="getRatingFilterText !== '4 Stars & Above'"
            >
              4 Stars & Above
            </el-dropdown-item>
            <el-dropdown-item
              command="3 Stars & Above"
              v-if="getRatingFilterText !== '3 Stars & Above'"
            >
              3 Stars & Above
            </el-dropdown-item>
            <el-dropdown-item
              command="2 Stars & Above"
              v-if="getRatingFilterText !== '2 Stars & Above'"
            >
              2 Stars & Above
            </el-dropdown-item>
            <el-dropdown-item
              command="1 Star & Above"
              v-if="getRatingFilterText !== '1 Star & Above'"
            >
              1 Star & Above
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-row type="flex" justify="space-between" v-if="minPrice && maxPrice">
        <h4 class="h4">Price Range</h4>
        <div class="slider-container">
          <el-slider
            range
            :format-tooltip="this.handleSliderFormat"
            v-bind:min="minPrice"
            v-bind:max="maxPrice"
            :value="getPriceRangeFilter"
            @input="handlePriceRangeChange"
          />
        </div>
      </el-row>
      <el-row type="flex" justify="space-between">
        <h4 class="h4">Topic</h4>
        <el-dropdown :hide-on-click="false" trigger="click">
          <span class="el-dropdown-link">
            Select Topics<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="topic-menu">
            <el-dropdown-item v-bind:key="topic" v-for="(topic) in topics">
              <el-checkbox v-bind:checked="getTopicsFilter.includes(topic)" @change="handleTopicChange($event, topic)">{{topic}}</el-checkbox>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
import orderBy from 'lodash.orderby';
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getHomeShowInitialView',
      'getSearchQuery',
      'getSearchResults',
      'getSortBy',
      'getOrder',
      'getRatingFilter',
      'getPriceRangeFilter',
      'getTopicsFilter'
    ]),
    listings() {
      let searchResults = this.getSearchResults;
      const hasSetSort = this.getSortBy !== 'Default';
      const hasFilteredRating = this.hasFilteredRating;
      const hasFilteredPriceRange = this.hasFilteredPriceRange;
      const hasFilteredTopics = this.hasFilteredTopics;

      this.handleMinPriceRange(searchResults);
      this.handleMaxPriceRange(searchResults);
      this.setPriceRangeValue();

      if (hasFilteredRating) {
        const option = this.getRatingFilter;

        searchResults = searchResults.filter(({ ratings }) => {
          const averageRating = this.calculateAverageRating(ratings);

          return averageRating >= option;
        });
      }

      if (hasFilteredPriceRange) {
        const priceRange = this.getPriceRangeFilter;
        const min = priceRange[0];
        const max = priceRange[1];

        searchResults = searchResults.filter(({ price }) => (
          price >= min && price <= max
        ));
      }

      if (hasFilteredTopics) {
        const topics = this.getTopicsFilter;

        searchResults = searchResults.filter(({ topic }) => (
          topics.includes(topic)
        ));
      }

      if (hasSetSort) {
        const sort = this.getSortBy.toLowerCase();
        const order = (this.getOrder === 'Ascending') ? 'asc' : 'desc';

        if (sort !== 'rating') {
          searchResults = orderBy(searchResults, [sort], [order]);
        }
        else {
          searchResults = orderBy(searchResults, (listing) => {
            const ratings = listing.ratings;
            const totalRatings = ratings.length;

            let sum = 0;

            if (totalRatings > 0) {
              ratings.map(({ rating }) => {
                sum += rating;
              });

              return parseFloat((sum / totalRatings).toFixed(1));
            }

            return 0;
          }, [order]);
        }
      }

      this.setTopics(searchResults);

      return this.listingsInPairs(searchResults);
    },
    getOrderAscendingText() {
      let order = 'Ascending';
      const sortBy = this.getSortBy;

      if (sortBy === 'Topic') {
        order += ' (A–Z)';
      }

      return order;
    },
    getOrderDescendingText() {
      let order = 'Descending';
      const sortBy = this.getSortBy;

      if (sortBy === 'Topic') {
        order += ' (Z–A)';
      }

      return order;
    },
    getRatingFilterText() {
      const ratingFilter = this.getRatingFilter;
      const hasFilteredRating = this.hasFilteredRating;

      if (hasFilteredRating) {
        const option = ratingFilter;

        return `${option} Star${(option > 1) ? 's' : ''} & Above`;
      }

      return 'Default';
    },
    hasFilteredRating() {
      const ratingFilter = this.getRatingFilter;

      return ratingFilter !== null;
    },
    shouldShowSearchOptions() {
      return this.getSearchResults.length > 1;
    },
    shouldShowSearchOptionsDialog() {
      return this.getSearchResults.length > 1;
    },
    hasFilteredPriceRange() {
      const priceRangeFilter = this.getPriceRangeFilter;

      return priceRangeFilter[0] && priceRangeFilter[1];
    },
    hasFilteredTopics() {
      const topicsFilter = this.getTopicsFilter;

      return topicsFilter.length > 0;
    }
  },
  data() {
    return {
      dialogVisible: false,
      minPrice: null,
      maxPrice: null,
      topics: []
    };
  },
  methods: {
    ...mapMutations([
      'setSortBy',
      'setOrder',
      'setRatingFilter',
      'setPriceRangeFilter',
      'setTopicsFilter'
    ]),
    showDialog() {
      this.dialogVisible = true;
    },
    handleSortByCommand(option) {
      this.setSortBy(option);

      if (option === 'Default') {
        this.setOrder(null);
      }
      else if (option === 'Rating') {
        this.setOrder('Descending');
      }
      else {
        this.setOrder('Ascending');
      }
    },
    handleOrderCommand(option) {
      this.setOrder(option);
    },
    handleRatingFilterCommand(option) {
      let ratingFilter = this.getRatingFilter;

      if (option === 'Default') {
        ratingFilter = null;
      }
      else {
        ratingFilter = parseInt((option).replace(/\D/g, ''));
      }

      this.setRatingFilter(ratingFilter);
    },
    listingsInPairs(searchResults) {
      return searchResults.reduce((result, value, index, array) => {
        if (index % 2 === 0) {
          result.push(array.slice(index, index + 2));
        }

        return result;
      }, []);
    },
    handleSliderFormat(value) {
      return `£${value}`;
    },
    handleMinPriceRange(searchResults) {
      const hasSearchResults = searchResults.length > 1;
      let minPrice = null;

      if (hasSearchResults) {
        minPrice = orderBy(searchResults, ['price'], ['asc'])[0].price;
      }

      this.minPrice = minPrice;
    },
    handleMaxPriceRange(searchResults) {
      const hasSearchResults = searchResults.length > 1;
      let maxPrice = null;

      if (hasSearchResults) {
        maxPrice = orderBy(searchResults, ['price'], ['desc'])[0].price;
      }

      this.maxPrice = maxPrice;
    },
    handlePriceRangeChange(value) {
      this.setPriceRangeFilter(value);
    },
    setPriceRangeValue() {
      const currentPriceRange = this.getPriceRangeFilter;
      const min = this.minPrice;
      const max = this.maxPrice;

      if (currentPriceRange[0] !== min && currentPriceRange[1] !== max) {
        this.setPriceRangeFilter([min, max]);
      }
    },
    setTopics(searchResults) {
      const topics = [...new Set(searchResults.map(({ topic }) => (
        topic
      )))];

      this.topics = topics;
    },
    handleTopicChange(checked, topic) {
      let topicsFilter = this.getTopicsFilter;
      const isFiltered = topicsFilter.includes(topic);


      if (isFiltered && !checked) {
        topicsFilter = topicsFilter.filter((t) => (
          t !== topic
        ));
      }
      else if (!isFiltered && checked) {
        topicsFilter.push(topic);
      }

      this.setTopicsFilter(topicsFilter);
    },
    calculateAverageRating(ratings) {
      const totalRatings = ratings.length;

      if (totalRatings > 0) {
        let sum = 0;

        ratings.map(({ rating }) => {
          sum += rating;
        });

        return parseFloat((sum / totalRatings).toFixed(1));
      }

      return 0;
    }
  }
};
</script>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
}

.search-bar-container {
  margin-top: -60px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.search-bar {
  max-width: 480px;
  width: 100%;
}

.heading {
  margin: 0px 0px 0px 0px;
}

.options {
  flex: 1;
}

.options-button {
  border-radius: 4px;
}

.subheading {
  margin: 0px 0px 35px 0px;
}

.container {
  padding: 0px 40px 0 40px;
}

.badge {
  display: flex;
  margin-left: 5px;
}

.badge >>> sup {
  border-radius: 4px;
}

.spacing {
  margin-bottom: 20px;
}

.listing-pair {
  max-width: 500px;
  width: 100%;
}

.dialog-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-container >>> div {
  margin: 0;
  color: #303133;
}

.el-dropdown-link {
  cursor: pointer;
}

.h4, .h5 {
  margin: 0;
}

.h5 {
  margin-bottom: 5px;
}

.spacing-top {
  margin-top: 20px;
}

.slider-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
}

.topic-menu {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.el-dropdown-menu.topic-menu >>> li {
  padding: 0;
}

.el-checkbox {
  width: 100%;
  padding: 0 20px;
}
</style>
