<template>
  <section class="carousel">
    <div id="heroControls" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#heroControls" class="active" data-slide-to="0"></li>
        <li data-target="#heroControls" data-slide-to="1"></li>
        <li data-target="#heroControls" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <video id="page-video" muted autoplay playsinline loop>
            <source src="https://cdn-nq.logo.com.tr/assets/videos/covar-main.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="carousel-item">
          <img
            class="img-fluid"
            src="https://www.boraxbilgisayar.com/images/berqnet-firewall-utm-satis-kurulum.jpg"
            alt="Second slide"
          />
        </div>
        <div class="carousel-item">
          <img
            class="img-fluid"
            src="https://berqnet.com/uploads/pro-compare_op.webp"
            alt="Third slide"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Carousel'
}
</script>

<style scoped>
.carousel {
  background-color: #e03030;
  max-height: 850px !important;
}
.img-fluid {
  width: 100% !important;
  max-height: 850px !important;
  margin-left: auto;
  margin-right: auto;
}

ol.carousel-indicators li {
  background-color: white;
  height: 20px;
  width: 40px;
  border-radius: 30px;
  border: 0.6px solid black;
}

ol.carousel-indicators li.active {
  background: #dbf0fa;
}

video {
  width: 100% !important;
  max-height: 850px !important;
}
</style>
