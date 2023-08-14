<script setup></script>

<template>
  <div class="container">
    <div class="bubbles">
      <span class="bubble animated"></span>
      <span class="bubble animated"></span>
      <span class="bubble animated"></span>
      <span class="bubble animated"></span>
      <span class="bubble animated"></span>
      <span class="bubble animated"></span>
    </div>

    <form action="#">
      <textarea
        placeholder="Введите запрос. Например: кэшбек на услуги здорового питания"
      ></textarea>

      <button type="submit">Рассчитать</button>
    </form>
  </div>
</template>

<style lang="scss">
.container {
  position: relative;

  height: 100%;

  overflow: hidden;
}

.bubble {
  position: absolute;
  display: block;

  border-radius: 50%;
  transform: translate(-50%, -50%);

  transition: all 300ms ease-in-out;

  &:nth-child(1) {
    top: 252px;
    left: 222px;

    width: 556px;
    height: 556px;

    background-color: rgb(198, 254, 201, 50%);

    &.animated {
      animation: bubble1 15s linear infinite;
    }
  }

  &:nth-child(2) {
    left: -87px;
    top: 567px;

    width: 689px;
    height: 689px;

    opacity: 0.2;
    background-color: rgba(80, 197, 90, 45%);

    &.animated {
      animation: bubble2 15s linear infinite;
    }
  }

  &:nth-child(3) {
    top: 647px;
    right: -454px;

    width: 471px;
    height: 471px;

    background-color: rgba(80, 197, 90, 45%);

    &.animated {
      animation: bubble3 15s linear infinite;
    }
  }

  &:nth-child(4) {
    right: -472px;
    bottom: -521px;

    width: 689px;
    height: 689px;

    background-color: rgb(198, 254, 201, 50%);

    &.animated {
      animation: bubble4 15s linear infinite;
    }
  }

  &:nth-child(5) {
    right: -64px;
    bottom: -615px;

    width: 556px;
    height: 556px;

    background-color: rgb(198, 254, 201, 50%);

    &.animated {
      animation: bubble5 15s linear infinite;
    }
  }

  &:nth-child(6) {
    right: -184px;
    bottom: -573px;

    width: 471px;
    height: 471px;

    background-color: rgb(80, 197, 90, 45%);

    &.animated {
      animation: bubble6 15s linear infinite;
    }
  }
}

form {
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;
  gap: 34px;
  align-items: center;
  width: 793px;

  transform: translate(-50%, -50%);
}

textarea {
  width: 100%;
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
    right: -454px;

    width: 471px;
    height: 471px;
  }

  33% {
    top: 341px;
    right: -471px;

    width: 471px;
    height: 471px;
  }

  66% {
    top: 0;
    right: -298px;

    width: 533px;
    height: 533px;
  }

  100% {
    top: 647px;
    right: -454px;

    width: 471px;
    height: 471px;
  }
}

@keyframes bubble4 {
  0% {
    right: -472px;
    bottom: -521px;
  }

  33% {
    right: -599px;
    bottom: -371px;
  }

  66% {
    right: -641px;
    bottom: -99px;
  }

  100% {
    right: -472px;
    bottom: -521px;
  }
}

@keyframes bubble5 {
  0% {
    right: -64px;
    bottom: -615px;
  }

  33% {
    right: -188px;
    bottom: -615px;
  }

  66% {
    right: -282px;
    bottom: -633px;
  }

  100% {
    right: -64px;
    bottom: -615px;
  }
}

@keyframes bubble6 {
  0% {
    right: -184px;
    bottom: -573px;

    width: 471px;
    height: 471px;
  }

  33% {
    right: -218px;
    bottom: -334px;

    width: 308px;
    height: 308px;
  }

  66% {
    right: 225px;
    bottom: -334px;

    width: 335px;
    height: 335px;
  }

  100% {
    right: -184px;
    bottom: -573px;

    width: 471px;
    height: 471px;
  }
}
</style>
