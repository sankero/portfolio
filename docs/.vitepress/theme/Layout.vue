<template>
  <header-bar v-model:tagFilter="tagFilter"  v-model:about="about"  :portrait="portrait" />

  <!-- works -->
  <article class="container">
    <diagonal :value="workList" />
  </article>

  <!-- modal (content) -->
  <transition name="modal">
    <modal v-if="showModal" :showFlg="showModal" />
  </transition>

  <!-- about -->
  <transition name="about">
    <about v-if="about" v-model:tagFilter="tagFilter" @close="about = !about" />
  </transition>

  <footer class="footer">&copy; 2021 tagawa</footer>

</template>

<script lang="ts">
// Page
import about from './About.vue'
// Component
import diagonal from '../components/Diagonal.vue'
import headerBar from '../components/HeaderBar.vue'
import modal from '../components/modal.vue'
import { onMounted, onUnmounted, computed, reactive, ref } from 'vue'
import { useSiteData, useRoute } from 'vitepress'
import dayjs from 'dayjs';

export default {
  components: {
    about,
    diagonal,
    headerBar,
    modal
  },
  setup (props, context) {
    /**
     * イベント関連の処理
     */
    const portrait = ref(true)
    // ポートレート判定…アスペクト比で画面の縦横を判別
    const updateWindowsProperties = () => {
      portrait.value = window.innerWidth > window.innerHeight
      document.documentElement.style.setProperty('--windowHeight', `${window.innerHeight}px`)
    }
    // スクロールでaboutを表示・非表示
    const onwheelEvent = (event) => {
      if (showModal.value) return
      if (event.deltaY > 60) {
        about.value = true
      } else if(event.deltaY < -60) {
        about.value = false
      }
    }
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
     * ソート機能
     */
    const sort = reactive({
      key: 'date',
      asc: false
    })
    const tagFilter = ref([])

    const about = ref(false)

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
      about,
      portrait,
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
:root{
  --windowHeight: 100vh;
}
body {
  background: #e0e0e0;
  margin: 0;
  font-family: "Helvetica Neue", "Helvetica", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Arial", "Yu Gothic", "Meiryo", sans-serif;
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
</style>
