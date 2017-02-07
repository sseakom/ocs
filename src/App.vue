<template lang="jade">
    transition(name="slide-fade", mode="out-in")
        router-view
</template>

<style lang="less">
.slide-fade-enter-active {
    transition: all .3s ease;
}
.slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
    opacity: 0;
}


.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: translateX(400px);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes bounce-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-400px);
  }
}
</style>
