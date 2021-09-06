<template>
  <div class="modal">
    <a
      class="modal-bg"
      href="/"
    />
    <nav class="modal-nav">
      <a
        v-if="pageLink.prev"
        :href="pageLink.prev"
        @click="paging('prev')"
        class="modal-nav-prev">

        <arrowDownIcon class="arrow" />
      </a>
      <a
        v-if="pageLink.next"
        :href="pageLink.next"
        @click="paging('next')"
        class="modal-nav-next">

        <arrowDownIcon class="arrow" />
      </a>
    </nav>
    <transition name="modal-transition" @after-leave="showFlg = true">
      <article
        v-if="showFlg"
        class="modal-innr md"
        :class="transitionClass"
      >
        <header class="md-header">
          <h1 class="md-title">
            {{ page.title }}
          </h1>
          <ul
            v-if="page.frontmatter.tags"
            class="md-tags"
          >
            <li
              v-for="name in page.frontmatter.tags"
              :key="name"
            >
              {{ name }}
            </li>
          </ul>
        </header>
        <div
          v-if="page.frontmatter.key"
          class="md-mv"
        >
          <img
            class="md-mv-img"
            :src="`/works/img/${page.frontmatter.key}_m.webp`"
          >
        </div>
        <main class="md-content">
          <Content />
        </main>
        <footer class="md-footer">
          <div v-if="page.frontmatter.package">
            <h2 class="md-footer-headline">
              Package
            </h2>
            <ul class="md-tags">
              <li
                v-for="name in page.frontmatter.package"
                :key="name"
                class="neumo-btn"
              >
                {{ name }}
              </li>
            </ul>
          </div>
          <a
            class="modal-close"
            href="/"
          >Close</a>
        </footer>
      </article>
    </transition>
  </div>
</template>

<script lang="ts">
import { ref, inject, onMounted, nextTick } from 'vue'
import { store, storeKey } from '../store/store.ts'
import { useRouter, useData } from 'vitepress'
import arrowDownIcon from './icon/arrowDown.vue'

export default {
  components: {
    arrowDownIcon,
  },
  props: {
    pageLink: {
      type: Object,
      default() {
        return {
          next: '',
          prev: '',
        }
      },
    },
  },
  setup() {
    const { worksShowFlg } = inject(storeKey) as store
    const { page } = useData()
    const transitionClass = ref('')
    const showFlg = ref(false)
    const paging = (vector) => {
      transitionClass.value = vector
      nextTick(() => {
        showFlg.value = false
      })
    }

    onMounted(() => {
      showFlg.value = true
    })

    return {
      // store
      worksShowFlg,
      // this
      page,
      transitionClass,
      showFlg,
      paging,
    }
  },
}
</script>

