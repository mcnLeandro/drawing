import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import MutationTypes from "@/store/mutationTypes";

// stateの型定義
type State = {
  heyStore: string;
};

// storeをprovide/injectするためのキー
export const key: InjectionKey<Store<State>> = Symbol();
// store本体
export const store = createStore<State>({
  state: {
    heyStore: "heyStore i knew that i see you again",
  },
  mutations: {
    [MutationTypes.setHeyStore](state, heyStore: string) {
      state.heyStore = heyStore;
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
