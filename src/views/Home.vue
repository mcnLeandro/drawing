<template>
  <div class="home">
    <SideBar/>
    <div id="myCanvas"></div>
  </div>
</template>

<style>
#myCanvas {
  height: 100vh;
  width: 100%;
  border: solid 1px black;
}
</style>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { computed, defineComponent, ref, onMounted } from "vue";
import { useStore } from "@/store";
import MutationTypes from "@/store/mutationTypes";

import SideBar from '@/components/SideBar.vue'
import Konva from 'konva'
export default defineComponent({
  name: "Home",
  components: {
    SideBar
  },
  setup() {
    onMounted(()=>{

      const canvas = document.querySelector("#myCanvas")!;
      const stage: Konva.Stage = new Konva.Stage({
        container: canvas as HTMLDivElement,
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      })

      const layer = new Konva.Layer();
      stage.add(layer);

      const rect: Konva.Rect = new Konva.Rect({
        x: 20,
        y: 20,
        width: 100,
        height: 50,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true,
      });
    })
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
