<!--
 * @Author: lu
 * @Date: 2021-12-27 17:11:07
 * @LastEditTime: 2021-12-27 18:15:21
 * @FilePath: \vue-ts-erp\src\components\ui\button\Index.vue
 * @Description: 
-->
<template>
  <n-button
    :size="size"
    :type="type"
    @click="handleClick"
    class="margin-right-5"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </n-button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "WButton",
  components: {},
  props: {
    size: {
      type: String,
      default: "small",
    },
    type: {
      type: String,
      default: "default",
    },
    click: {},
  },
  setup(props, { emit }) {
    const handleClick = () => {
      emit("click");
    };
    return { handleClick };
  },
});
</script>
<style scoped lang='scss'>
@import "@/assets/css/index.scss";
</style>
