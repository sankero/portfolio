<template>
  <h1 class="title">taga.works</h1>
  <!-- works -->
  <section class="container">
    <div class="diagonal">
      <template v-for="(n, i) in 25" :key="n">
        <a v-if="workList[i]" class="card" :href="workList[i].href" @click="showWorkPost" :style="workList[i].thumbnail">
          <h3 class="card-title">{{workList[i].title}}</h3>
          <time class="card-date">{{workList[i].date}}</time>
        </a>
        <div v-else class="card card-blank"></div>
      </template>
    </div>
  </section>
  <transition name="modal">
    <modal v-if="showModal" :showFlg="showModal" />
  </transition>
  <pre class="debug">
    showModal: {{showModal}}
  </pre>
</template>

<script lang="ts">
import modal from '../components/modal.vue'
import { ref, computed, watch } from 'vue'
import { useSiteData, useRoute } from 'vitepress'
import dayjs from 'dayjs';

export default {
  components: {
    modal
  },
  setup (props, context) {
    // モーダル表示（仕事ページはモーダルで表示する）
    const showModal = ref(window.location.pathname !== '/')

    // 仕事一覧
    const workList = useSiteData().value.customData.workList.map(obj => {
      return {
        title: obj.data.title,
        date: dayjs(obj.data.date).format('YYYY.MM'),
        href: obj.href,
        thumbnail: `background-image: url(/works/img/${obj.key}.webp);`
      }
    })

    // 仕事ページ表示
    const showWorkPost = () => {
      showModal.value = true
    }

    // ページ遷移を監視
    const route = useRoute()
    watch(() => route.path,
      () => {
        console.log(route)
        showModal.value = !(route.path === '/')
      }
    )

    return {
      showModal,
      workList,
      showWorkPost
    }
  }
}
</script>

<style lang="stylus">

body {
  background: #e0e0e0;
  margin: 0;
  font-family: "Helvetica Neue", "Helvetica", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Arial", "Yu Gothic", "Meiryo", sans-serif;
  font-weight: 200;
}
.title {
  font-family: 'Kanit', sans-serif;
  position: fixed;
  top: 1em;
  left: 1em;
  font-size: 7vw;
  padding: 0;
  margin: 0;
  line-height: 1;
}
.container {
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  overflow: hidden;
}
// カード配置の調整
$diagonalWidth = 80vw
$diagonalCol = 5
$diagonalCardMargin = 1vw
$diagonalCardWidth = (($diagonalWidth / $diagonalCol) - $diagonalCardMargin * 2)
$diagonalCardBlank = $diagonalWidth / $diagonalCol

.diagonal {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: $diagonalWidth;
  transform-origin: center right;
  transform: skew(-35deg, 20deg) translate(40%, 20%);
  transition-delay: 1s;
  list-style: none;
}
.card {
  color: #FFF;
  text-shadow: 1px 1px 6px #333;
  flex-basis: $diagonalCardWidth;
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
  height: ($diagonalCardWidth * 0.56);
  margin: 0.8vw;
  padding: 5px 15px;
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
  cursor: pointer;
  // box-shadow: #666 1px 1px 3px;
  box-shadow: #BBB 6px 6px 2px;
  // box-shadow: rgb(0 0 0 / 40%) 6px 6px 10px;
  &-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 5px;
    font-size: 1vw;
    visibility: hidden;
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
  &:hover {
    /*
    background-color: rgba(255,255,255,0.4);
    transform: translate3d(-6px, -6px, 0px);
    box-shadow: rgb(0 0 0 / 40%) 6px 6px 10px;
    */
    transform: translate3d(-3px, -3px, 0px);
    box-shadow: #aaa 9px 9px 2px;
    .card-title {
      visibility: visible;
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

.modal-leave-active {
  transition: opacity 1s ease-in;
}
.modal-leave-to {
  opacity: 0;
}

// 確認用
.debug {
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 8px;
  line-height: 0;
  background: rgba(0, 0, 0, 0.2);
  padding: 1em;
}

</style>