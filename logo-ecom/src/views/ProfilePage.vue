<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <div v-for="(role,index) in currentUser.roles" :key="index">
        <li>{{role}}</li>
        <div class="m-4" v-if="role=='ROLE_MODERATOR'">
          <h5>Moderator Content</h5>
          <b-button type="button" class="btn btn-success" v-on:click="createChanger">Create Product</b-button>
          <b-button type="button" class="btn btn-danger ml-2" v-on:click="deleteChanger">Delete Product</b-button>
        </div>
        <div class="m-4" v-if="role=='ROLE_ADMIN'">
          <h5>Admin Content</h5>
        </div>
      </div>
        <div class="jumbotron mt-5" v-if="createActive">
          <b-form @submit="onSubmitCreate" @reset="onReset">
            <b-form-group
              id="input-group-name"
              label="Product Name:"
              label-for="input-1"
              description="Enter the name of the product you want to create."
            >
              <b-form-input
                id="input-product-name"
                v-model="product.name"
                placeholder="Enter product name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-description" label="Product Description:" label-for="input-2">
              <b-form-input
                id="input-product-description"
                v-model="product.description"
                placeholder="Enter product description"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-price" label="Product Price (₺):" label-for="input-2">
              <b-form-input
                id="input-product-price"
                v-model="product.price"
                placeholder="Enter product price"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-category" label="Product Category:" label-for="input-3">
              <b-form-select
                id="input-product-category"
                v-model="product.category_id"
                :options="category_id"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-warranty" label="Product Warranty (Months):" label-for="input-2">
              <b-form-input
                id="input-product-warranty"
                v-model="product.warranty"
                placeholder="Enter product warranty (months)"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-img" label="Product Image (Url):" label-for="input-2">
              <b-form-input
                id="input-product-img-url"
                v-model="product.img_url"
                placeholder="Enter product image url (Url)"
                required
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            <b-form-group>
                <div v-if="message" class="alert alert-success" role="alert">{{message}}</div>
              </b-form-group>
          </b-form>
          <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ product }}</pre>
          </b-card>
        </div>

         <div class="jumbotron mt-5" v-if="deleteActive">
          <b-form @submit="onSubmitDelete">
            <b-form-group
              id="input-group-id"
              label="Product Id:"
              label-for="input-1"
            >
              <b-form-input
                id="input-product-id"
                v-model="deletedItem_id"
                placeholder="Enter the ID of the product to be deleted "
                required
              ></b-form-input>
            </b-form-group>

            <b-button v-b-modal.delete-modal variant="danger" v-on:click="getProductById">Delete</b-button>
            <b-form-group>
                <div v-if="message" class="alert alert-success" role="alert">{{message}}</div>
              </b-form-group>
            <b-modal
                id="delete-modal"
                ref="modal"
                title="Are you sure?"
                hide-backdrop
                @ok="onSubmitDelete"
            ><p>Do you want to delete this product?</p>
              <div class="card" v-for="(item, index) in deletedItem" :key="'item.product_id'+ index">
                <img :src="item.img_url" alt="Card image cap">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">₺{{ item.price }}</p>
              </div>
            </b-modal>
          </b-form>
        </div>
    </ul>
  </div>
</template>

<script>
import Product from '../models/product';
import axios from 'axios';
export default {
  data() {
    return{
      createActive: false,
      deleteActive: false,
      product: new Product('', '', '', '', '', ''),
      category_id: [{ text: '', value:'null'}, 
                    { text: 'Firewall', value:'1'},
                    { text: 'Router', value:'2'}, 
                    { text: 'Switch', value:'3'}, 
                    { text: 'Wifi-Repeater', value:'4'},
                    { text: 'Wifi-Dongle', value:'5'}, 
                    { text: 'Mug', value:'6'}, 
                    { text: 'T-shirt', value:'7'}, 
                    { text: 'Hoodie', value:'8'}, 
                    { text: 'Backpack', value:'9'}, 
                    { text: 'Book', value:'10'}, ],
      deletedItem_id: '',
      deletedItem: [],
      message: '',
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.status.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/');
    }
  },
  methods: {
    deleteChanger(){
      this.createActive = false
      this.deleteActive = !this.deleteActive
      this.onReset()
    },
    createChanger(){
      this.deleteActive = false
      this.createActive = !this.createActive
      this.onReset()
    },
    onSubmitCreate(event) {
      event.preventDefault()
      axios
      .post('http://localhost:5000/createProduct', this.product)
      .then(response => this.message = response.data)
    },
    onSubmitDelete() {
      axios
      .delete(`http://localhost:5000/${this.deletedItem_id}`)
      .then(response => this.message = response.data)
    },
    onReset() {
      // Reset our form values
      this.product = new Product('', '', '', '', '', '')
      this.deletedItem_id = '',
      this.deletedItem = [],
      this.message = ''
    },
    getProductById(){
      axios
        .get(`http://localhost:5000/getProduct/${this.deletedItem_id}`)
        .then(response => this.deletedItem = response.data)
    }
  }
};
</script>