<!--
 * @Author: lu
 * @Date: 2021-11-30 10:17:20
 * @LastEditTime: 2021-12-03 15:33:56
 * @FilePath: \vue-ts-erp\src\components\Header.vue
 * @Description: 
-->
<template>
  <div class="header borderbox">ERP</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Header",
  components: {},
  setup: () => {
    return {};
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/index.scss";
.header {
  width: 100%;
  height: 34px;
  line-height: 34px;
  background: $black;
  padding: 0 20px;
  color: $white;
}
</style>