<template>
  <header
    class="header"
    :class="{'portrait': portrait}"
  >
    <div class="header-innr">
      <h1 class="title">
        <logo />
      </h1>
      <nav class="header-nav">
        <div
          class="header-nav-item"
          @click="switchAbout()"
        >
          <profileIcon
            class="icon"
            :class="{'on': aboutShowFlg}"
          />
          <arrowDownIcon class="arrow" />
          <div class="label">
            About
          </div>
        </div>
        <!-- <menuIcon /> -->
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { inject } from 'vue'
import { store, storeKey } from '../store/store.ts'
import arrowDownIcon from './icon/arrowDown.vue'
import profileIcon from './icon/profile.vue'
import logo from './Logo.vue'

export default {
  components: {
    arrowDownIcon,
    profileIcon,
    logo,
  },
  props: {
    tagFilter: {
      type: Array,
      default: () => [],
    },
    portrait: {
      type: Boolean,
      default: true,
    },
  },

  setup() {
    const { aboutShowFlg, switchAbout } = inject(storeKey) as store
    return {
      aboutShowFlg,
      switchAbout,
    }
  },
}
</script>

<style lang="stylus">
.header {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1em;
  box-sizing: border-box;
  z-index: 15;
  // PC
  @media (min-aspect-ratio: 1 / 1) {
    z-index: 5;
  }
  &-nav {
    // PC
    @media (min-aspect-ratio: 1 / 1) {
      position: fixed;
      bottom: 1em;
      font-size: 1.5em;
    }
    &-item {
      display: inline-flex;
      align-items: center;
      .icon {
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
        @media (min-aspect-ratio: 1 / 1) {
          display: none;
        }
      }
    }
    .arrow{
      width: 1em;
      margin-right: 0.5em;
      animation-name: scrolldown;
      animation-duration: 0.5s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-timing-function: ease-out;
    }
    .label,
    .arrow {
      display: none;
      cursor: pointer;
      @media (min-aspect-ratio: 1 / 1) {
        display: block;
      }
    }

  }

  @media (max-aspect-ratio: 1 / 1) {
    width: 100%;
    background:
      linear-gradient(
        0deg,
        rgba(224,224,224,0) 0%,
        rgba(224,224,224,0.4) 25%,
        rgba(224,224,224,0.6) 100%);
      backdrop-filter: blur(2px);
    &-innr {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  @media (min-aspect-ratio: 1 / 1) {
    padding: 3em 0 0 3em ;
  }
}
.title {
  font-size: 6vw;
  padding: 0;
  margin: 0;
  line-height: 1;
  width: 42vw;
}
@keyframes scrolldown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
