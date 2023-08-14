<script setup>
import { onMounted, ref, toRefs } from 'vue'
import { clustersConverter } from './clustersConverter'
import { Tippy } from 'vue-tippy'

const props = defineProps({
  data: Array
})

const { data } = toRefs(props)
const itemRefs = ref([])

const convertedData = ref([])

onMounted(() => {
  convertedData.value = clustersConverter(data.value, window.innerWidth, window.innerHeight)

  setTimeout(() => {
    itemRefs.value.forEach((item, index) => {
      const cluster = convertedData.value[index]
      item.style.top = `${cluster.y}px`
      item.style.left = `${cluster.x}px`

      const circle = item.querySelector('.circle')

      circle.style.width = `${cluster.elementSize}px`
      circle.style.height = `${cluster.elementSize}px`
      circle.style.backgroundColor = cluster.likely_to_buy ? '#50C55A' : 'rgba(80, 197, 90, 50%)'
    })
  }, 100)
})
</script>

<template>
  <div v-if="convertedData.length" class="clusters">
    <div v-for="item in convertedData" :key="item.cluster_name" class="cluster" ref="itemRefs">
      <Tippy max-width="none" placement="auto" animation="shift-away" :arrow="false">
        <div class="circle">
          <span>{{ item.cluster_name }}</span>
        </div>
        <template #content>
          <div class="popover">
            <div class="popover__container">
              <div class="popover__left">Название:</div>

              <div class="popover__right">{{ item.cluster_name }}</div>
            </div>

            <div class="popover__container">
              <div class="popover__left">Размер:</div>

              <div class="popover__right">{{ item.cluster_size }}</div>
            </div>

            <div class="popover__container">
              <div class="popover__left">Описание:</div>

              <div class="popover__right">{{ item.description }}</div>
            </div>

            <div class="popover__container">
              <div class="popover__left">Топ мест:</div>

              <div class="popover__right">
                <ul>
                  <li v-for="(transaction, index) in item.frequent_transactions" :key="index">
                    {{ transaction }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
      </Tippy>
    </div>
  </div>
</template>

<style lang="scss">
.cluster {
  position: absolute;
  top: 50%;
  left: 50%;

  transition: all 1s ease-in-out;
  transform: translate(-50%, -50%);

  .circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    padding: 16px;

    border-radius: 50%;
    background-color: #50c55a;
    cursor: pointer;

    transition: all 1s ease-in-out;
  }

  span {
    overflow: hidden;

    color: #fff;
    font-size: 30px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

[data-tippy-root] {
  .tippy-box {
    padding: 32px 40px 50px;

    color: #213949;

    background-color: #fff;
    border: 1px solid #50c55a;
    border-radius: 22px;
    box-shadow: 2px 9px 15px 0 rgba(0, 0, 0, 0.1);
  }
}

.popover {
  display: flex;
  flex-direction: column;
  gap: 14px;

  &__container {
    display: flex;
    gap: 20px;
  }

  &__left {
    flex-shrink: 0;
    width: 91px;

    font-weight: 600;
  }

  &__right {
    width: 615px;

    ul {
      margin: 0;
      padding: 0;

      list-style: none;
    }
  }
}
</style>
