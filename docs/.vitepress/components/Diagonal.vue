<template>
  <div class="diagonal">
    <template
      v-for="(item, i) in value"
      :key="i"
    >
      <card
        v-if="item && Object.keys(item).length"
        :value="item"
      />
    </template>
  </div>
</template>

<script lang="ts">
import card from './Card.vue'

export default {
  components: {
    card,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="stylus">
@import '../stylus/variable.styl'

.diagonal {
  display: flex;
  flex-wrap: wrap;
  transition-delay: 1s;
  // Mobile and Tablet
  // width: var(--windowHeight, $diagonalWidthMobile);
  width: $diagonalWidthMobile;
  transform-origin: center left;
  transform: skew(-35deg, 20deg) translate(5%, -5%);
}
// Tablet
@media (min-aspect-ratio: 2 / 3) {
  .diagonal {
    width: $diagonalWidthMobile;
    transform-origin: center left;
    transform: skew(-35deg, 20deg) translate(10%, -5%);
  }
}
// PC
@media (min-aspect-ratio: 1 / 1) {
  .diagonal {
    width: $diagonalWidth;
    transform-origin: center right;
    transform: skew(-35deg, 20deg) translate(40%, 20%);
  }
}
</style>
