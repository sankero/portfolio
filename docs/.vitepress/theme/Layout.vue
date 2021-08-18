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