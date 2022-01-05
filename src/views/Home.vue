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
}
</style>

<script lang="ts">
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
    const store = useStore()
    const isPaint = computed(()=> store.state.isPaint)
    const mode = computed(()=> store.state.mode)
    const lastLine = computed(()=> store.state.lastLine)
    onMounted(()=>{

      const canvas = document.querySelector("#myCanvas")!;
      const stage: Konva.Stage = new Konva.Stage({
        container: canvas as HTMLDivElement,
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      })

      const layer = new Konva.Layer();
      stage.add(layer);

      stage.on('mousedown touchstart', function (e) {
        store.commit(MutationTypes.setIsPaint, true);
        const pos: Konva.Vector2d = stage.getPointerPosition()!;
        const newlastLine = new Konva.Line({
          stroke: '#df4b26',
          strokeWidth: 5,
          globalCompositeOperation:
            mode.value === 'brush' ? 'source-over' : 'destination-out',
          // round cap for smoother lines
          lineCap: 'round',
          // add point twice, so we have some drawings even on a simple click
          points: [pos.x, pos.y, pos.x, pos.y],
        });

        store.commit(MutationTypes.setLastLine, newlastLine);
        layer.add(newlastLine);
      });

      stage.on('mouseup touchend', function () {
        store.commit(MutationTypes.setIsPaint, false);
      });

      // and core function - drawing
      stage.on('mousemove touchmove', function (e) {
        if (!isPaint.value) {
          return;
        }

        // prevent scrolling on touch devices
        e.evt.preventDefault();

        const pos = stage.getPointerPosition()!;
        const newPoints = lastLine.value.points().concat([pos.x, pos.y]);
        lastLine.value.points(newPoints);
      });

    })
  },
});
</script>
