<!--
 * @Author: lu
 * @Date: 2021-12-03 11:39:12
 * @LastEditTime: 2021-12-06 19:51:30
 * @FilePath: \vue-ts-erp\src\components\layout\splitpane\Splitpane.vue
 * @Description: 拆分窗格
-->
<template>
  <splitpanes horizontal style="height: 100%">
    <pane :size="80">
      <slot name="panetop"></slot>
    </pane>
    <pane :size="25" v-if="show">
      <slot name="panebottom"></slot>
    </pane>
  </splitpanes>
</template>
<script lang="ts">
import { defineComponent, onMounted, provide, ref } from "vue";
import { Splitpanes, Pane } from "splitpanes";
export default defineComponent({
  name: "Splitpane",
  components: { Splitpanes, Pane },
  setup(props, contxt) {
    const show = ref(false);
    onMounted(() => {
      // 解决splitpane初始化默认均分
      setTimeout(() => {
        show.value = true;
      }, 500);
    });
    return { show };
  },
});
</script>
<style scoped lang='scss'>
</style>
