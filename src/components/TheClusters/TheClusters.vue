<script setup>
import { onMounted, ref, toRefs } from 'vue'
import { Tippy } from 'vue-tippy'

import { clustersConverter } from './clustersConverter'
import ThePopover from './ThePopover.vue'

const props = defineProps({
  data: Object,
  backHandler: Function
})

const { data, backHandler } = toRefs(props)

const body = ref(null)
const itemRefs = ref([])
const convertedData = ref([])
const commonAudience = ref(null)

onMounted(() => {
  convertedData.value = clustersConverter(
    data.value,
    body.value.offsetWidth,
    body.value.offsetHeight
  )

  setTimeout(() => {
    itemRefs.value.forEach((item, index) => {
      const cluster = convertedData.value[index]
      item.style.top = `${cluster.y}px`
      item.style.left = `${cluster.x}px`

      const circle = item.querySelector('.clusters__circle')

      circle.style.width = `${cluster.elementSize}px`
      circle.style.height = `${cluster.elementSize}px`
      circle.style.backgroundColor = cluster.likely_to_buy ? '#50C55A' : 'rgba(148, 148, 148, 0.50)'
      circle.style.fontSize = `${cluster.elementSize * 0.12 < 8 ? 8 : cluster.elementSize * 0.12}px`
      circle.style.color = '#fff'
    })
  }, 100)

  commonAudience.value = data.value.clusters.reduce((acc, curr) => acc + curr.cluster_size, 0)
})

function goBack() {
  itemRefs.value.forEach((item) => {
    item.style = ''
    const circle = item.querySelector('.clusters__circle')
    circle.style = ''
  })

  setTimeout(backHandler.value, 1000)
}

function numberWithCommas(x) {
  if (!x) return ''
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
</script>

<template>
  <div class="clusters">
    <div class="clusters__header">
      <button class="clusters__back" @click="goBack">Вернуться</button>

      <div class="clusters__total">
        <span><b>Общая аудитория:</b> {{ numberWithCommas(commonAudience) }}</span>
        <span><b>Целевая аудитория:</b> {{ numberWithCommas(data.total_target_audience) }}</span>
      </div>
    </div>

    <div ref="body" class="clusters__body">
      <div
        v-for="item in convertedData"
        :key="item.cluster_name"
        class="clusters__cluster"
        ref="itemRefs"
      >
        <Tippy max-width="none" placement="auto" animation="shift-away" :arrow="false">
          <div class="clusters__circle">
            <span class="clusters__name">{{ item.cluster_name }}</span>
          </div>
          <template #content>
            <ThePopover :item="item" />
          </template>
        </Tippy>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.clusters {
  display: flex;
  flex-direction: column;
  gap: 72px;
  height: 100%;
  padding: 72px;
}

.clusters__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.clusters__back {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0;
  padding: 0;

  color: #50c55a;
  font-size: 18px;
  font-weight: 500;

  background-color: transparent;
  border: 0;
  cursor: pointer;

  &::before {
    flex-shrink: 0;
    width: 24px;
    height: 22px;

    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='24' fill='none'%3E%3Cpath fill='%2350C55A' d='M.94 10.94a1.5 1.5 0 0 0 0 2.12l9.545 9.547a1.5 1.5 0 1 0 2.122-2.122L4.12 12l8.486-8.485a1.5 1.5 0 1 0-2.122-2.122L.94 10.94ZM26 10.5H2v3h24v-3Z'/%3E%3C/svg%3E")
      center no-repeat;
    background-size: contain;

    content: '';
  }
}

.clusters__total {
  display: flex;
  flex-direction: column;
  gap: 8px;

  color: #213949;

  b {
    font-weight: 600;
  }
}

.clusters__body {
  position: relative;
  flex: 1;
}

.clusters__cluster {
  position: absolute;
  top: 50%;
  left: 50%;

  transition: all 1s ease-in-out;
  transform: translate(-50%, -50%);
}

.clusters__circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  padding: 16px;

  color: transparent;
  font-size: 0;

  border-radius: 50%;
  background-color: #50c55a;
  cursor: pointer;

  transition: all 1s ease-in-out;
}

.clusters__name {
  overflow: hidden;

  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
