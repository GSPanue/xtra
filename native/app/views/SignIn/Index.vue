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
      text="Already haven an account? Click to sign in!"
      @tap="showSignIn"
    />
  </FlexboxLayout>
</template>

<script>
import { isEmail } from 'validator';
import { sendAlert } from '@/helpers';

export default {
  data() {
    return {
      account: {
        emailAddress: '',
        password: '',
        firstName: '',
        lastName: '',
        accountType: 'Standard'
      },
      shouldShowSignInForm: true,
      isBusy: false
    }
  },
  methods: {
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
        accountType: 'Standard'
      }
    },
    handleSubmit() {
      const account = this.account;
      const isSigningIn = this.shouldShowSignInForm;

      if (isSigningIn) {
        const hasEnteredEmailAndPassword = account.emailAddress && account.password;
        const hasEnteredValidEmail = isEmail(account.emailAddress);

        if (hasEnteredEmailAndPassword && hasEnteredValidEmail) {
          this.isBusy = true;

          // Authenticate user...

          return;
        }

        sendAlert('Please provide an email address and password.');
        return;
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
</style>
