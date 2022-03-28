<template >
  <div class="container py-5" style="padding-top:70px;">

    <InfoBreadcrumb :information="information"/>
    <InfoBox :information="information"/>
    <InfoText :information="information"/>

    <div class="related-item">
      <hr>
      <h6 class="pb-4">RELATED PRODUCTS</h6>
      <Card :CardArray="sliceRelatedItems" />
    </div>

  </div>
</template>

<script>
import InfoBreadcrumb from '@/components/InfoPage/InfoBreadcrumb.vue'
import InfoBox from '@/components/InfoPage/InfoBox.vue'
import InfoText from '@/components/InfoPage/InfoText.vue'
import Card from '@/components/ProductsPage/Card.vue'


export default {
  components: {
    InfoBreadcrumb, InfoBox, InfoText, Card
  },
  data() {
    return {
      information: [],
      relatedItems: []
    }
  },
  created(){
    this.information = this.infO
    this.relatedItems = this.categoryRelated
    this.if()
    },
  computed: {
    infO() {
      return this.$store.getters.infoLength
    },
    bringItems() {
      return this.$store.state.items
    },
    // to show the first 3 related items
    sliceRelatedItems(){
      return this.relatedItems.slice(0 ,3)
    },
    // filter without current item
    categoryRelated(){
      return this.bringItems.filter((e)=>e.category_id==this.information[0].category_id && e.product_id != this.information[0].product_id)
    },
  },
  methods: {
    if(){
      if(!this.information){
         this.$router.push('/products')
      }
    }
  }
}
</script>

<style scoped>
hr {
width: 50px;
border-bottom: 1px solid black;
}
.related-item{
  /* padding-left: 8rem; */
  /* padding-right: 8rem; */
  height: auto;
  text-align: center;
}
</style>
