<!--
 * @Author: lu
 * @Date: 2021-12-03 11:33:47
 * @LastEditTime: 2021-12-30 13:52:36
 * @FilePath: \vue-ts-erp\src\views\order\OrderProcess.vue
 * @Description: 订单列表
-->
<template>
  <div class="flex-1">
    <Splitpane>
      <template v-slot:panetop>
        <div class="main-content flex flex-column">
          <div class="">
            <SearchForm
              :searchProps="searchProps"
              @search="getList"
              ref="searchRef"
            ></SearchForm>
          </div>
          <DataTable
            :columns="columns"
            :tableData="tableData"
            :loading="loading"
            :scrollX="3200"
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
      <template v-slot:panebottom>
        <div>sdeef{{ a }}</div>
      </template>
    </Splitpane>
  </div>
</template>
<script lang="ts">
import {
  h,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  markRaw,
  watch,
  ref,
  Ref,
  provide,
} from "vue";
import { CreateOutline } from "@vicons/ionicons5";
import { reqOrderSearch } from "@/api/index";
import Splitpane from "@/components/layout/splitpane/Splitpane.vue";
import SearchForm from "@/components/ui/search/SearchForm.vue";
import DataTable from "@/components/ui/dataTable/Index.vue";
import EditNumberCell from "@/components/ui/dataTable/EditNumberCell.vue";
import Copy from "@/components/ui/Copy.vue";
import NewIcon from "@/components/ui/icon/Index.vue";
import { IPaginationInfo } from "@/components/ui/pagination/type";

export default defineComponent({
  name: "OrderProcess",
  components: {
    SearchForm,
    Splitpane,
    DataTable,
    CreateOutline,
    EditNumberCell,
    Copy,
    NewIcon,
  },
  props: ["a", "b"],
  setup() {
    const searchProps = [
      {
        type: "select",
        label: "日期类型",
        decorator: "search_type",
        list: [{}],
      },
      {
        type: "range-picker",
        col: 6,
        label: "日期选择",
        lebelCol: 4,
        decorator: "range_time_picker",
        format: "YYYY-MM-DD HH:mm:ss",
        showTime: true,
      },
      {
        type: "select",
        label: "仓库选择",
        decorator: "wid",
        list: [{}],
      },
      {
        type: "select",
        label: "店铺",
        decorator: "shop_id",
        list: [{}],
      },
      {
        type: "select",
        label: "快递公司",
        decorator: "express_id",
        list: [{}],
      },
      {
        type: "input",
        label: "订单编号",
        decorator: "order_sn",
      },
      {
        type: "input",
        label: "平台单号",
        decorator: "platform_order_sn",
      },
      {
        type: "input",
        label: "快递单号",
        decorator: "ship_sn",
      },
      {
        type: "input",
        label: "买家昵称",
        decorator: "ep_buyer_nick",
      },
      {
        type: "input",
        label: "收货人",
        decorator: "consignee",
      },
      {
        type: "input",
        label: "手机",
        decorator: "consignee_telephone",
      },
      {
        type: "select",
        label: "平台状态",
        decorator: "ep_status",
        list: [{}],
      },
      {
        type: "input",
        label: "唯一码",
        decorator: "goods_unique_code",
      },
    ];
    const columns = [
      {
        type: "selection",
      },
      {
        title: "卖家备注旗帜",
        key: "order_flag",
        width: "200",
        render(row: any) {
          return h("div", { class: "flex  flex-align" }, [
            h(EditNumberCell, {
              value: row.abnormal_status,
              target: row,
            }),
          ]);
        },
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
      },
      {
        title: "快递单号",
        key: "store_id",
      },
      {
        title: "买家信息",
        key: "ep_buyer_name",
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
      {
        title: "买家留言",
        key: "order_buyer_remark",
      },
      {
        title: "平台单号",
        key: "ep_order_sn",
        width: "200",
      },
      {
        title: "收货人",
        key: "consignee",
      },
      {
        title: "审核状态",
        key: "examine_status",
      },
      {
        title: "财审状态",
        key: "financial_status",
      },
      {
        title: "买家信息",
        key: "ep_buyer_name",
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
      {
        title: "买家留言",
        key: "order_buyer_remark",
      },
      {
        title: "平台单号",
        key: "ep_order_sn",
        width: "200",
      },
      {
        title: "收货人",
        key: "consignee",
      },
      {
        title: "审核状态",
        key: "examine_status",
      },
      {
        title: "财审状态",
        key: "financial_status",
      },
    ];
    const paginationRef = ref<IPaginationInfo | null>(
      null
    ) as Ref<IPaginationInfo>;
    let state = reactive({
      source: [],
      loading: false,
      tableData: [],
      pagination: {},
    });

    onMounted(() => {
      getList();
    });
    // 列表
    const searchRef = ref();
    const getList = async () => {
      const search = searchRef.value.form;
      const { page, pageSize } = paginationRef.value;
      const { loading, result } = reqOrderSearch({ page, pageSize });
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
    // 全选 单选
    const checkedRowKeysRef = ref([]); // 选中的keys数组
    const handleCheckRows = (rowKeys: []) => {
      console.log(rowKeys);
      checkedRowKeysRef.value = rowKeys;
    };
    // 点击单行
    const handleClickRow = (row: object) => {
      console.log(row);
    };
    const sendMail = (row: any) => {
      console.log("row", row);
    };
    const changeNumberCell = (currentValue: any, target: any) => {
      state.tableData.map((item: any) => {
        if (item.id == target.id) {
          item["abnormal_status"] = currentValue.value;
        }
      });
    };
    provide("changeNumberCell", changeNumberCell);
    return {
      searchProps,
      paginationRef,
      searchRef,
      ...toRefs(state),
      columns,
      getList,
      handleCheckRows,
      handleClickRow,
      sendMail,
      changeNumberCell,
    };
  },
});
</script>
<style scoped lang='scss'>
</style>
