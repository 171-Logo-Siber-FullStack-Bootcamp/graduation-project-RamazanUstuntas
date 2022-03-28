<template>
  <div>
    <nav class="row justify-content-start" v-for="it in information" :key="it.product_id" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item"><router-link to="/products">Products</router-link></li>
        <li class="breadcrumb-item">{{ getCategoryName(it.category_id) }}</li>
        <li class="breadcrumb-item active">{{ it.name }}</li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['information'],
  name: 'InfoBreadcrumb',
  methods: {
    getCategoryName(it){
      switch(it){
        case 1:
        case "1":
          return "Firewall";
        case 2:
        case "2":
          return "Router";
        case 3:
        case "3":
          return "Switch";
        case 4:
        case "4":
          return "Wifi-repeater";
        case 5:
        case "5":
          return "Wifi-dongle";
        case 6:
        case "6":
          return "Mug";
        case 7:
        case "7":
          return "T-shirt";
        case 8:
        case "8":
          return "Hoodie";
        case 9:
        case "9":
          return "Backpack";
        case 10:
        case "10":
          return "Book";
      }
    }
  }
}
</script>

<style scoped>
.breadcrumb{
  background: inherit;
}

.breadcrumb>li>a {
  text-decoration: none;
  color: #2c3539 !important;
  font-size: 18px;
}
.breadcrumb>li>a:hover {
  text-decoration: underline;
}

.breadcrumb-item.active {
  text-decoration: none !important;
  color: #f2be00 !important;
}
</style>
