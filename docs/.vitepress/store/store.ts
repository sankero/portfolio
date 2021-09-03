import { ref, computed, ComputedRef, InjectionKey } from "vue"

export interface store {
  aboutShowFlg: ComputedRef<boolean>;
  worksShowFlg: ComputedRef<boolean>;
}

// キーの追加
export const storeKey: InjectionKey<store> = Symbol("store")

// Aboutの表示フラグ
const _aboutShowFlg = ref(false)
const showAbout = () => _aboutShowFlg.value = true
const hideAbout = () => _aboutShowFlg.value = false
const switchAbout = () => _aboutShowFlg.value = !_aboutShowFlg.value
const aboutShowFlg = computed(() => _aboutShowFlg.value)

// Worksモーダルの表示フラグ
const _worksShowFlg = ref(false)
const showWorks = () => _worksShowFlg.value = true
const hideWorks = () => _worksShowFlg.value = false
const worksShowFlg = computed(() => _worksShowFlg.value)

export default {
  // Aboutの表示フラグ
  aboutShowFlg,
  showAbout,
  hideAbout,
  switchAbout,
  // Worksモーダルの表示フラグ
  worksShowFlg,
  showWorks,
  hideWorks,
}
