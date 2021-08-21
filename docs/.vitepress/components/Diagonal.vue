<template>
  <div class="diagonal">
    <template v-for="(item, i) in value" :key="i">
      <card v-if="item" :value="item" />
    </template> 
  </div>
</template>

<script lang="ts">
import card from '../components/Card.vue'

export default {
  components: {
    card
  },
  props: {
    value: Array
  }
}
</script>

<style lang="stylus">
// カード配置の調整
$diagonalWidth = 80vw
$diagonalWidthMobile = 100vh
$diagonalCol = 5
$diagonalColMobile = 4
$diagonalCardMargin = 1vw
$diagonalCardMarginMobile = 2vw
$diagonalCardWidth = (($diagonalWidth / $diagonalCol) - $diagonalCardMargin * 2)
$diagonalCardWidthMobile = (($diagonalWidthMobile / $diagonalColMobile) - $diagonalCardMarginMobile * 2)
$diagonalCardBlank = $diagonalWidth / $diagonalCol
$diagonalCardBlankMobile = $diagonalWidthMobile / $diagonalColMobile

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
.card {
  color: #FFF;
  text-shadow: 1px 1px 1px #555;
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  /* Glassmorphism */
  background-color: rgba(255,255,255,0.1);
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-size: cover;
  transition-duration: 0.3s;
  background-blend-mode:lighten;
  box-shadow: #BBB 6px 6px 2px;
  cursor: pointer;
  overflow: hidden;
  // Tablet
  flex-basis: $diagonalCardWidthMobile;
  height: ($diagonalCardWidthMobile * 0.56);
  margin: 1.5vw;
  // Mobile
  @media (max-aspect-ratio: 5 / 9) {
    // WARNING: 縦長端末だと列が乱れる(計算上の列数にならない)ため一旦強制的に22%に変更
    flex-basis: 22%;
  }
  // PC
  @media (min-aspect-ratio: 1 / 1) {
    margin: 2vw;
  }

  &-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 5px;
    font-size: 1vw;
    visibility: hidden;
    opacity: 0;
    transform: translateY(0em);
    transition-duration: 0.3s;
  }

  &-date {
    position: absolute;
    top: 0.5em;
    right: 1em;
    line-height: 1;
    background-color: rgba(0,0,0,0.3);
    padding: 0.1em 0.5em;
    border-radius: 6px;
    font-size: 0.8vw;
  }

  &:hover {
    transform: translate3d(-3px, -3px, 0px);
    box-shadow: #aaa 9px 9px 2px;
    .card-title {
      background: rgba(0,0,0,0.25);
      box-sizing: border-box;
      visibility: visible;
      // transform: translateY(4.5em);
      text-shadow: #333 2px 2px 2px;
      opacity: 1;
    }
  }

  &:active {
    transform: translate3d(3px, 3px, 0px);
    box-shadow: #bbb 3px 3px 2px, #FFA 3px 3px 20px;
    .card-title {
      visibility: visible;
    }
  }
}
// Mobile
@media (max-aspect-ratio: 1 / 1) {
  .card {
    // 1 line
    &:nth-child(2) { margin-right: ($diagonalCardBlankMobile * 2);}
    // 2 line
    &:nth-child(3) { margin-left: ($diagonalCardBlankMobile * 0.3);}
    &:nth-child(4) { margin-right: ($diagonalCardBlankMobile * 1.7);}
    // 3 line
    &:nth-child(5) { margin-left: ($diagonalCardBlank * 0.25);}
    &:nth-child(7) { margin-right: ($diagonalCardBlank * 0.75);}
    // 4 line
    &:nth-child(8) { margin-left: ($diagonalCardBlank * 0.75);}
    &:nth-child(10) { margin-right: ($diagonalCardBlank * 0.25);}
    // 5 line
    &:nth-child(11) { margin-left: ($diagonalCardBlank * 0.5);}
    &:nth-child(13) { margin-right: ($diagonalCardBlank * 0.5);}
    // 6 line
    // &:nth-child(14) { margin-left: ($diagonalCardBlank * 0.5);}
    // &:nth-child(17) { margin-right: ($diagonalCardBlank * 0.5);}
    // 7 line
    &:nth-child(18) { margin-left: ($diagonalCardBlank * 0.75);}
  }
}
// PC
@media (min-aspect-ratio: 1 / 1) {
  .card {
    flex-basis: $diagonalCardWidth;
    height: ($diagonalCardWidth * 0.56);
    margin: 0.8vw;
    // 1 line
    &:nth-child(3) { margin-right: ($diagonalCardBlank * 2);}
    // 2 line
    &:nth-child(4) { margin-left: ($diagonalCardBlank * 0.5);}
    &:nth-child(6) { margin-right: ($diagonalCardBlank * 1.5);}
    // 3 line
    &:nth-child(7) { margin-left: ($diagonalCardBlank * 0.25);}
    &:nth-child(10) { margin-right: ($diagonalCardBlank * 0.75);}
    // 4 line
    &:nth-child(11) { margin-left: ($diagonalCardBlank * 0.75);}
    &:nth-child(14) { margin-right: ($diagonalCardBlank * 0.25);}
    // 5 line
    &:nth-child(15) { margin-left: ($diagonalCardBlank * 0.5);}
    &:nth-child(18) { margin-right: ($diagonalCardBlank * 0.5);}
    // 6 line
    &:nth-child(19) { margin-left: ($diagonalCardBlank * 0.75);}
    &:nth-child(22) { margin-right: ($diagonalCardBlank * 0.25);}
    // 7 line
    &:nth-child(23) { margin-left: ($diagonalCardBlank * 0.5);}
  }
}
</style>
