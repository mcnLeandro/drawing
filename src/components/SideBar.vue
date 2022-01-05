
<template>
  <div>
    <sl-drawer label="Mode" placement="start" class="drawer-placement-start">
      <sl-menu class="drawing-mode-menu" style="max-width: 100%;">
        <sl-menu-item @click="changeMode('brush')">
          <sl-icon name="brush"></sl-icon>Brush
        </sl-menu-item>
        <sl-menu-item @click="changeMode('eraser')">
          <sl-icon name="eraser"></sl-icon>Eraser
        </sl-menu-item>
      </sl-menu>
      <sl-divider></sl-divider>
      </sl-drawer>
    <sl-button variant="default" size="large" circle>
      <sl-icon :name="iconName[mode]" label="Edit"></sl-icon>
    </sl-button>
  </div>
</template>

<style>
.text-right {
  text-align: right;
}
</style>

<script lang="ts">
import { computed, defineComponent, ref , onMounted, useSSRContext} from "vue";
import { useStore } from "@/store";
import MutationTypes from "@/store/mutationTypes";
import { SlDrawer } from "@shoelace-style/shoelace/dist/shoelace";
import { DrawingMode } from "@/config"

type iconNameType={
  [key in DrawingMode]: string;
};

const iconName: iconNameType =  {
  brush: "brush",
  eraser: "eraser",
}

export default defineComponent({
  name: "SideBar",
  components: {
  },
  data(){
    return{
      iconName
    }
  },
  setup() {
    const store = useStore()
    const mode = computed(()=> store.state.mode)

    const changeMode = (mode: DrawingMode) => {
      store.commit(MutationTypes.setMode, mode)
    }

    onMounted(()=>{
      const drawer = document.querySelector('.drawer-placement-start')! as SlDrawer;
      const openButton = drawer.nextElementSibling!;
  
      openButton.addEventListener('click', () => drawer.show());

      document.querySelectorAll(".drawing-mode-menu")!.forEach(ele => {
        ele.addEventListener('click', () => {
          drawer.hide()
          console.log(mode.value)
        })
      })
    })

    return {
      mode,
      changeMode
    }
  },
});
</script>
