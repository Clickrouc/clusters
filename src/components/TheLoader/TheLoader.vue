<script setup>
import animation from './animation.json'
import { Vue3Lottie } from 'vue3-lottie'
import { ref, toRefs, watch } from 'vue'

const props = defineProps({
  stage: String,
  isData: Boolean,
  time: Number
})

const { stage, isData, time } = toRefs(props)

const percentage = ref(0)
const interval = ref(null)

watch([time, stage], ([newTime, newStage]) => {
  if (newStage === 'start') {
    clearInterval(interval.value)
    percentage.value = 0
  }

  if (!newTime || newStage !== 'click') return

  interval.value = setInterval(() => {
    if (percentage.value === 99) return
    percentage.value++
  }, newTime * 10)
})

watch(isData, (value) => {
  if (!value) return

  clearInterval(interval.value)
})
</script>

<template>
  <div class="loader" :class="{ visible: stage === 'loading' }">
    <Vue3Lottie class="loader__animation" :animation-data="animation" auto-play loop />
    <p class="loader__text">{{ percentage }}%</p>
  </div>
</template>

<style lang="scss">
.loader {
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 500px;

  visibility: hidden;
  opacity: 0;
  transform: translate(-50%, -50%);

  &.visible {
    opacity: 1;
    visibility: visible;
  }
}

.loader__animation {
  position: absolute;
  inset: 0;
}

.loader__text {
  position: relative;

  margin: 0;

  font-weight: 700;
  font-size: 64px;
  color: #fff;
}
</style>
