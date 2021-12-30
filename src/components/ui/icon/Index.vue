<!--
 * @Author: lu
 * @Date: 2021-12-14 15:42:59
 * @LastEditTime: 2021-12-28 11:11:59
 * @FilePath: \vue-ts-erp\src\components\ui\icon\Index.vue
 * @Description: 动态展示icon
-->
<template>
  <NIcon :size="size"><component :is="icon"></component></NIcon>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  ListOutline,
  Home,
  BagHandle,
  DocumentText,
  Cart,
  PrintOutline,
} from "@vicons/ionicons5";
export default defineComponent({
  name: "Inoicons",
  components: {
    ListOutline,
    Home,
    BagHandle,
    DocumentText,
    Cart,
    PrintOutline,
  },
  props: {
    size: {
      type: Number,
      default: 16,
    },
    icon: {},
  },
  setup(props) {
    return {};
  },
});
</script>
<style scoped lang='scss'>
@import "@/assets/css/index.scss";
</style>

<!--
 用法一：
 <Inoicons
    class="toggle-btn"
    :size="30"
    icon="ListOutline"
    @click="handleToogle"
  />

  用法二：
  const renderIcon = (icon: any) => {
    return () => h(Inoicons, { class: "m-icon", icon });
  };
  const menuOptions = [
      {
        label: "且听风吟",
        key: "hear-the-wind-sing",
        level: "1",
        href: "/home",
        expanded: false,
        icon: renderIcon("Home"),
      },
    ];
-->
