import { ref, computed, ComputedRef, InjectionKey } from "vue"

export interface store {
  aboutShowFlg: ComputedRef<boolean>;
}

// キーの追加
export const storeKey: InjectionKey<store> = Symbol("store")

// Aboutの表示フラグ
const _aboutShowFlg = ref(false)
const showAbout = () => _aboutShowFlg.value = true
const hideAbout = () => _aboutShowFlg.value = false
const switchAbout = () => _aboutShowFlg.value = !_aboutShowFlg.value
const aboutShowFlg = computed(() => _aboutShowFlg.value)

export default {
  aboutShowFlg,
  showAbout,
  hideAbout,
  switchAbout,
}
