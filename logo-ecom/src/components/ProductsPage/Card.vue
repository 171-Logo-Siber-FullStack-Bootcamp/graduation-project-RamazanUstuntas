<!-- Product Card Component -->
<template>
  <div>
    <transition-group name="fade" class="row" tag="div">
      <div v-for="item in CardArray" class="col-6 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-4 pb-3" :key="item.product_id">
          <div class="card">
            <img class="card-img-top" :src="item.img_url" alt="Card image cap">
            <div class="overlay">
              <button type="button" class="btn btn-outline-secondary btn-lg" data-toggle="modal" data-target="#user1Modal" @click="sendInfoToModal(item)">Quick View</button>
              <button type="button" class="btn btn-outline-secondary btn-lg" @click="addtoCart(item)">Add +</button>
              <router-link to="/Info"><button type="button" class="btn btn-outline-secondary btn-lg" @click="sendInfo(item)">More Detail</button></router-link>
               
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <p class="card-text">₺{{ item.price }}</p>
            </div>
          </div>
      </div>
    </transition-group>
  </div>

</template>

<script>
export default {
  props: ['CardArray'],
  name: 'Card',
  methods: {
    addtoCart(it) {
     this.$store.commit('inCart', it)
    },
    sendInfoToModal(it) {
     this.$store.commit('addtoInfo', it);
    },
    sendInfo(it) {
     this.$router.push('/')
     this.$store.commit('addtoInfo', it);
    },
  }
}
</script>

<style>
/* transition Group style */
.fade-move {
  transition: transform 1s;
}
/* Card Style */
.card {
  transition: 500ms;
  position: relative;
  overflow: hidden;
  align-items: center;
}

.card img {
  z-index: 1;
  width: 250px;
  object-fit: cover;
}

.card button {
  width: 140px;
  margin-bottom: 10px;
}

.card:hover img {
  filter: blur(4px);
}

.card:hover .overlay {
  opacity: 0.8;

}

.card .overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  background-color: #232b34;
  opacity: 0;
  z-index: 100;
  transition: all 0.3s ease-in;
}

.card:hover, .card:active {
  transform: scaleY(1.1) scaleX(1.06);
  box-shadow: 0 14px 98px rgba(0, 0, 0, 0.25), 0 0px 60px rgba(0, 0, 0, 0.22);
}
</style>
