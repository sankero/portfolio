<template>
  <div class="modal">
    <div class="modal-bg" @click="onClose" />
    <article class="modal-innr">
      <slot />
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibility: true
    }
  },
  methods: {
    onClose() {
      window.location.href = '/'
    }
  }
}
</script>

<style lang="scss">
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    &-bg {
      background: rgba(0,0,0,0.8);
      width: 100%;
      height: 100%;
      position: absolute;
    }
    &-innr {
      background: rgba(255,255,255,0.9);
      width: 100%;
      min-width: 800px;
      max-width: 1200px;
      min-height: 420px;
      padding: 20px 40px;
      box-sizing: border-box;
      z-index: 1;
    }
  }
</style>