<template>
  <header-bar
    v-model:tagFilter="tagFilter"
    :portrait="portrait"
  />

  <!-- works -->
  <article class="container">
    <diagonal :value="workList" />
  </article>

  <!-- modal (content) -->
  <transition name="modal">
    <workModal
      v-if="worksShowFlg"
    />
  </transition>

  <!-- about -->
  <transition name="about">
    <about
      v-if="aboutShowFlg"
      v-model:tagFilter="tagFilter"
      @close="hideAbout()"
    />
  </transition>

  <footer class="footer">
    &copy; 2021 tagawa
  </footer>

  <div class="debug">
    <div @click="switchAbout()">aboutShowFlg: {{ aboutShowFlg }}</div>
    <div>worksShowFlg: {{ worksShowFlg }}</div>
    <div @click="sortSwitchWorks()">worksQuery: {{ worksQuery }}</div>
  </div>

  <div class="bg-ani-group">
    <div
      v-for="i in 8"
      :key="i"
      class="bg-ani-group-item"
    />
    <!-- <div class="bg-point-stalker"></div> -->
  </div>
</template>

<script lang="ts">
// Page
import {
  onMounted, onUnmounted, computed, reactive, ref, inject,
} from 'vue'
import { useData } from 'vitepress'
import dayjs from 'dayjs'
import { store, storeKey } from '../store/store.ts'
import about from './About.vue'
// Component
import diagonal from '../components/Diagonal.vue'
import headerBar from '../components/HeaderBar.vue'
import workModal from '../components/WorkModal.vue'

export default {
  components: {
    about,
    diagonal,
    headerBar,
    workModal,
  },
  setup() {
    const {
      aboutShowFlg,
      showAbout,
      hideAbout,
      switchAbout,
      worksShowFlg,
      worksQuery,
      sortSwitchWorks } = inject(storeKey) as store
    const { site } = useData() // サイトデータ
    const portrait = ref(true) // 画面向き
    const tagFilter = ref([]) // タグフィルター指定
    // ソートパラメータ
    const sort = reactive({
      key: 'date',
      asc: false,
    })

    /**
     * ウィンドウリサイズ時の処理
     */
    const updateWindowsProperties = () => {
      portrait.value = window.innerWidth > window.innerHeight
      document.documentElement.style.setProperty('--windowHeight', `${window.innerHeight}px`)
    }

    /**
     * aboutを表示・非表示
     */
    const onwheelEvent = (event) => {
      if (worksShowFlg.value) return
      if (event.deltaY > 60) {
        showAbout()
      } else if (event.deltaY < -60) {
        hideAbout()
      }
    }

    /**
     * マウススクロールイベント
     */
    onMounted(() => {
      window.addEventListener('resize', updateWindowsProperties)
      window.addEventListener('wheel', onwheelEvent)
      updateWindowsProperties()
    })
    onUnmounted(() => {
      window.removeEventListener('resize', updateWindowsProperties)
      window.removeEventListener('wheel', onwheelEvent)
    })

    /**
     * タグ選択
     */
    const tagFiltering = (tags) => {
      let flg = false
      tags.forEach((tag) => {
        if (tagFilter.value.includes(tag)) flg = true
      })
      return flg
    }

    /**
     * ワークリスト
     */
    const maxItem = 25 // 表示する項目数
    const workList = computed(() => {
      // フィルターしてリスト作成
      let _workList = site.value.customData.workList.map((obj) => {
        const visible = !(tagFilter.value?.length && (!obj.data.tags?.length || (obj.data.tags?.length  && !tagFiltering(obj.data.tags))))
        return {
          title: obj.data.shortTitle,
          date: dayjs(obj.data.date).format('YYYY.MM'),
          href: obj.href,
          thumbnail: `background-image: url(/works/img/${obj.key}.webp);`,
          prev: '',
          next: '',
          visible
        }
      }).sort((a, b) => {
        const ret = new Date(b[worksQuery.value.key]).getTime() - new Date(a[worksQuery.value.key]).getTime()
        return worksQuery.value.asc ? ret : -ret
      }).splice(0, maxItem)

      // 左右ページャー用のリンクを挿入
      const updateNextPrevLink = (work, key) => {
        if (!work || !work.visible) return
        if (_href) work[key] = _href
        _href = work.href
      }
      let _href = ''
      _workList.reverse().forEach(work => updateNextPrevLink(work, 'next'))
      _href = ''
      _workList.reverse().forEach(work => updateNextPrevLink(work, 'prev'))

      console.log(_workList)

      return _workList
    })

    return {
      // store
      aboutShowFlg,
      showAbout,
      hideAbout,
      switchAbout,
      worksShowFlg,
      worksQuery,
      sortSwitchWorks,
      // this
      portrait,
      tagFilter,
      workList,
    }
  },
}
</script>

