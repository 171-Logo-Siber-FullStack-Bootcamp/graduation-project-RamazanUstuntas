<template>
  <div>
    <div :class="cClass">
      <div class="cart-menu">
        <h1 class="text-center">Cart</h1>
        <hr>

        <transition name="fade">
          <div v-if="this.cartContent.length === 0" class="text-center font-italic">
            Your cart is empty, try to Add stuff.
          </div>
        </transition>

        <transition-group name="fade">
          <div class="row" v-for="(thing, i) in cartContent" v-bind:key="'thing.product_id' +i">
            <div class="col4 col-xl-4 col-lg-4 col-md-4 col-sm-4">
              <img :src="thing.img_url" style="width: 70px; box-shadow: 0 14px 98px rgba(0, 0, 0, 0.25), 0 0px 60px rgba(0, 0, 0, 0.22);">
            </div>
            <div class="col6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
              <h4>{{ thing.name }}</h4>
              <h6>₺{{ thing.price }}</h6>
            </div>
            <div class="col2 col-xl-2 col-lg-2 col-md-2 col-sm-2 pt-4">
              <span class="remove-btn" @click="removeThing(thing.product_id)">remove</span>
            </div>
          </div>
        </transition-group >

        <hr v-if="this.cartContent.length !== 0">
        <div class="row justify-content-between" style="background:#7dcf85;padding:10px 10px 10px 10px" v-if="this.cartPrice != undefined">
          <div class="flex-column pl-3">
            <h4>Total</h4>
          </div>
          <div class="flex-column pr-3">
            <h4>₺{{ cartPrice }}</h4>
          </div>
        </div>
        <div class="row justify-content-between" style="padding:10px 10px 10px 10px" v-if="this.cartPrice != undefined">
          <div class="flex-column pl-3">
            <b-button size="lg" variant="danger" v-on:click="resetCart">Reset Cart</b-button>
          </div>
          <div class="flex-column pr-3" v-if="currentUser">
            <b-button v-b-modal.checkout-modal size="lg"  @click="cartON" variant="success" style="background-color: #7dcf85">Checkout</b-button>
          </div>
          <div class="flex-column pr-3" v-if="!currentUser">
            <b-button v-b-modal.login-modal size="lg"  @click="cartON" variant="success" style="background-color: #7dcf85">Sign In</b-button>
          </div>
        </div>
        <b-modal
                id="checkout-modal"
                ref="modal"
                title="You will be redirected to the payment."
                hide-backdrop
                @ok="doPayment"
            ><h4>Do you confirm the items in your cart?</h4>
            <br>
          <div class="row" v-for="(thing, i) in cartContent" v-bind:key="'thing.product_id' +i">
            <div class="col4 col-xl-4 col-lg-4 col-md-4 col-sm-4">
              <img :src="thing.img_url" style="width: 70px; box-shadow: 0 14px 98px rgba(0, 0, 0, 0.25), 0 0px 60px rgba(0, 0, 0, 0.22);">
            </div>
            <div class="col6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
              <h4>{{ thing.name }}</h4>
              <h6>₺{{ thing.price }}</h6>
            </div>
          </div>
          <div class="row justify-content-between" style="background:#7dcf85;padding:10px 10px 10px 10px" v-if="this.cartPrice != undefined">
            <div class="flex-column pl-3">
              <h4>Total</h4>
            </div>
            <div class="flex-column pr-3">
              <h4>₺{{ cartPrice }}</h4>
            </div>
          </div>
        </b-modal>
      </div>
    </div>

    <div :class="modalClass" @click="cartON"></div>
  </div>
</template>

<script>


export default {
  name: 'CartC',
  data() {
    return {
      cClass: 'cart',
      modalClass: 'modal off'
    }
  },
  computed:{
    cartContent(){
      return this.$store.state.cartItems
    },
    cartPrice() {
      return this.$store.getters.totalPrice
    },
    currentUser() {
      return this.$store.state.status.user
    }
  },
  methods: {
    cartON() {
      if(this.cClass === 'cart on'){
        this.cClass = 'cart'
        this.modalClass = 'modal off'
      }else{
        this.cClass = 'cart on'
        this.modalClass = 'modal'
      }
    },
    removeThing(id){
      this.$store.commit('outCart',id)
    },
    resetCart(){
      this.$store.commit('outAllCart')
    },
    doPayment() {
      alert('Congratulations!!. Your payment was successfully completed.')
      this.resetCart()
    }
}
}
</script>

<style scoped>
/* Modal Overlay */
.modal {
  display: block;
  z-index: 1050;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.modal.off {
  display: none;
}
/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
/* Cart Body */
.cart {
  position: fixed;
  margin-right: 0px;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background: #f76d4a;
  overflow-y: auto;
  z-index:1051;
  -webkit-overflow-scrolling: touch;
  transform: translateX(360px);
  transition-property: transform;
  transition-duration: 0.4s;
}
.cart.on{
  transform: translateX(0);
  -webkit-overflow-scrolling: touch;
  transition-property: transform;
  transition-duration: 0.4s;
}

.cart-menu{
  color: #eee;
  margin-left: 10px;
  margin-right: 15px;
}

hr {
border-color: white;
}

.row{
  margin-top: 10px;
  margin-bottom: 10px;
}


.remove-btn{
  border-radius: 50%;
  content: url('../../assets/multiply.png')
}

.remove-btn:hover {
  background-color: grey;
}

</style>
