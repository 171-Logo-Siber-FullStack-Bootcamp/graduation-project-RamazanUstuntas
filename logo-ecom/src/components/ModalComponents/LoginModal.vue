<template>
<div>
  <b-modal
      id="login-modal"
      ref="modal"
      title="Sign In"
      content-class="shadow"
      @show="resetModal"
      @hidden="resetModal"
      hide-footer
  >
            <form class="px-3 py-2" ref="form" @submit.prevent="handleLogin">
              <b-form-group
                label="Username"
                label-for="username"
              >
                <b-form-input 
                  id="username-input"
                  v-model="user.username"
                  v-validate="'required'"
                  type="text" 
                  name="username"
                />
                <div
                  v-if="errors.has('username')"
                  class="alert alert-danger"
                  role="alert"
                >Username is required!</div>
              </b-form-group>
              <b-form-group
                label="Password"
                label-for="password"
              >
                <b-form-input
                  id="password-input"
                  v-model="user.password"
                  v-validate="'required'" 
                  type="password" 
                  name="password"
                />
                <div
                  v-if="errors.has('password')"
                  class="alert alert-danger"
                  role="alert"
                >Password is required!</div>
              </b-form-group>
              <b-form-group>
                <button class="btn-xl btn-success mt-3" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  <span>Sign in</span>
                </button>
              </b-form-group>
              <b-form-group>
                <div v-if="message" class="alert alert-danger" role="alert">{{message.message}}</div>
              </b-form-group>
            </form>
            <div class="modal-footer">
              <a class="dropdown-item" href="#">Forgot password?</a>
              <b-button pill variant="outline-secondary" v-on:click="hideModal" v-b-modal.register-modal>Register</b-button>
            </div>
    </b-modal>
  </div>
</template>
<script>
import User from '../../models/user';
export default {
  name: 'LoginC',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      dismiss: '',
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.status.loggedIn;
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.user.username && this.user.password) {
          this.$store.dispatch('login', this.user).then(
            () => {
              this.$router.push('/profile');

              /* allows you to execute code after you have changed some data and 
              Vue.js has updated the virtual DOM based on your data change, 
              but before the browser has rendered that change on the page. */
              this.$nextTick(() => {
                this.$bvModal.hide('login-modal')
                this.resetModal
                this.loading=false
              })
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    },
    resetModal() {
      this.user.username = ''
      this.user.password = ''
      this.message = ''
    },
    hideModal(){
      this.$bvModal.hide('login-modal')
    }
  }
};
</script>
<style>
</style>