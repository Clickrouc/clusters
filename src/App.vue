<script setup>
import { ref } from 'vue'
import axios from 'axios'
import TheBubbles from '@/components/TheBubbles.vue'
import { useToast } from 'vue-toast-notification'
import TheClusters from '@/components/TheClusters/TheClusters.vue'
import TheForm from '@/components/TheForm.vue'
import TheLoader from '@/components/TheLoader/TheLoader.vue'

const API_URL = import.meta.env.VITE_API_URI

const $toast = useToast()

const time = ref(null)
const data = ref(null)
const stage = ref('start')

function handler(input) {
  if (!input) {
    $toast.error('Нужно ввести запрос в поле', {
      position: 'bottom'
    })
    return
  }

  axios
    .get(`${API_URL}/get_time`)
    .then((res) => {
      time.value = res.data.time_in_seconds

      stage.value = 'click'

      setTimeout(() => {
        stage.value = 'to-center'
      }, 100)

      setTimeout(() => {
        stage.value = 'loading'
      }, 1100)

      axios
        .post(`${API_URL}/assess_cluster`, {
          product_description: input
        })
        .then((res) => {
          data.value = res.data

          stage.value = 'result'

          setTimeout(() => {
            stage.value = 'final'
          }, 1000)
        })
        .catch((err) => {
          $toast.error(err, {
            position: 'bottom'
          })

          stage.value = 'to-center'

          setTimeout(() => {
            stage.value = 'start'
          }, 1000)
        })
    })
    .catch((err) => {
      $toast.error(err, {
        position: 'bottom'
      })
    })
}

function backHandler() {
  data.value = null

  stage.value = 'to-center'

  setTimeout(() => {
    stage.value = 'click'
  }, 100)

  setTimeout(() => {
    stage.value = 'start'
  }, 1100)
}
</script>

<template>
  <div class="app">
    <TheBubbles :stage="stage" />

    <TheForm :stage="stage" :handler="handler" />

    <TheLoader :stage="stage" :time="time" :is-data="!!data" />

    <TheClusters v-if="!!data" :data="data" :back-handler="backHandler" />
  </div>
</template>

<style lang="scss">
.app {
  position: relative;

  height: 100%;

  overflow: hidden;
}
</style>
