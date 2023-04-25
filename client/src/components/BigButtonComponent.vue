<template>
  <div class="arrows">
    <img
      id="arrow-down"
      alt="arrow-down"
      class="arrow"
      src="@/assets/svg/arrow-down-circle-fill.svg"
    />
    <div>
      <img
        id="arrow-right"
        alt="arrow-right"
        class="arrow"
        src="@/assets/svg/arrow-right-circle-fill.svg"
      />
      <slot />
      <img
        id="arrow-left"
        alt="arrow-left"
        class="arrow"
        src="@/assets/svg/arrow-left-circle-fill.svg"
      />
    </div>
    <img id="arrow-up" alt="arrow-up" class="arrow" src="@/assets/svg/arrow-up-circle-fill.svg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BigButtonComponent'
})
</script>

<style scoped>
.arrows {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#arrow-up {
  -webkit-animation: mover-down 1.5s infinite alternate;
  animation: mover-down 1.5s infinite alternate;
}

#arrow-down {
  -webkit-animation: mover-up 1.5s infinite alternate;
  animation: mover-up 1.5s infinite alternate;
}

#arrow-left {
  -webkit-animation: mover-right 1.5s infinite alternate;
  animation: mover-right 1.5s infinite alternate;
}

#arrow-right {
  -webkit-animation: mover-left 1.5s infinite alternate;
  animation: mover-left 1.5s infinite alternate;
}

@-webkit-keyframes mover-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

@keyframes mover-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

@-webkit-keyframes mover-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(20px);
  }
}

@keyframes mover-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(20px);
  }
}

@-webkit-keyframes mover-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(20px);
  }
}

@keyframes mover-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(20px);
  }
}

@-webkit-keyframes mover-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-20px);
  }
}

@keyframes mover-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-20px);
  }
}
</style>
