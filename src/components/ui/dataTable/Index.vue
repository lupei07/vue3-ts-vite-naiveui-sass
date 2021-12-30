<!--
 * @Author: lu
 * @Date: 2021-12-07 16:02:55
 * @LastEditTime: 2021-12-28 16:02:20
 * @FilePath: \vue-ts-erp\src\components\ui\dataTable\Index.vue
 * @Description: 数据表格
-->
<template>
  <n-data-table
    class="flex-1"
    size="small"
    :virtual-scroll="true"
    :loading="loading"
    :single-line="false"
    :single-column="false"
    :scroll-x="scrollX"
    flex-height
    :row-key="(row) => row.id"
    :columns="columns"
    :data="tableData"
    :row-props="rowProps"
    @update:checked-row-keys="handleCheck"
  >
    <template v-slot:empty>
      <div>
        <div v-if="tableData">空页面</div>
      </div>
    </template>
  </n-data-table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DataTable",
  components: {},
  props: {
    columns: {},
    tableData: {},
    loading: {},
    checkRows: {},
    clickRow: {},
    scrollX: {},
  },
  setup(props, { emit }) {
    // 全选 单选
    const handleCheck = (rowkeys: []) => {
      emit("checkRows", rowkeys);
    };
    // 点击单行
    const rowProps = (row: object) => {
      return {
        style: "cursor: pointer;",
        onClick: () => {
          emit("clickRow", row);
        },
      };
    };
    return { handleCheck, rowProps };
  },
});
</script>
<style scoped lang='scss'>
@import "@/assets/css/index.scss";
</style>
