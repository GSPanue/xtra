<template>
  <FlexboxLayout v-if="isBusy" flexDirection="column" justifyContent="center">
    <ActivityIndicator :busy="isBusy" />
  </FlexboxLayout>
  <FlexboxLayout
    v-else
    class="container"
    flexDirection="column"
    justifyContent="center"
  >
    <Label v-if="shouldShowSignInForm" class="heading" text="Sign In" />
    <Label v-else class="heading" text="Register" />

    <!-- Sign In Form -->
    <FlexboxLayout v-if="shouldShowSignInForm" flexDirection="column">
      <input
        label="Email Address"
        keyboardType="email"
        v-model="account.emailAddress"
      />
      <input
        label="Password"
        :secure="true"
        v-model="account.password"
      />
    </FlexboxLayout>

    <!-- Register Form -->
    <FlexboxLayout v-else flexDirection="column">
      <FlexboxLayout flexDirection="row" justifyContent="space-between">
        <input
          class="form-left"
          label="First Name"
          v-model="account.firstName"
        />
        <input
          class="form-right"
          label="Last Name"
          v-model="account.lastName"
        />
      </FlexboxLayout>
      <FlexboxLayout flexDirection="row" justifyContent="space-between">
        <input
          class="form-left"
          label="Email Address"
          keyboardType="email"
          v-model="account.emailAddress"
        />
        <input
          class="form-right"
          label="Password"
          :secure="true"
          v-model="account.password"
        />
      </FlexboxLayout>
      <SegmentedBar class="segmented-bar" v-model="account.accountType">
        <SegmentedBarItem title="Standard" />
        <SegmentedBarItem title="Service Provider" />
      </SegmentedBar>
    </FlexboxLayout>

    <Button class="submit" text="Submit" @tap="handleSubmit" />

    <Label
      v-if="shouldShowSignInForm"
      class="text-button"
      text="Don't have an account? Click to register!"
      @tap="showRegister"
    />
    <Label
      v-else
      class="text-button"
      text="Already have an account? Click to sign in!"
      @tap="showSignIn"
    />
  </FlexboxLayout>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { isEmail } from 'validator';
import { sendAlert, getAPIURL } from '@/helpers';

const api = getAPIURL();

export default {
  data() {
    return {
      account: {
        emailAddress: '',
        password: '',
        firstName: '',
        lastName: '',
        accountType: 0
      },
      shouldShowSignInForm: true
    }
  },
  computed: {
    ...mapGetters([
      'getIsBusy'
    ]),
    isBusy() {
      return this.getIsBusy;
    }
  },
  methods: {
    ...mapMutations([
      'setIsBusy',
      'setAccount',
      'setListings'
    ]),
    showRegister() {
      this.resetForm();
      this.shouldShowSignInForm = false;
    },
    showSignIn() {
      this.resetForm();
      this.shouldShowSignInForm = true;
    },
    resetForm() {
      this.account = {
        emailAddress: '',
        password: '',
        firstName: '',
        lastName: '',
        accountType: 0
      }
    },
    handleSubmit() {
      const account = this.account;
      const isSigningIn = this.shouldShowSignInForm;

      if (isSigningIn) {
        const hasEnteredEmailAndPassword = account.emailAddress && account.password;
        const hasEnteredValidEmail = isEmail(account.emailAddress);

        if (hasEnteredEmailAndPassword && hasEnteredValidEmail) {
          this.setIsBusy(true);

          this.axios.post(`${api}/account/auth`, {
            emailAddress: account.emailAddress,
            password: account.password
          }).then(() => {
            return this.axios.get(`${api}/account/find`);
          }).then(({ data: account }) => {
            const isServiceProvider = account.accountType === 'Service Provider';

            if (isServiceProvider) {
              this.axios.get(`${api}/listing/find`, {
                params: {
                  accountId: account._id
                }
              }).then(({ data: listings }) => {
                this.setIsBusy(false);
                this.setAccount(account);
                this.setListings(listings);

                return;
              });
            }

            this.setIsBusy(false);
            this.setAccount(account);
          }).catch(() => {
            this.setIsBusy(false);

            sendAlert('You have entered an invalid email address or password.');
          });

          return;
        }

        sendAlert('Please provide an email address and password.');
      }
      else {
        const hasEnteredName = account.firstName && account.lastName;
        const hasEnteredEmailAndPassword = account.emailAddress && account.password;
        const hasEnteredValidEmail = isEmail(account.emailAddress);

        if (!hasEnteredName && !hasEnteredEmailAndPassword) {
          sendAlert('Please complete all of the form fields.');
          return;
        }
        else if (!hasEnteredValidEmail) {
          sendAlert('Please provide an email address.');
          return;
        }

        this.setIsBusy(true);

        this.axios.get(`${api}/account/exists`, {
          params: {
            emailAddress: account.emailAddress
          }
        }).then(() => {
          this.axios.post(`${api}/account/create`, {
            ...account,
            accountType: (account.accountType === 0) ? 'Standard' : 'Service Provider'
          }).then(() => {
            this.showSignIn();
            this.setIsBusy(false);
          });
        }).catch(() => {
          this.setIsBusy(false);

          sendAlert('This email address is already in use.');
        });
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 0px 80px;
}

.heading {
  font-size: 34px;
  padding-bottom: 60px;
}

.submit {
  margin: 0;
  margin-top: 100px;
  font-size: 22px;
}

.text-button {
  margin-top: 40px;
  font-size: 16px;
  align-self: center;
}

.form-left {
  width: 100%;
  margin-right: 2.5%;
}

.form-right {
  width: 100%;
  margin-left: 2.5%;
}

.segmented-bar {
  margin-top: 40px;
  font-size: 16px;
}
</style>
