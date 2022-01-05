
<template>
  <div>
    <sl-drawer label="Mode" placement="start" class="drawer-placement-start">
    </sl-drawer>
    <sl-button variant="default" size="large" circle>
      <sl-icon name="pencil" label="Edit"></sl-icon>
    </sl-button>
  </div>
</template>
<style>

</style>

<script lang="ts">
import { computed, defineComponent, ref , onMounted} from "vue";
import { useStore } from "@/store";
import MutationTypes from "@/store/mutationTypes";
import { SlDrawer } from "@shoelace-style/shoelace/dist/shoelace";

export default defineComponent({
  name: "SideBar",
  components: {
  },
  setup() {
    onMounted(()=>{
      const drawer = document.querySelector('.drawer-placement-start')! as SlDrawer;
      const openButton = drawer.nextElementSibling!;
      const closeButton = drawer.querySelector('sl-button[variant="primary"]')!;
  
      openButton.addEventListener('click', () => drawer.show());
    })
  },
});
</script>
