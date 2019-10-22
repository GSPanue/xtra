<template>
  <el-row type="flex" align="middle" justify="center">
    <el-card>
        <h2 v-if="!shouldShowRegister">Sign In</h2>
        <h2 v-else-if="shouldShowRegister">Register</h2>

        <el-form :model="signInForm" v-if="!shouldShowRegister" :rules="signInRules" status-icon>
          <el-form-item label="Email Address" prop="emailAddress">
            <el-input placeholder="Email Address" v-model="signInForm.emailAddress"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input placeholder="Password" v-model="signInForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item align="right">
            <el-button type="primary">Sign In</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="registerForm" v-else-if="shouldShowRegister" :rules="registerRules" status-icon>
          <el-row type="flex">
            <el-col>
              <el-form-item label="First Name">
                <el-input placeholder="First Name" v-model="registerForm.firstName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset=2>
              <el-form-item label="Last Name">
                <el-input placeholder="Last Name" v-model="registerForm.lastName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col>
              <el-form-item label="Email Address">
                <el-input placeholder="Email Address" v-model="registerForm.emailAddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset=2>
              <el-form-item label="Password">
                <el-input placeholder="Password" v-model="registerForm.password" show-password></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <h4>Account Type</h4>

          <el-row type="flex" justify="space-between">
            <el-radio v-model="registerForm.accountType" label="1" border>Student</el-radio>
            <el-radio v-model="registerForm.accountType" label="2" border>Parent</el-radio>
            <el-radio v-model="registerForm.accountType" label="3" border>Service Provider</el-radio>
          </el-row>

          <el-form-item class="register-button" align="right">
            <el-button type="primary">Register</el-button>
          </el-form-item>
        </el-form>

        <a @click="showRegister" v-if="!shouldShowRegister">Don't have an account? Click here to register!</a>
        <a @click="showSignIn" v-if="shouldShowRegister">Already have an account? Sign In!</a>
    </el-card>
  </el-row>
</template>

<script>
import { isEmail, isLength } from 'validator';

export default {
  data() {
    const checkEmailAddress = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error('Please enter your email address.'));
      }
      else {
        callback();
      }
    };
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password.'));
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
        accountType: '0'
      },
      shouldShowRegister: false,
      signInRules: {
        emailAddress: [
          { validator: checkEmailAddress, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      },
      registerRules: {
        // Implement rules for register form
      }
    };
  },
  methods: {
    showRegister() {
      this.shouldShowRegister = true;

      this.signInForm = {
        emailAddress: '',
        password: ''
      };
    },
    showSignIn() {
      this.shouldShowRegister = false;

      this.registerForm = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        accountType: '0'
      };
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

.register-button {
  padding-top: 22px;
}
</style>
