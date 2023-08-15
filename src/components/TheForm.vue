<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  stage: String,
  handler: Function
})

const { stage, handler } = toRefs(props)

const input = ref(null)

function onSubmit(e) {
  e.preventDefault()

  handler.value(input.value)
}
</script>

<template>
  <form class="form" action="#" :class="{ hidden: stage !== 'start' }" @submit="onSubmit">
    <textarea
      class="form__textarea"
      v-model="input"
      placeholder="Введите запрос. Например: кэшбек на услуги здорового питания"
    ></textarea>

    <button class="form__button" type="submit">Рассчитать</button>
  </form>
</template>

<style lang="scss">
.form {
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

.form__textarea {
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

.form__button {
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
</style>
