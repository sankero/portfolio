<template>
  <header class="header" :class="{'portrait': portrait}">
    <div class="header-innr">
      <h1 class="title">taga.works</h1>
      <div class="header-icons">
        <filterIcon :class="{'enable': tagFilter?.length, 'on': filterToggle}" @click="filterToggle = !filterToggle" />
        <menuIcon />
      </div>
    </div>
    <nav class="tag-filter" :class="{'open': filterToggle}">
      <ul>
        <li v-for="obj in tagList" :key="obj.title">
          <h5 class="tag-filter-title">{{obj.title}}</h5>
          <ul class="tag-filter-group">
            <li v-for="tag in obj.tags" :key="tag">
              <label class="tag-filter-label">
                <input type="checkbox" :value="tag" v-model="tagSelector" class="tag-filter-input">
                <div class="tag-filter-text">{{tag}}</div>
              </label>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import filterIcon from '../components/icon/filter.vue'
import menuIcon from '../components/icon/menu.vue'
import { computed, ref, onMounted, onUnmounted } from 'vue'

export default {
  components: {
    filterIcon,
    menuIcon
  },
  props: {
    tagFilter: Array
  },
  setup (props, context) {
    /**
     * トグルボタン
     */
    const filterToggle = ref(false)

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
     * 選択中のタグ
     */
    const tagSelector = computed({
      get: () => props.tagFilter,
      set: (value) => {
        context.emit('update:tagFilter', value)
      }
    })

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
      filterToggle,
      portrait,
      tagList,
      tagSelector
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
.tag-filter {
  margin-top: 3vw;
  line-height: 1;
  font-size: 5vw;
  display: none;
  @media (max-aspect-ratio: 1 / 1) {
    padding-bottom: 5em;
  }
  @media (min-aspect-ratio: 1 / 1) {
    display: block;
    font-size: 1.2vw;
  }
  &.open {
    display: block;
  }
  ul {
    list-style: none;
    padding-left: 1em;
    @media (min-aspect-ratio: 1 / 1) {
      max-width: 30vw;
    }
  }
  &-group {
    display: flex;
    padding-left: 1em;
    flex-wrap: wrap;
  }
  &-title {
    margin: 1em 0 0.5em;
    font-weight: 200;
    color: #666;
  }
  &-input {
    display: none;
    &:checked {
      ~.tag-filter-text {
        color: #36a928;
        background-color: #c7c7c7;
        box-shadow: inset 3px 3px 4px #999999, inset -3px -3px 4px #cfcfcf;
      }
    }
  }
  &-text {
    padding: 0.2em 0.5em;
    margin: 0.4em;
    border-radius: 25px;
    background-color: #E6E6E6;
    box-shadow: 6px 6px 6px #BBB, -3px -3px 6px #F3F3F3;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #000;
    user-select: none;
    cursor: pointer;
    &:hover {
      background: linear-gradient(145deg, #cfcfcf, #f6f6f6);
      box-shadow:  3px 3px 4px #c4c4c4, -3px -3px 4px #ffffff;
    }
    &:active {
      background-color: #c7c7c7;
      box-shadow: inset 3px 3px 4px #999999, inset -3px -3px 4px #cfcfcf;
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