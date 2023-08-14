<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  loading: Boolean,
  centered: Boolean,
  isData: Boolean
})

const { loading, centered, isData } = toRefs(props)
</script>

<template>
  <div class="bubbles">
    <span
      v-for="i in Array(6)"
      :key="i"
      class="bubble"
      :class="{
        animated: !loading,
        centered: centered || isData,
        'is-data': isData
      }"
    ></span>
  </div>
</template>

<style lang="scss">
.bubble {
  position: absolute;
  display: block;

  border-radius: 50%;

  transition: all 1s ease-in-out;

  &.is-data {
    opacity: 0;
    visibility: hidden;
  }

  &:nth-child(1) {
    top: 252px;
    left: 222px;

    width: 556px;
    height: 556px;

    background-color: rgb(198, 254, 201, 50%);
    transform: translate(-50%, -50%);

    &.animated {
      animation: bubble1 30s linear infinite;
    }

    &.centered {
      top: 50%;
      left: 50%;

      width: 500px;
      height: 500px;
    }
  }

  &:nth-child(2) {
    left: -87px;
    top: 567px;

    width: 689px;
    height: 689px;

    opacity: 0.2;
    background-color: rgba(80, 197, 90, 45%);
    transform: translate(-50%, -50%);

    &.animated {
      animation: bubble2 30s linear infinite;
    }

    &.centered {
      top: 50%;
      left: 50%;

      width: 500px;
      height: 500px;
    }
  }

  &:nth-child(3) {
    top: 647px;
    right: 18px;

    width: 471px;
    height: 471px;

    background-color: rgba(80, 197, 90, 45%);
    transform: translate(50%, -50%);

    &.animated {
      animation: bubble3 30s linear infinite;
    }

    &.centered {
      top: 50%;
      right: 50%;

      width: 500px;
      height: 500px;
    }
  }

  &:nth-child(4) {
    right: 218px;
    bottom: 169px;

    width: 689px;
    height: 689px;

    background-color: rgb(198, 254, 201, 50%);
    transform: translate(50%, 50%);

    &.animated {
      animation: bubble4 30s linear infinite;
    }

    &.centered {
      right: 50%;
      bottom: 50%;

      width: 500px;
      height: 500px;
    }
  }

  &:nth-child(5) {
    right: 492px;
    bottom: -59px;

    width: 556px;
    height: 556px;

    background-color: rgb(198, 254, 201, 50%);
    transform: translate(50%, 50%);

    &.animated {
      animation: bubble5 30s linear infinite;
    }

    &.centered {
      right: 50%;
      bottom: 50%;

      width: 500px;
      height: 500px;
    }
  }

  &:nth-child(6) {
    right: 288px;
    bottom: -101px;

    width: 471px;
    height: 471px;

    background-color: rgb(80, 197, 90, 45%);
    transform: translate(50%, 50%);

    &.animated {
      animation: bubble6 30s linear infinite;
    }

    &.centered {
      right: 50%;
      bottom: 50%;

      width: 500px;
      height: 500px;
    }
  }
}

@keyframes bubble1 {
  0% {
    top: 278px;
    left: 222px;

    width: 556px;
    height: 556px;
  }

  33% {
    top: 308px;
    left: 187px;

    width: 616px;
    height: 616px;
  }

  66% {
    top: 323px;
    left: 410px;

    width: 472px;
    height: 472px;
  }

  100% {
    top: 278px;
    left: 222px;

    width: 556px;
    height: 556px;
  }
}

@keyframes bubble2 {
  0% {
    top: 567px;
    left: -87px;

    width: 689px;
    height: 689px;

    opacity: 0.2;
  }

  33% {
    top: 845px;
    left: -92px;

    width: 689px;
    height: 689px;

    opacity: 1;
  }

  66% {
    top: 590px;
    left: 135px;

    width: 472px;
    height: 472px;

    opacity: 1;
  }

  100% {
    top: 567px;
    left: -87px;

    width: 689px;
    height: 689px;

    opacity: 0.2;
  }
}

@keyframes bubble3 {
  0% {
    top: 647px;
    right: 18px;

    width: 471px;
    height: 471px;
  }

  33% {
    top: 341px;
    right: 1px;

    width: 471px;
    height: 471px;
  }

  66% {
    top: 0;
    right: 267px;

    width: 533px;
    height: 533px;
  }

  100% {
    top: 647px;
    right: 18px;

    width: 471px;
    height: 471px;
  }
}

@keyframes bubble4 {
  0% {
    right: 218px;
    bottom: 169px;
  }

  33% {
    right: 91px;
    bottom: 319px;
  }

  66% {
    right: 49px;
    bottom: 591px;
  }

  100% {
    right: 218px;
    bottom: 169px;
  }
}

@keyframes bubble5 {
  0% {
    right: 492px;
    bottom: -59px;
  }

  33% {
    right: 368px;
    bottom: -59px;
  }

  66% {
    right: 838px;
    bottom: -77px;
  }

  100% {
    right: 492px;
    bottom: -59px;
  }
}

@keyframes bubble6 {
  0% {
    right: 288px;
    bottom: -101px;

    width: 471px;
    height: 471px;
  }

  33% {
    right: 90px;
    bottom: -26px;

    width: 308px;
    height: 308px;
  }

  66% {
    right: 561px;
    bottom: -48px;

    width: 335px;
    height: 335px;
  }

  100% {
    right: 288px;
    bottom: -101px;

    width: 471px;
    height: 471px;
  }
}
</style>
