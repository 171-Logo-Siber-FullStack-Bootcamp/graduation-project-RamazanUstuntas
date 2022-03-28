<template>
  <b-modal
      id="register-modal"
      ref="modal"
      title="Register Now"
      content-class="shadow"
      @show="resetModal"
      @hidden="resetModal"
      hide-footer
    >
             <form class="px-3 py-2" ref="form" @submit.prevent="handleRegister">
                <b-form-group
                  label="Username"
                  label-for="username"
                >
                  <b-form-input 
                    id="username-input"
                    v-model="user.username"
                    v-validate="'required|min:3|max:20'"
                    type="text"
                    name="username"
                  />
                  <div
                    v-if="submitted && errors.has('username')"
                    class="alert-danger"
                  >{{errors.first('username')}}</div>
                </b-form-group>
                <b-form-group
                  label="Email"
                  label-for="email"
                >
                  <b-form-input 
                    id="email-input"
                    v-model="user.email"
                    v-validate="'required|email|max:50'"
                    type="email"
                    name="email"
                  />
                  <div
                    v-if="submitted && errors.has('email')"
                    class="alert-danger"
                  >{{errors.first('email')}}</div>
                </b-form-group>
                <b-form-group
                  label="Password"
                  label-for="password"
                >
                  <b-form-input
                    id="password-input"
                    v-model="user.password"
                    v-validate="'required|min:6|max:40'"
                    type="password"
                    name="password"
                  />
                  <div
                    v-if="submitted && errors.has('password')"
                    class="alert-danger"
                  >{{errors.first('password')}}</div>
                </b-form-group>
                <b-form-group>
                  <button class="btn-xl btn-success mt-3 btn-block">Register</button>
                </b-form-group>
              <div
              v-if="message"
              class="alert"
              :class="successful ? 'alert-success' : 'alert-danger'"
            >{{message}}</div>
            </form>
          <div class="modal-footer">
            <a class="dropdown-item col" href="#">Forgot password?</a>
            <b-button pill variant="outline-secondary mr-4" v-on:click="hideModal" v-b-modal.login-modal>Sign In</b-button>
          </div>
    </b-modal>
</template>

<script>
import User from '../../models/user';
export default {
  name: 'RegisterC',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
    resetModal() {
      this.user.username = ''
      this.user.email= ''
      this.user.password = ''
      this.message= ''
    },
    hideModal(){
      this.$bvModal.hide('register-modal')
    }
  }
};
</script>
<style>
</style>