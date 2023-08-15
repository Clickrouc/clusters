<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  item: Object
})

const { item } = toRefs(props)
</script>

<template>
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
      <div class="popover__left">Валидность:</div>

      <div class="popover__right">
        {{ item.likely_to_buy ? 'Продукт подходит' : 'Продукт не подходит' }}
      </div>
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

<style lang="scss">
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
