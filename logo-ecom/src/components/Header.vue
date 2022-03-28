<template>
  <div class="container-flex">
    <nav class="navbar navbar-light">
      <div class="dropdown d-xl-none d-lg-none mr-auto">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAs0lEQVRoge3WwQ3CMBSD4f9VjFF2YAzEINmpk3QMhqBjIMIVlYiWQxQ38neM4kg+xWBmv8T64Hm53nIMU4ZxI7gEOZ3u89w6CzCsL+55DCDD+CImhSyUiux47MNZIQuFIkflImpcRI2LqPkqErD8kX8oZKFYJKfSxdJjESSFrFlFnvGe8RWy0POHeFQuosZF1PRbxDO+YdasIs94z/gKWej5QzwqF1HjImr6LeIZ3zBrZtveJVm9KzLO6BIAAAAASUVORK5CYII=" width="40" height="40" data-toggle="dropdown" data-target="#navd" aria-haspopup="true" aria-expanded="false">
        <div class="dropdown-menu hb" aria-labelledby="navd">
          <router-link class="dropdown-item" to="/">Home</router-link>
          <router-link class="dropdown-item" to="/products">Products</router-link>
          <router-link class="dropdown-item" to="/contact">Contact us</router-link>
        </div>
      </div>
      <!--Logo-->
      <router-link to="/" class="navbar-brand py-0 pl-5">
          <img src="../assets/logo.jpg" width="75" height="75">
      </router-link>
      <!--Header navigation-->
      <span class="navbar-item bc d-none d-xl-block d-lg-block py-0">
        <router-link class="pl-5" to="/">Home</router-link>
        <router-link class="px-5" to="/products">Products</router-link>
        <router-link to="/contact">Contact us</router-link>
      </span>

        <p class="navbar-item ml-auto"/>
          <div class="searc pr-2">
            <input type="search" class="search" @keyup.prevent="search" v-model="query">
          </div>
         <div id="searchList" class="search-content mt-auto">
          <div v-if="searchData.length > 0">
            <div class="d-flex justify-content-center"><b-button class ="close-button" variant="danger" pill size="lg" v-on:click="resetSearch">X</b-button></div>
            <ul class="list-group" v-for="product in searchData" :key="product._source.product_id">
              <router-link class="" to="/info">
                <li @click="sendInfo(product._source)" class="col-md-12 list-group-item product-info">
                  <img class="product-img" :src="product._source.img_url" alt="">
                  <h5 class="product-title">{{ product._source.name.substring(0,15)}}..</h5>
                  <h5 class="product-price d-none d-xl-inline d-lg-inline">₺{{ product._source.price}}</h5>
                </li>
              </router-link>
            </ul>
          </div>
        </div>

        <div class="">
          <div v-if="!currentUser" class="">
            <b-button pill variant="outline-success mr-3" v-b-modal.login-modal>Sign In</b-button>
          </div>
          <div v-if="currentUser" class="navbar-nav ml-auto mr-3">
            <li class="navbar-item">
              <router-link to="/profile" class="nav-link">
                <font-awesome-icon icon="user" />
                <span class="d-none d-xl-inline d-lg-inline pl-2">{{ currentUser.username.substring(0,5)}}...</span>
              </router-link>
            </li>
            <li class="navbar-item ml-auto">
              <a class="nav-link" v-b-modal.logout-modal>
                <font-awesome-icon icon="sign-out-alt" /><span class=" d-none d-xl-inline d-lg-inline pl-2">LogOut</span>
              </a>
            </li>
            <b-modal
                id="logout-modal"
                ref="modal"
                title="Are you sure?"
                hide-backdrop
                @show="resetModal"
                @hidden="resetModal"
                @ok="logOut"
            ><p>Do you want to logging out?</p></b-modal>
          </div>
        </div>
        <div class="bag mr-3" @click="openCart">
            <img class="pb-1" src="@/assets/cart.svg">
            <span class="mb-3 " v-if="this.bagItemscount > 0">{{ bagItemscount }}</span>
        </div>
    </nav>
    <!-- Login Modal -->
    <LoginModal></LoginModal>
    <!-- Register Modal-->
    <RegisterModal></RegisterModal>
    <!-- Product Info Modal-->
    <ProductInfoModal></ProductInfoModal>
    <!--Cart Component-->
    <Cart ref="cartMove" />
    </div>
