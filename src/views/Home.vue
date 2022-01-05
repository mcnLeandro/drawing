<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />

    {{ hey }}
    {{ heyStore }}
    <button @click="getHey()">getHey</button>
    <input type="text" v-model="form" />
    <button @click="onSubmit">update</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";
import HelloWorld from "@/components/HelloWorld.vue";
import MutationTypes from "@/store/mutationTypes";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    const form = ref("");

    const clearForm = () => {
      form.value = "";
    };

    const hey = ref("HEYYYYYYYYY");

    function getHey() {
      console.log("hEYYYYYYY?????");
    }

    // store
    const store = useStore();
    const heyStore = computed(() => store.state.heyStore);
    console.log(heyStore);

    const onSubmit = () => {
      store.commit(MutationTypes.setHeyStore, form.value);
      clearForm();
    };

    return {
      form,
      hey,
      getHey,
      heyStore,
      onSubmit,
    };
  },
});
</script>
