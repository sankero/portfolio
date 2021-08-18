<template>
  <h1 class="title">taga</h1>
  <!-- works -->
  <section class="container">
    <div class="diagonal">
      <a
        v-for="post in $site.customData.workList"
        :key="post.href"
        class="card"
        :href="post.href"
        @click="showWorkPost"
      >
        <h3 class="card-title">{{post.data.title}}</h3>
        <time class="card-date">{{post.data.date}}</time>
      </a>
    </div>
  </section>
  <modal v-if="showModal" :handleClose="() => showModal = false">
    <Content />
  </modal>
  <pre>
    showModal: {{showModal}}
  </pre>
</template>

<script lang="ts">
import modal from '../components/modal.vue'
import { ref } from 'vue'

export default {
  components: {
    modal
  },
  setup () {
    // data
    const showModal = ref(window.location.pathname !== '/')

    const showWorkPost = () => {
      showModal.value = true
    }

    return {
      showModal,
      showWorkPost
    }
  }
}
</script>

<style lang="scss">
body {
  background: #e0e0e0;
}
.title {
  position: fixed;
  top: 20%;
  left: 60px;
  font-size: 140px;
  padding: 0;
  margin: 0;
}
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
}
.diagonal {
  display: flex;
  flex-wrap: wrap;
  max-width: 600px;
  transform-origin: center left;
  transform: skew(-35deg, 20deg);
  list-style: none;
}
.card {
  color: #333;
  flex-basis: 160px;
  flex-shrink: 0;
  flex-grow: 0;
  width: 160px;
  height: 120px;
  margin: 8px;
  padding: 5px 15px;
  box-sizing: border-box;
  position: relative;
  /* Glassmorphism */
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: #666 1px 1px 3px;
  transition-duration: 0.5s;
  cursor: pointer;
  &-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 5px;
    font-size: 14px;
  }
  &-date {
    position: absolute;
    top: 0;
    right: 0;
  }
  &:nth-child(4) { margin-left: 80px;}
  &:nth-child(7) { margin-left: 40px;}
  &:nth-child(10) { margin-left: -20px;}
  &:hover {
    background: rgba(255,255,255,0.4);
    transform: translate3d(-6px, -6px, 0px);
    box-shadow: rgb(0 0 0 / 40%) 6px 6px 10px;
  }
}

</style>