<style lang="stylus">
:root{
  --windowHeight: 100vh;
  --cursorX: -100px;
  --cursorY: -100px;
}
body {
  // background: #e0e0e0;
  margin: 0;
  font-family:
    "Helvetica Neue",
    "Helvetica",
    "Hiragino Sans",
    "Hiragino Kaku Gothic ProN",
    "Arial",
    "Yu Gothic",
    "Meiryo",
    sans-serif;
  font-weight: 200;
}
.container {
  height: var(--windowHeight, 100vh);
  overflow: hidden;
}
@media (min-aspect-ratio: 1 / 1) {
  .container {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
}

.modal-leave-active {
  transition: opacity 0.2s ease-in;
}
.modal-leave-to {
  opacity: 0;
}

.footer{
  position: absolute;
  bottom: 1em;
  right: 1em;
  font-size: 0.7em;
}

// background animation
body {
  background-color: #d8d8d8;
  background-size: cover;
  background-image: url('/img/bg.webp');
}
.bg-ani-group {
  position: fixed;
  z-index: -10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.bg-point-stalker {
  position: absolute;
  width: 10vw;
  height: 10vw;
  margin: -5vw -5vw;
  border-radius: 50%;
  background: rgba(216,216,216,1);
  box-shadow: 0 0 5vw #929292, inset 1vw 2vw 4vw #a4a4a5;
  transform: translate(var(--cursorX), var(--cursorY));
  opacity: 0.2;
  z-index: -4;
}
.bg-ani-group-item {
  color: rgba(255,255,255,0.5);
  width: 40vmin;
  height: 40vmin;
  border-radius: 40vmin;
  backface-visibility: hidden;
  position: absolute;
  animation: bganimate;
  animation-duration: 40;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  box-shadow: 50vmin 0 10vmin currentColor;
  z-index: -5;
}
.bg-ani-group-item:nth-child(0) {
    top: 26%;
    left: 7%;
    animation-duration: 17s;
    animation-delay: -11s;
    transform-origin: 18vw -7vh;
}
.bg-ani-group-item:nth-child(1) {
    top: 51%;
    left: 53%;
    animation-duration: 46s;
    animation-delay: -3s;
    transform-origin: 24vw -7vh;
 }
.bg-ani-group-item:nth-child(2) {
    top: 49%;
    left: 15%;
    animation-duration: 97s;
    animation-delay: -2s;
    transform-origin: 13vw 2vh;
 }
.bg-ani-group-item:nth-child(3) {
    top: 88%;
    left: 7%;
    animation-duration: 98s;
    animation-delay: -81s;
    transform-origin: -2vw 12vh;
 }
.bg-ani-group-item:nth-child(4) {
    top: 52%;
    left: 24%;
    animation-duration: 24s;
    animation-delay: -70s;
    transform-origin: 9vw 14vh;
 }
.bg-ani-group-item:nth-child(5) {
    top: 81%;
    left: 60%;
    animation-duration: 14s;
    animation-delay: -22s;
    transform-origin: 11vw 20vh;
 }
.bg-ani-group-item:nth-child(6) {
    top: 44%;
    left: 89%;
    animation-duration: 105s;
    animation-delay: -80s;
    transform-origin: -13vw 25vh;
 }
.bg-ani-group-item:nth-child(7) {
    top: 44%;
    left: 31%;
    animation-duration: 24s;
    animation-delay: -23s;
    transform-origin: 4vw 2vh;
 }
.bg-ani-group-item:nth-child(8) {
    top: 93%;
    left: 42%;
    animation-duration: 61s;
    animation-delay: -57s;
    transform-origin: -23vw -6vh;
 }
.bg-ani-group-item:nth-child(9) {
    top: 33%;
    left: 98%;
    animation-duration: 48s;
    animation-delay: -90s;
    transform-origin: -23vw -23vh;
 }
@keyframes bganimate {
    100%{
        transform: translate3d(0, 0, 1px) rotate(360deg);
    }
}
.debug {
  // display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.7);
  color: #FFF;
}
</style>
