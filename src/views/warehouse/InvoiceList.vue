<!--
 * @Author: lu
 * @Date: 2021-12-21 15:53:13
 * @LastEditTime: 2021-12-28 16:11:33
 * @FilePath: \vue-ts-erp\src\views\warehouse\InvoiceList.vue
 * @Description: 发货单
-->
<template>
  <div class="flex flex-1 flex-column">
    <div>
      <WButton @click="handlePrint">
        <Inoicons slot="icon" :size="16" icon="PrintOutline" />
        打印
      </WButton>
      <WButton @click="handlePrint">打印1</WButton>
    </div>
    <DataTable
      :columns="columns"
      :tableData="tableData"
      :loading="loading"
      @checkRows="handleCheckRows"
      @clickRow="handleClickRow"
    ></DataTable>
    <Pageination
      ref="paginationRef"
      :total="pagination.total_count"
      @change="getList"
    ></Pageination>
  </div>
</template>
<script lang="ts">
import {
  h,
  defineComponent,
  reactive,
  toRefs,
  watch,
  markRaw,
  onMounted,
  ref,
  Ref,
} from "vue";
import { reqinvoiceList } from "@/api/index";
import { useStore } from "vuex";
import express_print from "@/utils/print/printExpressData";
import { IPaginationInfo } from "@/components/ui/pagination/type";
export default defineComponent({
  name: "InvoiceList",
  components: {},
  setup() {
    const store = useStore();
    const columns = [
      {
        type: "selection",
      },
      {
        title: "卖家备注旗帜",
        key: "order_flag",
        width: "200",
      },
      {
        title: "订单编号",
        key: "order_sn",
        width: "200",
      },
      {
        title: "订单类型",
        key: "order_type",
      },
      {
        title: "订单来源",
        key: "order_from_type_name",
      },
      {
        title: "仓库",
        key: "warehouse",
      },
      {
        title: "快递公司",
        key: "express_id",
        render(row: any) {
          return h("div", {
            class: "flex flex-align",
          });
        },
      },
      {
        title: "快递单号",
        key: "store_id",
      },
      {
        title: "买家信息",
        key: "ep_buyer_name",
        render(row: any) {
          return h("div", { class: "flex flex-align" }, [
            h("span", null, row.ep_buyer_name),
          ]);
        },
      },
      {
        title: "实付金额",
        key: "order_actual_amount",
      },
      {
        title: "应付金额",
        key: "order_should_amount",
      },
      {
        title: "商品件数",
        key: "goods_total",
      },
      {
        title: "客服备注",
        key: "order_store_remark",
        width: "150",
        ellipsis: {
          tooltip: true,
        },
      },
    ];
    let state = reactive({
      loading: false,
      tableData: [],
      pagination: {},
    });
    onMounted(() => {
      getList();
    });

    const handlePrint = async () => {
      const printDocuments = await express_print.printList("5427,4536,5273");
      handlePrintOk(printDocuments);
    };
    const handlePrintOk = async (printDocuments: any) => {
      // express_print.printOk(printDocuments);
      const previewUrl = await express_print.printPreview(printDocuments);
      console.log("previewUrl", previewUrl);
    };
    const paginationRef = ref<IPaginationInfo | null>(
      null
    ) as Ref<IPaginationInfo>;
    const getList = async () => {
      const { page, pageSize } = paginationRef.value;
      const { loading, result } = reqinvoiceList({ page, pageSize });
      state.loading = !loading.value;
      watch(result, () => {
        if (result.value) {
          state.loading = !loading.value;
          const { list, ...pagination } = result.value;
          state.tableData = markRaw(list);
          state.pagination = pagination;
        }
      });
    };
    const handleCheckRows = () => {};
    const handleClickRow = () => {};
    return {
      paginationRef,
      columns,
      ...toRefs(state),
      handlePrint,
      handleCheckRows,
      handleClickRow,
      getList,
    };
  },
});
</script>
<style scoped lang='scss'>
@import "@/assets/css/index.scss";
</style>
