<template>
  <div class="modal">
    <a class="modal-bg" href="/" />
    <transition name="modal-innr">
      <article v-show="showFlg" class="modal-innr md">
        <header class="md-header">
          <h1 class="md-title">{{$page.title}}</h1>
          <!-- a v-if="$page.frontmatter.url" class="md-url" :href="$page.frontmatter.url">{{$page.frontmatter.url}}</a -->
          <ul class="md-tags" v-if="$page.frontmatter.tags">
            <li v-for="name in $page.frontmatter.tags" :key="name">{{name}}</li>
          </ul>
        </header>
        <div class="md-mv" v-if="$page.frontmatter.key">
          <img class="md-mv-img" :src="`/works/img/${$page.frontmatter.key}_m.webp`">
        </div>
        <main class="md-content">
          <Content />
        </main>
        <footer class="md-footer">
          <div v-if="$page.frontmatter.package">
            <h2 class="md-footer-headline">Package</h2>
            <ul class="md-tags">
              <li v-for="name in $page.frontmatter.package" :key="name" class="neumo-btn">{{name}}</li>
            </ul>
          </div>
          <a class="modal-close" href="/">Close</a>
        </footer>
      </article>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    showFlg: Boolean
  }
}
</script>

<style lang="scss">
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    min-height: 100vh;
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
    &-innr {
      width: 96%;
      max-width: 960px;
      min-height: 420px;
      margin: 2vw auto;
      padding: 2em 1em;
      box-sizing: border-box;
      z-index: 1;
      box-shadow: 30px 30px 20px #222;
      background: rgba(255,255,255,0.6);
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.2);
      backdrop-filter: blur(5px);
      animation: slide-skew 0.4s cubic-bezier(0.25, 1, 0.5, 1) 1 forwards;
      // PC
      @media (min-aspect-ratio: 1 / 1) {
        width: 90%;
        margin: 5vh auto;
        padding: 5em 3em 3em;
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

  .modal-innr-enter-active,
  .modal-innr-leave-active {
    // transition-delay: 0.8s;
    transition: opacity 0.5s ease;
  }

  .modal-innr-enter-from,
  .modal-innr-leave-to {
    opacity: 0;
  }
</style>