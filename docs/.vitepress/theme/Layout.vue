<template>
  <header class="header">
    <h1 class="title">taga.works</h1>
    <nav class="nav">
      <!-- TODO: ロジック化 -->
      <h3>Programming language</h3>
      <ul>
        <li>
          <label>
            <input type="checkbox" value="PHP" v-model="tagFilter">
            PHP
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="Javascript" v-model="tagFilter">
            Javascript
          </label>
        </li>
      </ul>
      <h3>Framework</h3>
      <ul>
        <li>
          <label>
            <input type="checkbox" value="Nuxt.js" v-model="tagFilter">
            Nuxt.js
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="Vue.js" v-model="tagFilter">
            Vue.js
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="React" v-model="tagFilter">
            React
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="WordPress" v-model="tagFilter">
            WordPress
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="Laravel" v-model="tagFilter">
            Laravel
          </label>
        </li>
      </ul>
    </nav>
  </header>
  <!-- works -->
  <section class="container">
    <div class="diagonal">
      <template v-for="(item, i) in workList" :key="i">
        <a v-if="item" class="card" :href="item.href" :style="item.thumbnail">
          <h3 class="card-title">{{item.title}}</h3>
          <time class="card-date">{{item.date}}</time>
        </a>
      </template> 
    </div>
  </section>
  <transition name="modal">
    <modal v-if="showModal" :showFlg="showModal" />
  </transition>
  <div class="debug">
    <div>showModal: {{showModal}}</div>
    <div @click="sortChange">sort.key: {{sort.key}}</div>
    <div @click="ascChenge">sort.asc: {{sort.asc}}</div>
    <div>tagFilter: {{tagFilter}}</div>
  </div>
</template>

<script lang="ts">
import modal from '../components/modal.vue'
import { computed, reactive, ref } from 'vue'
import { useSiteData, useRoute } from 'vitepress'
import dayjs from 'dayjs';

export default {
  components: {
    modal
  },
  setup (props, context) {
    // ソート機能
    const sort = reactive({
      key: 'date',
      asc: false
    })
    const tagFilter = ref([])

    /**
     * ソートキー変更
     */
    const sortChange = () => {
      sort.key = sort.key === 'date' ? 'title' : 'date'
    }
    /**
     * 昇順・降順変更
     */
    const ascChenge = () => {
      sort.asc = !sort.asc
    }

    /**
     * 制作物一覧
     */
    const tagFiltering = (tags) => {
      let flg = false
      tags.forEach(tag => {
        if (tagFilter.value.includes(tag)) flg = true
      })
      return flg
    }

    const maxItem = 25 // 表示する項目数
    const workList = computed(() => {
      return useSiteData().value.customData.workList.map(obj => {
        // フィルタ
        if (tagFilter.value?.length && !obj.data.tags?.length) return
        if (tagFilter.value?.length && obj.data.tags?.length && !tagFiltering(obj.data.tags)) return
        return {
          title: obj.data.shortTitle,
          date: dayjs(obj.data.date).format('YYYY.MM'),
          href: obj.href,
          thumbnail: `background-image: url(/works/img/${obj.key}.webp);`
        }
      }).sort((a, b) => {
        const ret = new Date(b[sort.key]).getTime() - new Date(a[sort.key]).getTime()
        return sort.asc ? ret : -ret
      }).splice(0, maxItem)
    })

    /**
     * モーダル表示
     */
    const route = useRoute()
    const showModal = computed(() => {
      return !(route.path === '/')
    })

    return {
      sort,
      tagFilter,
      showModal,
      workList,
      sortChange,
      ascChenge
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
.header {
  position: fixed;
  top: 3em;
  left: 3em;
}
.title {
  font-size: 6vw;
  padding: 0;
  margin: 0;
  line-height: 1;
}
.container {
  height: 100vh;
  overflow: hidden;
}
@media (min-aspect-ratio: 1 / 1) {
  .container {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
}

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
  // Mobile
  flex-basis: $diagonalCardWidthMobile;
  height: ($diagonalCardWidthMobile * 0.56);
  margin: 2vw;

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
    &:nth-child(11) { margin-left: ($diagonalCardBlank * 0.3);}
    &:nth-child(13) { margin-right: ($diagonalCardBlank * 0.7);}
    // 6 line
    &:nth-child(14) { margin-left: ($diagonalCardBlank * 0.5);}
    // &:nth-child(17) { margin-right: ($diagonalCardBlank * 0.5);}
    // 7 line
    // &:nth-child(18) { margin-left: ($diagonalCardBlank * 1);}
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
  line-height: 1;
  background: rgba(0, 0, 0, 0.2);
  padding: 1em;
}

</style>