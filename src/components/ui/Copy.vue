<!--
 * @Author: lu
 * @Date: 2021-12-14 11:14:17
 * @LastEditTime: 2021-12-17 13:57:47
 * @FilePath: \vue-ts-erp\src\components\ui\Copy.vue
 * @Description: 复制功能
-->
<template>
  <NIcon>
    <CopyOutline @click.stop="handleCopy" />
  </NIcon>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { CopyOutline } from "@vicons/ionicons5";
import useClipboard from "vue-clipboard3";
import Message from "@/utils/message";
export default defineComponent({
  name: "Copy",
  components: { CopyOutline },
  setup(props, { attrs }) {
    const { toClipboard } = useClipboard();
    const handleCopy = async () => {
      const copyTxt: string = attrs.text as string;
      try {
        await toClipboard(copyTxt);
        Message.success("复制成功");
      } catch {
        Message.error("复制失败");
      }
    };
    return { handleCopy };
  },
});
</script>
<style scoped lang='scss'>
@import "@/assets/css/index.scss";
</style>