<style lang="stylus">
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  min-height: var(--windowHeight, 100vh);
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.7);
  overflow: scroll;
  font-size: 20px;
  z-index: 5;
  &-bg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }
  &-transition {
    &-leave-active,
    &-enter-active {
      transition-duration: 2s;
      transition: all 0.5s;
    }
    &-leave-from,
    &-enter-to {
      opacity: 1;
      transform: translateX(0vw);
      &.prev {
        transform: translateX(0vw);
      }
      &.next {
        transform: translateX(0vw);
      }
    }
    &-leave-to {
      opacity: 0;
      &.prev {
        transform: translateX(100vw);
      }
      &.next {
        transform: translateX(-100vw);
      }
    }
    &-enter-from {
      opacity: 0;
      &.prev {
        transform: translateX(-100vw);
      }
      &.next {
        transform: translateX(100vw);
      }
    }
  }
  &-innr {
    width: 96%;
    max-width: 960px;
    min-height: 420px;
    margin: 4em auto 2vw;
    padding: 2em 1em;
    box-sizing: border-box;
    z-index: 1;
    box-shadow: 30px 30px 20px #222;
    background: rgba(255,255,255,0.8);
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.2);
    backdrop-filter: blur(5px);
    // transition
    // opacity: 1;
    /*resize 
    animation: modal-open-anime;
    animation-timing-function: ease-out;
    animation-duration: 0.3s;
    transition: all 1s ease;
    */
    // PC
    @media (min-aspect-ratio: 1 / 1) {
      width: 90%;
      margin: 5vh auto;
      padding: 5em 3em 3em;
    }
  }
  &-nav {
    &-next,
    &-prev {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3vw;
      min-width: 30px;
      position: fixed;
      top: 90vh;
      z-index: 1;
      background: rgba(0,0,0,0.4);
      border-radius: 50%;
      padding: 2vw;
      opacity: 0.6;
      transition-duration: 0.1s;
      &:hover {
        opacity: 1;
      }
    }
    &-next {
      transform: rotate(-90deg);
      right: 2vw;
    }
    &-prev {
      transform: rotate(90deg);
      left: 2vw;
    }
    svg {
      fill: #FFF;
    }
  }
  &-close {
    padding: 0.2em 0.8em;
    border-radius: 50px;
    background: #c3c3c3;
    box-shadow: 6px 6px 6px #999, -3px -3px 6px #eee;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #000;
    margin-top: 2em;
    user-select: none;
    &:active {
      box-shadow: inset 3px 3px 4px #999999, inset -3px -3px 4px #cfcfcf;
    }
  }
}
/* markdown style */
.md {
  &-header {
    margin-bottom: 1em;
    text-align: center;
    // PC
    @media (min-aspect-ratio: 1 / 1) {
      margin-bottom: 3em;
    }
  }
  &-url {
    color: #444;
    display: block;
    font-size: 0.8em;
    text-decoration: none;
  }
  &-title {
    font-size: 1.2em;
    font-weight: 200;
    margin: 0;
    @media (min-aspect-ratio: 1 / 1) {
      font-size: 1.6em;
    }
  }
  &-tags {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: center;
    margin: 0;
    padding-left: 0;
    li {
      margin: 0.2em;
      padding: 0.2em 0.5em;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      font-size: 0.7em;
      color: #666;
    }
  }
  &-mv {
    text-align: center;
    margin-bottom: 1em;
    @media (min-aspect-ratio: 1 / 1) {
      margin-bottom: 3em;
    }
    &-img {
      max-width: 100%;
    }
  }
  &-content {
    line-height: 1.5;
    // Mobile
    @media (max-aspect-ratio: 1 / 1) {
      font-size: 3vw;
    }
    // PC
    @media (min-aspect-ratio: 1 / 1) {
      line-height: 1.8;
    }
    h2 {
      text-align: center;
      font-weight: 200;
      margin: 2em auto 1em;
      font-size: 1.2em;
    }
    h3 {
      font-size: 1em;
      font-weight: 200;
      border-bottom: 1px dashed #999;
      margin: 1.5em auto 0.2em;
    }
    img {
      max-width: 100%;
    }
    // 引用
    blockquote {
      font-size: 0.8em;
      position: relative;
      padding: 0.2em 1em;
      box-sizing: border-box;
      font-style: italic;
      background: rgba(0,0,0, 0.1);
      &:before {
        color: #cfcfcf;
        font-size: 2em;
        font-weight: bold;
        color: #CCC;
        line-height: 0.6;
        content: open-quote;
        display: block;
        transform: translateY(0.4em);
      }
      p {
        padding-left: 1em;
        line-height: 1.2;
      }
      cite {
        display: block;
        text-align: right;
      }
    }
  }
  .header-anchor {
    display: none;
  }
  &-footer {
    text-align: center;
    &-headline {
      font-weight: 200;
      margin: 1em 0 0.5em;
    }
  }
}
@keyframes modal-open-anime {
  0% {
    transform: translateY(10vh);
    opacity: 0;
  }
  100%{
    transform: translateY(0vh);
    opacity: 1;
  }
}
</style>
