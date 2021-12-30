<!--
 * @Author: lu
 * @Date: 2021-12-06 19:51:47
 * @LastEditTime: 2021-12-29 10:10:39
 * @FilePath: \vue-ts-erp\src\components\ui\pagination\Index.vue
 * @Description: 
-->
<template>
  <div class="pages flex flex-end">
    <n-pagination
      class="normal-style"
      v-model:page="page"
      v-model:page-size="pageSize"
      :item-count="total"
      :page-sizes="[100, 200, 300, 400]"
      showSizePicker
      :on-update:page="handleChangePage"
      :on-update:page-size="handleChangePageSize"
    >
      <template #prefix="{ itemCount }"> 共 {{ itemCount }} 项 </template>
    </n-pagination>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Pagination",
  components: {},
  props: {
    counts: {},
    total: {},
  },
  setup(props, { emit }) {
    const page = ref(1);
    const pageSize = ref(100);
    // 当前页发生改变时
    const handleChangePage = (current: number) => {
      page.value = current;
      emit("change");
    };
    // 当前分页大小发生改变
    const handleChangePageSize = (size: number) => {
      page.value = 1;
      pageSize.value = size;
      emit("change");
    };
    return { page, pageSize, handleChangePage, handleChangePageSize };
  },
});
</script>
<style scoped lang='scss'>
@import "@/assets/css/index.scss";
.pages {
  padding: 5px 10px;
}
</style>
