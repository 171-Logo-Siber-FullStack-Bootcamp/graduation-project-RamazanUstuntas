<template>
  <div id="app">
    <PageLoader></PageLoader>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import PageLoader from '@/components/PageLoader.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


export default{
  name: 'app',
  components: {
    Header, Footer, PageLoader
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Exo+2');
#app {
  background-color: #F8F8F8 !important;
  font-family: 'Exo 2', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
