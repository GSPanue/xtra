<template>
  <el-row type="flex" align="middle" justify="center">
    <el-card>
        <h2 v-if="!shouldShowRegister">Sign In</h2>
        <h2 v-else-if="shouldShowRegister">Register</h2>

        <!-- Sign In Form -->
        <el-form ref="signInForm" :model="signInForm" v-if="!shouldShowRegister" :rules="signInRules" status-icon>
          <el-form-item label="Email Address" prop="emailAddress">
            <el-input placeholder="Email Address" v-model="signInForm.emailAddress" :disabled="loading"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input placeholder="Password" v-model="signInForm.password" show-password :disabled="loading"></el-input>
          </el-form-item>
          <el-form-item class="submit-button" align="right">
            <el-button type="primary" @click="submitForm('signInForm')" :loading="loading">Sign In</el-button>
          </el-form-item>
        </el-form>

        <!-- Register Form -->
        <el-form ref="registerForm" :model="registerForm" v-else-if="shouldShowRegister" :rules="registerRules" status-icon>
          <el-row type="flex">
            <el-col>
              <el-form-item label="First Name" prop="firstName">
                <el-input placeholder="First Name" v-model="registerForm.firstName" :disabled="loading"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset=2>
              <el-form-item label="Last Name" prop="lastName">
                <el-input placeholder="Last Name" v-model="registerForm.lastName" :disabled="loading"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col>
              <el-form-item label="Email Address" prop="emailAddress">
                <el-input placeholder="Email Address" v-model="registerForm.emailAddress" :disabled="loading"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset=2>
              <el-form-item label="Password" prop="password">
                <el-input placeholder="Password" v-model="registerForm.password" show-password :disabled="loading"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <h4>Account Type</h4>

          <el-row type="flex" justify="start">
            <el-radio v-model="registerForm.accountType" label="Standard" border :disabled="loading">Standard</el-radio>
            <el-radio v-model="registerForm.accountType" label="Service Provider" border :disabled="loading">Service Provider</el-radio>
          </el-row>

          <el-form-item class="submit-button" align="right">
            <el-button type="primary" @click="submitForm('registerForm')" :loading="loading">Register</el-button>
          </el-form-item>
        </el-form>

        <a @click="showRegister" v-if="!shouldShowRegister && !loading">Don't have an account? Click here to register!</a>
        <a @click="showSignIn" v-if="shouldShowRegister && !loading">Already have an account? Sign in!</a>
    </el-card>

    <!-- Error Message Dialog -->
    <el-dialog title="Error" :visible.sync="dialogVisible" top="0" width="32.5%">
      <span>You have entered an invalid email address or password.</span>
    </el-dialog>
  </el-row>
</template>

<script>
import store from 'store';
import { mapMutations } from 'vuex';
import { isEmail, isLength } from 'validator';
import { getAPIURL } from '@/helpers';

const api = getAPIURL();

export default {
  data() {
    const checkEmailAddress = (rule, value, callback) => {
      const isRegisterForm = this.shouldShowRegister;

      if (!isEmail(value)) {
        callback(new Error('Please enter your email address.'));
      }
      else if (isRegisterForm && isEmail(value)) {
        const accounts = (store.get('accounts') === undefined) ? [] : store.get('accounts');
        const emailExists = accounts.filter(({ emailAddress }) => (
          emailAddress.toLowerCase() === value.toLowerCase()
        )).length > 0;

        if (emailExists) {
          callback(new Error('This email address is already in use.'));
        }
        else {
          callback();
        }
      }
      else {
        callback();
      }
    };
    const checkPassword = (rule, value, callback) => {
      const isRegisterForm = this.shouldShowRegister;

      if (value === '') {
        callback(new Error('Please enter your password.'));
      }
      else if (isRegisterForm && value.length < 6) {
        callback(new Error('Your password must be at least 6 characters long.'));
      }
      else {
        callback();
      }
    };

    const checkFirstName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your first name.'));
      }
      else {
        callback();
      }
    };

    const checkLastName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your last name.'));
      }
      else {
        callback();
      }
    };

    return {
      signInForm: {
        emailAddress: '',
        password: ''
      },
      registerForm: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        accountType: 'Standard'
      },
      dialogVisible: false,
      shouldShowRegister: false,
      loading: false,
      signInRules: {
        emailAddress: [
          { validator: checkEmailAddress, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      },
      registerRules: {
        firstName: [
          { validator: checkFirstName, trigger: 'blur' }
        ],
        lastName: [
          { validator: checkLastName, trigger: 'blur' }
        ],
        emailAddress: [
          { validator: checkEmailAddress, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapMutations([
      'setAccount'
    ]),
    showRegister() {
      this.shouldShowRegister = true;

      this.$refs['signInForm'].resetFields();
    },
    showSignIn() {
      this.shouldShowRegister = false;

      this.$refs['registerForm'].resetFields();
      this.registerForm.accountType = 'Standard';
    },
    submitForm(formName) {
      this.loading = true;
      const form = this.$refs[formName];

      form.validate((valid) => {
        const isRegisterForm = this.shouldShowRegister;

        if (valid) {
          if (isRegisterForm) {
            const account = this.registerForm;
            const accounts = (store.get('accounts') === undefined) ? [] : store.get('accounts');

            accounts.push(account);

            store.set('accounts', accounts);

            this.loading = false;
            this.showSignIn();
          }
          else {
            const account = this.signInForm;
            const accounts = (store.get('accounts') === undefined) ? [] : store.get('accounts');

            const accountExists = accounts.filter(({ emailAddress }) => (
              account.emailAddress === emailAddress
            )).length > 0;

            let isValid = false;

            if (accountExists) {
              const passwordMatches = accounts.filter(({ emailAddress }) => (
                account.emailAddress === emailAddress
              ))[0].password === account.password;

              if (passwordMatches) {
                isValid = true;
              }
            }

            if (isValid) {
              const accountInformation = accounts.filter(({ emailAddress }) => (
                account.emailAddress === emailAddress
              ))[0];

              delete accountInformation['password'];

              this.setAccount(accountInformation);
              this.$router.push('/');
            }
            else {
              this.loading = false;
              this.dialogVisible = true;
              this.$refs['signInForm'].resetFields();
            }
          }
        }
        else {
          this.loading = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-row {
  height: 100%;
}

.el-card {
  max-width: 520px;
  width: 100%;
}

.submit-button {
  padding-top: 22px;
}

.el-dialog__wrapper {
  display: flex;
  align-items: center;
}
</style>
