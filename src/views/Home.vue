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
import { computed, defineComponent, ref, onMounted } from "vue";
import { useStore } from "@/store";
import MutationTypes from "@/store/mutationTypes";

import SideBar from '@/components/SideBar.vue'
import Konva from 'konva'
import { Vector2d } from "konva/lib/types";

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

      layer.add(rect)

      let isPaint = false;
      let mode = "brush"
      let lastLine: any;
      stage.on('mousedown touchstart', function (e) {
        isPaint = true;
        const pos: Vector2d = stage.getPointerPosition()!;
        lastLine = new Konva.Line({
          stroke: '#df4b26',
          strokeWidth: 5,
          globalCompositeOperation:
            mode === 'brush' ? 'source-over' : 'destination-out',
          // round cap for smoother lines
          lineCap: 'round',
          // add point twice, so we have some drawings even on a simple click
          points: [pos.x, pos.y, pos.x, pos.y],
        });
        layer.add(lastLine);
      });

      stage.on('mouseup touchend', function () {
        isPaint = false;
      });

      // and core function - drawing
      stage.on('mousemove touchmove', function (e) {
        if (!isPaint) {
          return;
        }

        // prevent scrolling on touch devices
        e.evt.preventDefault();

        const pos = stage.getPointerPosition()!;
        var newPoints = lastLine.points().concat([pos.x, pos.y]);
        lastLine.points(newPoints);
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
