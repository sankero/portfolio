<template>
  <div class="modal">
    <div class="modal-bg" @click="onClose" />
    <article class="modal-innr">
      <slot />
    </article>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    handleClose: Function
  },
  setup(props) {
    const onClose = () => {
      props.handleClose()
    }
    return {
      onClose
    }
  }
}
</script>

<style lang="scss">
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.7);
    overflow: scroll;
    font-size: 20px;
    &-bg {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    &-innr {
      background: rgba(255,255,255,0.9);
      width: 90%;
      min-width: 800px;
      max-width: 960px;
      min-height: 420px;
      margin: 5vh auto;
      padding: 20px 40px;
      box-sizing: border-box;
      z-index: 1;
      border-radius: 30px;
      box-shadow: 30px 30px 20px #222;

      /* markdown style */
      .header-anchor {
        display: none;
      }
      h1 {
        position: relative;
        padding: 0.25em 0;
      }
      h1:after {
        content: "";
        display: block;
        height: 4px;
        background: -webkit-linear-gradient(to right, rgb(230, 90, 90), transparent);
        background: linear-gradient(to right, rgb(230, 90, 90), transparent);
      }
      img {
        max-width: 100%;
      }
    }
  }
</style>