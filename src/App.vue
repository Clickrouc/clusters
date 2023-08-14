<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import TheBubbles from '@/components/TheBubbles.vue'
import { useToast } from 'vue-toast-notification'
import TheClusters from '@/components/TheClusters/TheClusters.vue'

const API_URL = import.meta.env.VITE_API_URI

const $toast = useToast()

const input = ref(null)
const loading = ref(false)
const centered = ref(false)
const time = ref(null)
const percentage = ref(0)
const data = ref(null)
const result = ref(false)

function handler(e) {
  e.preventDefault()

  if (!input.value) {
    $toast.error('Нужно ввести запрос в поле', {
      position: 'bottom'
    })
    return
  }

  loading.value = true

  setTimeout(() => {
    centered.value = true
  }, 100)

  axios
    .post(`${API_URL}/assess_cluster`, {
      product_description: input.value
    })
    .then((res) => {
      console.log(res)
      data.value = res.data
    })
    .catch((err) => {
      $toast.error(err, {
        position: 'bottom'
      })
    })
    .finally(() => {
      centered.value = false

      setTimeout(() => {
        loading.value = false
      }, 1000)
    })

  axios
    .get(`${API_URL}/get_time`)
    .then((res) => {
      time.value = res.data.time_in_seconds
    })
    .catch((err) => {
      $toast.error(err, {
        position: 'bottom'
      })
    })
}

const interval = ref(null)

watch(time, (newTime) => {
  if (!newTime) return

  interval.value = setInterval(() => {
    if (percentage.value === 100) return
    percentage.value++
  }, newTime * 10)
})

watch(data, (newData) => {
  if (!newData) return

  clearInterval(interval.value)
})
</script>

<template>
  <div class="container">
    <TheBubbles v-if="!result" :centered="centered" :loading="loading" :is-data="!!data" />

    <form action="#" :class="{ hidden: loading || !!data }" @submit="handler">
      <textarea
        v-model="input"
        placeholder="Введите запрос. Например: кэшбек на услуги здорового питания"
      ></textarea>

      <button type="submit">Рассчитать</button>
    </form>

    <p class="percentage" :class="{ loading: loading }">{{ percentage }}%</p>

    <TheClusters v-if="!!data" :data="data" />
  </div>
</template>

<style lang="scss">
.container {
  position: relative;

  height: 100%;

  overflow: hidden;
}

form {
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;
  gap: 34px;
  align-items: center;
  max-width: 793px;
  width: 793px;

  transform: translate(-50%, -50%);

  transition: all 0.5s ease-in-out;

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
}

textarea {
  display: block;
  width: 100%;
  max-width: 100%;
  height: 359px;
  padding: 32px;

  border-radius: 22px;
  border: 1px solid #50c55a;
  box-shadow: 2px 9px 15px 0 rgba(0, 0, 0, 0.1);
  outline: none;

  &:focus {
    border-width: 2px;
  }
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 185px;
  height: 56px;
  margin: 0;
  padding: 0;

  color: #fff;
  font-size: 20px;

  border: none;
  border-radius: 4px;
  background: #50c55a;
  cursor: pointer;

  &:hover {
    background-color: #213949;
  }
}

.percentage {
  position: absolute;
  top: 50%;
  left: 50%;

  margin: 0;

  font-weight: 700;
  font-size: 64px;
  color: #fff;

  visibility: hidden;
  opacity: 0;
  transform: translate(-50%, -50%);

  &.loading {
    opacity: 1;
    visibility: visible;
  }
}
</style>
