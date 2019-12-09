<template>
  <el-row class="container" type="flex">
    <el-col>
      <home-header :shouldShowSearchBar="false" />
      <el-row type="flex" align="middle">
        <h3>Your Listings</h3>
        <el-badge :value="`${getListings.length}`" class="mark badge" type="primary" />
        <el-row class="options" type="flex" justify="end">
          <el-tooltip content="Create Listing" placement="bottom">
            <el-button
              class="options-button"
              icon="el-icon-document-add"
              size="mini"
              @click="showDialog"
            />
          </el-tooltip>
        </el-row>
      </el-row>
      <!-- Listings -->
      <el-row
        type="flex"
        justify="space-between"
        v-bind:key="index"
        v-bind:class="{ spacing: index !== (listings.length - 1) }"
        v-for="(pair, index) in listings"
      >
        <el-row
          class="listing-pair"
          v-bind:key="listing._id"
          v-for="(listing) in pair"
        >
          <el-row type="flex" justify="end" class="options-spacing">
            <el-tooltip content="Edit Listing" placement="top">
              <el-button
                class="options-button"
                icon="el-icon-edit"
                size="mini"
                @click="editListing(listing)"
              />
            </el-tooltip>
            <el-tooltip content="Remove Listing" placement="top">
              <el-button
                class="options-button"
                icon="el-icon-delete"
                size="mini"
                @click="removeListing(listing._id)"
              />
            </el-tooltip>
          </el-row>
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
          >
          </listing>
        </el-row>
      </el-row>
    </el-col>

    <el-dialog
      class="dialog-container"
      :title="`${(isEditingListing) ? 'Edit' : 'Create'} Listing`"
      :visible.sync="dialogVisible"
      top="0"
      width="50%"
      @closed="handleClosed"
    >
      <el-form ref="listingForm" :model="listingForm" status-icon>
        <el-row type="flex">
          <el-col>
            <el-form-item label="Topic" prop="topic">
              <el-input placeholder="Topic" v-model="listingForm.topic" :disabled="loading" />
            </el-form-item>
          </el-col>
          <el-col :offset="2">
            <el-form-item label="Price (£)" prop="price">
              <el-input placeholder="Price" v-model="listingForm.price" :disabled="loading" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col>
            <el-form-item label="Tutor" prop="tutor">
              <el-input placeholder="Tutor" v-model="listingForm.tutor" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :offset="2">
            <el-form-item label="Duration" prop="duration">
              <el-input placeholder="Duration" v-model="listingForm.duration" :disabled="loading" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col>
            <el-form-item label="Location" prop="location">
              <el-input placeholder="Location" v-model="listingForm.location" :disabled="loading" />
            </el-form-item>
          </el-col>
          <el-col :offset="2">
            <el-form-item label="Time" prop="time">
              <el-input placeholder="Time" v-model="listingForm.time" :disabled="loading" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item class="submit-button" align="right">
          <el-button type="primary" @click="submitForm" :loading="loading">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import orderBy from 'lodash.orderby';
import { mapGetters, mapMutations } from 'vuex';
import { getAPIURL } from '@/helpers';

const api = getAPIURL();

export default {
  computed: {
    ...mapGetters([
      'getListings',
      'getAccount'
    ]),
    listings() {
      const listings = this.getListings;

      return listings.reduce((result, value, index, array) => {
        if (index % 2 === 0) {
          result.push(array.slice(index, index + 2));
        }

        return result;
      }, []);
    },
    getName() {
      const { firstName, lastName } = this.getAccount;

      return `${firstName} ${lastName}`;
    },
    isEditingListing() {
      return this.editId !== null;
    }
  },
  data() {
    return {
      dialogVisible: false,
      listingForm: {
        topic: '',
        price: '',
        tutor: '',
        duration: '',
        location: '',
        time: ''
      },
      editId: null,
      loading: false
    };
  },
  methods: {
    ...mapMutations([
      'setListings'
    ]),
    showDialog() {
      this.dialogVisible = true;
    },
    hideDialog() {
      this.dialogVisible = false;
    },
    submitForm() {
      this.loading = true;

      const account = this.getAccount;
      const formValues = this.listingForm;

      const hasEditedListing = this.isEditingListing;

      if (hasEditedListing) {
        const listingId = this.editId;

        this.axios.get(`${api}/listing/find`, {
          params: {
            _id: listingId
          }
        }).then(({ data: listing }) => {
          const editedListing = {
            ...listing[0],
            ...formValues,
            price: Number(formValues.price)
          };

          this.axios.put(`${api}/listing/update`, {
            ...editedListing
          }).then(() => {
            this.axios.get(`${api}/listing/find`, {
              params: {
                accountId: account._id
              }
            }).then(({ data: listings }) => {
              this.$refs['listingForm'].resetFields();
              this.editId = null;

              this.hideDialog();
              this.loading = false;

              this.setListings(listings);
            });
          });
        });
      }
      else {
        this.axios.post(`${api}/listing/create`, {
          accountId: account._id,
          ...formValues
        }).then(() => {
          this.axios.get(`${api}/listing/find`, {
            params: {
              accountId: account._id
            }
          }).then(({ data: listings }) => {
            this.setListings(listings);
          }).finally(() => {
            this.$refs['listingForm'].resetFields();
            this.editId = null;

            this.hideDialog();
            this.loading = false;
          });
        }).catch(() => {
          this.$refs['listingForm'].resetFields();
          this.editId = null;

          this.hideDialog();
          this.loading = false;
        });
      }
    },
    removeListing(id) {
      const account = this.getAccount;
      const listingId = id;

      this.axios.post(`${api}/listing/remove`, {
        _id: listingId
      }).then(() => {
        this.axios.get(`${api}/listing/find`, {
          params: {
            accountId: account._id
          }
        }).then(({ data: listings }) => {
          this.setListings(listings);
        });
      });
    },
    handleClosed() {
      if (!this.loading) {
        this.listingForm = {
          topic: '',
          price: '',
          tutor: '',
          duration: '',
          location: '',
          time: ''
        };

        this.editId = null;
      }
    },
    editListing(listing) {
      const tempListing = {
        ...listing
      };

      const id = listing._id;

      delete tempListing._id;
      delete tempListing.ratings;

      this.editId = id;
      this.listingForm = tempListing;
      this.showDialog();
    }
  },
  mounted() {
    this.listingForm.tutor = this.getName;
  }
};
</script>

<style scoped>
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

.options {
  flex: 1;
}

.options-button {
  border-radius: 4px;
}

.options-spacing {
  margin-bottom: 5px;
}

.spacing {
  margin-bottom: 20px;
}

.dialog-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-container >>> div {
  color: #303133;
}

.listing-pair {
  max-width: 500px;
  width: 100%;
}

.space-left {
  margin-left: 2.5px;
}

.space-right {
  margin-right: 2.5px;
}
</style>
