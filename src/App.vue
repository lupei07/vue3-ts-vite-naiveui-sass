<!--
 * @Author: lu
 * @Date: 2021-11-23 14:25:40
 * @LastEditTime: 2021-12-06 23:37:01
 * @FilePath: \vue-ts-erp\src\App.vue
 * @Description: 
-->
<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    style="height: 100%"
  >
    <n-global-style />
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { zhCN, dateZhCN } from "naive-ui";
import { defineComponent } from "vue";
import themeOverrides from "./ui/theme";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup(props) {
    return { zhCN, dateZhCN, themeOverrides };
  },
});
</script>

<style lang="scss">
@import "./assets/css/common.scss";
@import "splitpanes/dist/splitpanes.css";
#app {
  height: 100%;
}
</style>
