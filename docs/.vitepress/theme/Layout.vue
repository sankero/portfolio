<template>
  <header-bar v-model:tagFilter="tagFilter"  v-model:about="about" />

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

  <!-- debug -->
  <div class="debug">
    <div>showModal: {{showModal}}</div>
    <div @click="sortChange">sort.key: {{sort.key}}</div>
    <div @click="ascChenge">sort.asc: {{sort.asc}}</div>
    <div>tagFilter: {{tagFilter}}</div>
    <div @click="about = !about">about: {{about}}</div>
  </div>
</template>

<script lang="ts">
// Page
import about from './About.vue'
// Component
import diagonal from '../components/Diagonal.vue'
import headerBar from '../components/HeaderBar.vue'
import modal from '../components/modal.vue'
import { computed, reactive, ref } from 'vue'
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
    // ソート機能
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

.modal-leave-active {
  transition: opacity 0.2s ease-in;
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