</template>

<script>
import Cart from '@/components/ModalComponents/Cart.vue'
import LoginModal from '@/components/ModalComponents/LoginModal.vue'
import RegisterModal from '@/components/ModalComponents/RegisterModal.vue'
import ProductInfoModal from '@/components/ModalComponents/ProductInfoModal.vue'
import User from '../models/user';
export default {
  name: 'Header',
  components: {
    Cart, LoginModal, RegisterModal, ProductInfoModal
  },
  data() {
    return {
      query: '',
      searchData: [],
      user: new User('', ''),
      loading: false,
      message: '',
    };
  },
  computed: {
    bagItemscount() {
      return this.$store.getters.itemsNumber
    },
    currentUser() {
      return this.$store.state.status.user
    }
  },
  methods: {
    openCart() {
      this.$refs.cartMove.cartON()
    },
    logOut() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    resetModal() {
      this.user.username = ''
      this.user.password = ''
    },
    search() {
        this.axios.get('http://localhost:5000/search?q='+this.query)
              .then(response => { 
                this.searchData = response.data.slice(0,5);
          })
    },
    sendInfo(it) {
     this.$store.commit('addtoInfo', it);
     this.$router.push('/products');
     this.resetSearch();
    },
    resetSearch() {
      this.query='',
      this.searchData=[];
    }
  }
}
</script>

<style>
nav {
  z-index:100;
}
.navbar {
  border-bottom: 1px solid #DCDCDC;
  background-color: #F8F8F8;
}

.close {
  position:relative;
  bottom:20px;
  left:10px;
  font-size: 31px;
  color: #000;
}
.navbar-item.bc a {
  font-size: 17px;
  text-decoration: none;
  color: black;
}

.navbar-item.bc a:hover, .navbar-item.bc a:active {
  color: #FFD700;
}
.btn-sm{
  border-radius: 0;
}

.search {
  outline: none;
  border: 1px #F8F8F8;
  background: #ededed url('../assets/search.png') no-repeat 5px center;
  padding: 5px 8px 0px 26px;
  width: 10px;
  -webkit-border-radius: 10em;
  -moz-border-radius: 10em;
  border-radius: 10em;
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  transition: all .5s;
  margin-right: 10px;
}

.search:focus {
  width: 160px;
  border: solid 1px #ccc;
  background-color: #fff;
  border-color: #98ccfd;
  -webkit-box-shadow: 0 0 5px rgba(109, 207, 246, .5);
  -moz-box-shadow: 0 0 5px rgba(109, 207, 246, .5);
  box-shadow: 0 0 5px rgba(109, 207, 246, .5);
  backface-visibility: hidden;
  perspective: 1000;
}

form .btn-xl.btn-success.mt-3 {
  position: relative;
  -webkit-transition-duration: 100ms;
  transition-duration: 100ms;
  width: 100%;
  height: 50px;
  font-size: 20px;
  outline:none;
  cursor: pointer;
  box-shadow: 0 26px 38px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.bag span {
    background-color: #FF0000;
    border-radius: 10px;
    color: white;
    position: absolute;
    font-size: 15px;
    line-height: 1;
    padding: 2px 3px 3px 3px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    margin-left: -9px;
    bottom: 1rem;
}

.bag img {
  cursor: pointer;
  width: 30px;
  height: auto;
}
.search-content {
  position: absolute !important;
  min-width: 400px;
  width: 40%;
  top: 100%;
  right: 4%;
  box-shadow: 0px 100px 98px rgba(0, 0, 0, 0.25), 0 200px 600px rgba(0, 0, 0, 0.22);
}
.product-info {
  height: 100px;
  box-shadow: 0 14px 98px rgba(0, 0, 0, 0.25), 0 0px 60px rgba(0, 0, 0, 0.22);
}
.product-img {
  width: 80px;
  height: 80px;  
  float: left;
  box-shadow: 0 14px 98px rgba(0, 0, 0, 0.25), 0 0px 60px rgba(0, 0, 0, 0.22);
}
.product-title {
  margin: 20px 0 0 100px;
  float: left;
}
.product-price {
  margin: 20px 0 0 100px;
  float: right;
}
.close-button {
  background-color: rgb(238, 79, 79)
}
</style>
