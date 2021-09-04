import { ref, reactive, computed, ComputedRef, InjectionKey } from "vue"

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

// Worksのクエリパラメータ
const _worksQuery = reactive({
  key: 'date',
  asc: false,
  keyword: '',
  tag: ''
})
const sortWorksByAsc = () => _worksQuery.asc = true
const sortWorksByDesc = () => _worksQuery.asc = false
const sortSwitchWorks = () => _worksQuery.asc = !_worksQuery.asc
const worksQuery = computed(() => _worksQuery)

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
  // Worksのクエリパラメータ
  worksQuery,
  sortSwitchWorks,
}
