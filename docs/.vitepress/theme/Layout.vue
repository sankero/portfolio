<template>
  <h1>taga</h1>
  <!-- works -->
  <ul>
    <li v-for="post in $site.customData.workList" :key="post.href">
      <a :href="post.href" @click="showWorkPost">
        <h3>{{post.data.title}}</h3>
        <span>{{post.data.category}}</span>
        <time>{{post.data.date}}</time>
      </a>
    </li>
  </ul>
  <modal v-if="showModal">
    <Content />
  </modal>
</template>

<script>
import modal from '../components/modal.vue'

export default {
  components: {
    modal
  },
  data() {
    return {
      showModal: true
    }
  },
  created() {
    this.showModal = window.location.pathname !== '/'
  },
  methods: {
    showWorkPost() {
      this.showModal = true
    } 
  }
}
</script>