<template>
  <header class="header" :class="{'portrait': portrait}">
    <div class="header-innr">
      <h1 class="title">taga.works</h1>
      <div class="header-icons">
        <!-- <filterIcon :class="{'enable': tagFilter?.length, 'on': about}" @click="$emit('update:about', !about)" /> -->
        <profileIcon :class="{'on': about}" @click="$emit('update:about', !about)" />
        <menuIcon />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import filterIcon from '../components/icon/filter.vue'
import profileIcon from '../components/icon/profile.vue'
import menuIcon from '../components/icon/menu.vue'
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  components: {
    filterIcon,
    profileIcon,
    menuIcon
  },
  props: {
    tagFilter: Array,
    about: Boolean
  },
  setup (props, context) {

    /**
     * タグリスト
     */
    const tagList = [
      {
        title: 'Programming language',
        tags: ['Javascript', 'PHP']
      },
      {
        title: 'Framework',
        tags: ['Vue.js', 'Nuxt.js', 'React', 'Laravel', 'SCSS', 'stylus', 'ElementUI', 'Vuetify', 'Bootstrap']
      },
      {
        title: 'others',
        tags: ['WordPress', 'docker', 'オリジナルテーマ', 'jQuery']
      }
    ]

    /**
     * ポートレート判定
     * アスペクト比で画面の縦横を判別します。
     */
    const portrait = ref(true)
    onMounted(() => {
      window.addEventListener('resize', calculateWindowWidth)
      calculateWindowWidth()
    })
    onUnmounted(() => {
      window.removeEventListener('resize', calculateWindowWidth)
    })
    const calculateWindowWidth = () => {
      portrait.value = window.innerWidth > window.innerHeight
    }
    return {
      portrait,
      tagList
    }
  }
}
</script>

<style lang="stylus">
.header {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1em;
  box-sizing: border-box;
  z-index: 2;
  &-icons {
    svg {
      width: 1.5em;
      height: 1.5em;
      padding: 0.2em;
      margin-left: 0.5em;
      cursor: pointer;
      position: relative;
      background-color: #E6E6E6;
      box-shadow: 6px 6px 6px #bbb, -3px -3px 6px #f3f3f3;
      border-radius: 12px;
      padding: 6px;
      &:hover {
        background: linear-gradient(145deg, #cfcfcf, #f6f6f6);
        box-shadow:  3px 3px 4px #c4c4c4, -3px -3px 4px #ffffff;
      }
      &:active,
      &.on {
        background-color: #c7c7c7;
        box-shadow: inset 3px 3px 4px #999999, inset -3px -3px 4px #cfcfcf;
      }
      &.enable {
        fill: #F00;
      }
    }
  }
  @media (max-aspect-ratio: 1 / 1) {
    width: 100%;
    background: linear-gradient(0deg, rgba(224,224,224,0) 0%, rgba(224,224,224,0.4) 25%, rgba(224,224,224,0.6) 100%);
    backdrop-filter: blur(2px);
    &-innr {
      display: flex;
      justify-content: space-between;
    }
    .tag-filter {
      display: none;
    }
  }
  @media (min-aspect-ratio: 1 / 1) {
    padding: 3em 0 0 3em ;
    &-icons {
      display: none;
    }
  }
}
.title {
  font-size: 6vw;
  padding: 0;
  margin: 0;
  line-height: 1;
}
</style>