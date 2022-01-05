import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import MutationTypes from "@/store/mutationTypes";
import Konva from "konva";
import { DrawingMode } from "@/config"
// stateの型定義
type State = {
  mode: DrawingMode,
  isPaint: boolean,
  lastLine: Konva.Line
};

// storeをprovide/injectするためのキー
export const key: InjectionKey<Store<State>> = Symbol();
// store本体
export const store = createStore<State>({
  state: {
    isPaint: false,
    mode: 'brush',
    lastLine: new Konva.Line({})
  },
  mutations: {
    [MutationTypes.setMode](state, mode: DrawingMode) {
      state.mode = mode;
    },
    [MutationTypes.setIsPaint](state, isPaint: boolean) {
      state.isPaint = isPaint;
    },
    [MutationTypes.setLastLine](state, latLine: Konva.Line) {
      state.lastLine = latLine
    },
  },
  actions: {},
  getters: {},
  modules: {},
});

// useStoreを使う時にキーの指定を省略するためのラッパー関数
export const useStore = () => {
  const store = baseUseStore(key);
  if (!store) throw new Error("store is undefined");
  return store;
};
