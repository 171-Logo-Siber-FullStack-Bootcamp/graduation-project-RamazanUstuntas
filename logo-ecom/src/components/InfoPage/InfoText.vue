<template>
  <div>
    <div class="more info d-flex justify-content-between text-center" >
      <div class="col4 flex-fill" v-for="(info, index) in moreInfo" :class="[index === active ? 'col4 active' : '']" @click="moreInfoSelect(index)" :key="info.id">
        <h6>{{ info }}</h6>
      </div>
    </div>
    <div v-for="it in information" :key="it.product_id">
      <div v-for="(info, index) in moreInfo" :key="info.id">
        <div class="container pt-3" v-if="info == 'DESCRIPTION' && index==active">
        <div class="row">
          <p>{{it.description}}</p>
        </div>
        </div>
        <div class="container pt-3" v-if="info == 'WARRANTY' && index==active">
        <div class="row">
          <p>Warranty period: <b>{{it.warranty}}-months</b></p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['information'],
  name: 'InfoText',
  data() {
    return {
      moreInfo: ['DESCRIPTION', 'WARRANTY'],
      active: 0,
    }
  },
  methods: {
    moreInfoSelect(index) { //More Info area tab selector
      return this.active = index
    },
  }
}
</script>

<style scoped>
.col4 h6 {
  height: 25px;
  padding-bottom: 25px;
  border-bottom:1px solid lightgrey;
  color: grey;
  cursor: pointer;
}

.col4.active h6 {
  font-weight: bold;
  border-bottom:1px solid black !important;
  color: black;
}
</style>
