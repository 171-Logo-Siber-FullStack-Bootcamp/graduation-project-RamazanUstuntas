import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import VueAxios from 'vue-axios';
import AuthService from './services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { loggedIn: true , user }
  : { loggedIn: false , user: null };

let cartItems = window.localStorage.getItem('cart');
const API_URL = "http://localhost:5000";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({

  state: {
    infoPage:[],
    cartItems: cartItems ? JSON.parse(cartItems) : [],
    categories:[],
    items: [],
    status: initialState
  },
  getters: {
    itemsNumber(state){  // Cart Component
      return state.cartItems.length
    },
    totalPrice(state) { // Cart Component
      if (state.cartItems.length != 0){
       return state.cartItems.reduce((a, b) => {
         return (b.price == null ) ? parseInt(a) : parseInt(a) + parseInt(b.price)
       }, 0)
      }
    },
    infoLength(state) { // Info Component
      if(state.infoPage.length > 0) {
        return state.infoPage.splice(0, 1)
      }
    }
  },
  mutations: {
    inCart(state, n) { // Cart Component
      state.cartItems.push(n)
      this.commit('saveCart');
    },
    outCart(state, n) { // Cart Component
      let index = state.cartItems.findIndex(x => x.product_id === n)
      state.cartItems.splice(index, 1)
      this.commit('saveCart');
    },
    outAllCart(state){
      state.cartItems = []
      this.commit('saveCart')
    },
    addtoInfo(state, n) { // Info Component
      return state.infoPage.push(n)
    },
    saveCart(state) {
      window.localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    SET_ITEMS(state, data) {
      state.items = data;
    },
    SET_CATEGORIES(state, data){
      state.categories = data;
    },
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.status.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.status.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.status.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  },
  actions: {
   getProducts({commit}) {
     axios
      .get(API_URL+'/getAllProduct')
      .then(response => {
        commit('SET_ITEMS',response.data)
      })
   },
   getCategories({commit}) {
    axios
     .get(API_URL+'/getCategories')
     .then(response => {
       commit('SET_CATEGORIES',response.data)
     })
   },
   createProduct(product){
     axios
      .post(API_URL+'/createProduct', product)
   },
   login({ commit }, user) {
    return AuthService.login(user).then(
      user => {
        commit('loginSuccess', user);
        return Promise.resolve(user);
      },
      error => {
        commit('loginFailure');
        return Promise.reject(error);
      }
    );
  },
  logout({ commit }) {
    AuthService.logout();
    commit('logout');
  },
  register({ commit }, user) {
    return AuthService.register(user).then(
      response => {
        commit('registerSuccess');
        return Promise.resolve(response.data);
      },
      error => {
        commit('registerFailure');
        return Promise.reject(error);
      }
    );
  }
  }
})
