<template>
  <article class="about">
    <div
      class="about-close"
      @click="onClose"
    />
    <div class="about-innr">
      <header class="about-header">
        <h2>About Me</h2>
      </header>
      <div class="about-row">
        <section class="about-section">
          <picture class="about-profile-image">
            <img
              src="/img/profile.webp"
              alt="tagawa"
            >
          </picture>
          <h4>Hiroyuki Tagawa</h4>
          <div>
            <p>
              長崎県生まれ。<br>
              汎用系プログラマーを約2年経験後にIT業界を離れ、介護福祉士を取得し福祉業界に転職、数年のちにIT業界に出戻り。<br>
              フリーランス転向後の2017年以降はフロントエンジニアとして数々の案件に従事しました。<br>
              傍らサイト制作などのご依頼を別途請け負っております。
            </p>
          </div>
        </section>
        <section
          id="tag-filter"
          class="about-section"
        >
          <h3>Skill sheet</h3>
          <nav class="tag-filter">
            <ul>
              <li
                v-for="obj in tagList"
                :key="obj.title"
              >
                <h5 class="tag-filter-title">
                  {{ obj.title }}
                </h5>
                <ul class="tag-filter-group">
                  <li
                    v-for="tag in obj.tags"
                    :key="tag"
                  >
                    <label class="tag-filter-label">
                      <input
                        v-model="tagSelector"
                        type="checkbox"
                        :value="tag"
                        class="tag-filter-input"
                      >
                      <div class="tag-filter-text">{{ tag }}</div>
                    </label>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { computed } from 'vue'

export default {
  props: {
    tagFilter: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:tagFilter', 'close'],

  setup(props, context) {
    /**
     * タグリスト
     */
    const tagList = [
      {
        title: 'Programming language',
        tags: ['Javascript', 'PHP'],
      },
      {
        title: 'Framework',
        tags: ['Vue.js', 'Nuxt.js', 'React', 'Laravel', 'ElementUI', 'Vuetify', 'Bootstrap'],
      },
      {
        title: 'others',
        tags: ['WordPress', 'Docker', 'オリジナルテーマ', 'jQuery'],
      },
    ]

    /**
     * 選択中のタグ
     */
    const tagSelector = computed({
      get: () => props.tagFilter,
      set: (value) => {
        context.emit('update:tagFilter', value)
      },
    })

    /**
     * 閉じるボタン
     */
    const onClose = () => {
      context.emit('close')
    }

    return {
      onClose,
      tagList,
      tagSelector,
    }
  },
}
</script>

<style lang="stylus">
.about {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  &-close {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  &-innr {
    margin: auto;
    padding: 5em 1em 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 82%, rgba(0,0,0,0) 100%);
    backdrop-filter: blur(2px);
    position: absolute;
    bottom: 0;
    left: 0;
    color: #FFF;
    width: 100%;
    box-sizing: border-box;
    z-index: 8;
    overflow-y: scroll;
    // Mobile
    @media (max-aspect-ratio: 1 / 1) {
      height: 100%;
    }
    // PC
    @media (min-aspect-ratio: 1 / 1) {
      padding: 3em 3em 0;
      overflow: hidden;
    }
  }
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-row {
    max-width: 1280px;
    width: 96%;
    @media (min-aspect-ratio: 1 / 1) {
      display: flex;
      margin: 1em auto 0;
      justify-content: space-around;
    }
  }
  &-section {
    flex-basis: 50%;
    flex-grow: 0;
    flex-shrink: 0;
    h3 {
      margin-top: 3em;
      font-weight: 200;
      letter-spacing: 0.2em;
      @media (min-aspect-ratio: 1 / 1) {
        margin: 0;
      }
    }
  }
  &-profile-image {
    display: block;
    max-width 240px;
    img {
      width: 100%;
    }
  }
  /** 非表示 */
  &.about-enter-from,
  &.about-leave-to {
    opacity: 0;
    transform: translateY(100%) translateZ(1px);
    transition-duration: 0.3s;
    transition-timing-function: ease-out;

  }
  /** 表示 */
  &.about-leave-from,
  &.about-enter-to {
    opacity: 1;
    transform: translateY(0%) translateZ(1px);
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }
}
.tag-filter {
  margin-top: 1em;
  line-height: 1;
  font-size: 5vw;
  @media (max-aspect-ratio: 1 / 1) {
    padding-bottom: 5em;
  }
  @media (min-aspect-ratio: 1 / 1) {
    font-size: 1.2vw;
  }
  @media screen and (max-width:1000px) {
    font-size: 14px;
  }
  ul {
    list-style: none;
    padding-left: 1em;
  }
  &-group {
    display: flex;
    padding-left: 1em;
    flex-wrap: wrap;
  }
  &-title {
    margin: 1em 0 0.5em;
    font-weight: 200;
    color: #CCC;
  }
  &-input {
    display: none;
    &:checked {
      ~.tag-filter-text {
        color: #36a928;
        background-color: #4E4E4E;
        box-shadow: inset 3px 3px 4px #424242, inset -3px -3px 4px #5a5a5a;
      }
    }
  }
  &-text {
    padding: 0.2em 0.5em;
    margin: 0.4em;
    border-radius: 25px;
    background-color: #4E4E4E;
    box-shadow: 3px 3px 4px #424242, -3px -3px 4px #5a5a5a;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #CCC;
    user-select: none;
    cursor: pointer;
    &:hover {
      background-color: #4E4E4E;
      box-shadow: inset 3px 3px 4px #424242, -3px -3px 4px #5a5a5a;
    }
    &:active {
      background-color: #4E4E4E;
      box-shadow: inset 3px 3px 4px #424242, inset -3px -3px 4px #5a5a5a;
    }
  }
}
</style>
