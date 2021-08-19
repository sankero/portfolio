<template>
  <a class="card" :href="value.href" :style="value.thumbnail">
    <h3 class="card-title">{{value.title}}</h3>
    <time class="card-date">{{value.date}}</time>
  </a>
</template>

<script lang="ts">
export default {
  props: {
    value: Object
  }
}
</script>

<style lang="stylus">
</style>
