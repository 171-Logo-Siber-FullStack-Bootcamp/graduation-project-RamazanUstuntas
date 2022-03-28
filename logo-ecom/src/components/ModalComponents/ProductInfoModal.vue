<template>
  <div class="modal fade" id="user1Modal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" style="outline-style:none;" aria-label="Close">
              <span>x</span>
            </button>
            <InfoBreadcrumb :information="information"/>
            <InfoBox :information="information"/>
            <InfoText :information="information"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoBreadcrumb from '../InfoPage/InfoBreadcrumb.vue'
import InfoBox from '../InfoPage/InfoBox.vue'
import InfoText from '../InfoPage/InfoText.vue'
  export default {
    props: ['open'],
    components: {
    InfoBreadcrumb, InfoBox, InfoText,
  },
   data() {
    return {
      information: [],
    }
  },
  created(){
    this.information = this.infO
  },
  watch: {
    infO() {
      this.information=this.infO
    }
  },
  computed: {
    infO() {
      return this.$store.getters.infoLength
    }
  }
  }
</script>