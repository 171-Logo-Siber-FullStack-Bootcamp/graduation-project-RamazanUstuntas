<template>
  <div>
    <Carousel />
    <Products />
    <Contact />
  </div>
</template>

<script>
import Carousel from '@/components/HomePage/Carousel.vue'
import Products from './ProductsPage.vue'
import Contact from './ContactPage.vue'

export default {
  components: {
    Carousel,Products,Contact
  }
}

</script>
