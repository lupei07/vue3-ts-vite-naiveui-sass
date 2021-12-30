<!--
 * @Author: lu
 * @Date: 2021-12-03 11:33:47
 * @LastEditTime: 2021-12-30 16:32:28
 * @FilePath: \vue-ts-erp\src\views\order\OrderList.vue
 * @Description: 订单列表
-->
<template>
  <div style="height: 100%">
    <Splitpane>
      <template v-slot:panetop>
        <div class="main-content flex flex-column">
          <div class="">header{{}}----{{ loading }}{{}}</div>
          <el-table
            class="flex-1"
            size="small"
            border
            v-loading="loading"
            :data="tableData"
            style="width: 100%"
            height="550"
          >
            <el-table-column prop="order_flag" label="Date" width="150" />
            <el-table-column prop="order_sn" label="Name" width="150" />
            <el-table-column prop="order_type" label="State" width="120" />
            <el-table-column
              prop="order_from_type_name"
              label="City"
              width="320"
            />
            <el-table-column prop="warehouse" label="Address" width="600" />
            <el-table-column prop="express_id" label="Zip" width="120" />
          </el-table>
          <!-- <s-table
            bordered
            :loading="loading"
            :pagination="false"
            :columns="columns"
            :data-source="tableData"
            :scroll="{ x: 3200, y: 500 }"
            :row-height="32"
            size="small"
            rowKey="id"
            stripe
          ></s-table> -->
          <Pagination
            ref="paginationRef"
            :total="pagination.total_count"
            @change="getList"
          ></Pagination>
        </div>
      </template>
      <template v-slot:panebottom>
        <div>sdeef</div>
      </template>
    </Splitpane>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  markRaw,
  watch,
  ref,
  Ref,
} from "vue";
import { reqOrderSearch } from "@/api/index";
import Splitpane from "@/components/layout/splitpane/Splitpane.vue";
import Pagination from "@/components/ui/pagination/Index.vue";
import { IPaginationInfo } from "@/components/ui/pagination/type";

export default defineComponent({
  name: "OrderList",
  components: { Splitpane, Pagination },
  setup() {
    const columns = [
      {
        title: "卖家备注旗帜",
        dataIndex: "order_flag",
        width: 120,
      },
      {
        title: "订单编号",
        dataIndex: "order_sn",
        width: 200,
      },
      {
        title: "订单类型",
        dataIndex: "order_type",
      },
      {
        title: "订单来源",
        dataIndex: "order_from_type_name",
      },
      {
        title: "仓库",
        dataIndex: "warehouse",
      },
      {
        title: "快递公司",
        dataIndex: "express_id",
      },
      {
        title: "快递单号",
        dataIndex: "store_id",
      },
      {
        title: "买家信息",
        dataIndex: "ep_buyer_name",
      },
      {
        title: "实付金额",
        dataIndex: "order_actual_amount",
      },
      {
        title: "应付金额",
        dataIndex: "order_should_amount",
      },
      {
        title: "商品件数",
        dataIndex: "goods_total",
      },
      {
        title: "客服备注",
        dataIndex: "order_store_remark",
      },
      {
        title: "买家留言",
        dataIndex: "order_buyer_remark",
      },
      {
        title: "平台单号",
        dataIndex: "ep_order_sn",
      },
      {
        title: "收货人",
        dataIndex: "consignee",
      },
      {
        title: "审核状态",
        dataIndex: "examine_status",
      },
      {
        title: "财审状态",
        dataIndex: "financial_status",
      },
      {
        title: "买家信息",
        dataIndex: "ep_buyer_name",
      },
      {
        title: "实付金额",
        dataIndex: "order_actual_amount",
      },
      {
        title: "应付金额",
        dataIndex: "order_should_amount",
      },
      {
        title: "商品件数",
        dataIndex: "goods_total",
      },
      {
        title: "客服备注",
        dataIndex: "order_store_remark",
      },
      {
        title: "买家留言",
        dataIndex: "order_buyer_remark",
      },
      {
        title: "平台单号",
        dataIndex: "ep_order_sn",
      },
      {
        title: "收货人",
        dataIndex: "consignee",
      },
      {
        title: "审核状态",
        dataIndex: "examine_status",
      },
      {
        title: "财审状态",
        dataIndex: "financial_status",
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
    const getList = () => {
      const { page, pageSize } = paginationRef.value;
      const { loading, result } = reqOrderSearch({ pageSize, page });
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
    const handleCheck = (rowKeys: []) => {
      checkedRowKeysRef.value = rowKeys;
    };
    // 点击单行
    const rowProps = (row: any) => {
      return {
        style: "cursor: pointer;",
        onClick: () => {
          console.log(123123);
        },
      };
    };
    return {
      paginationRef,
      ...toRefs(state),
      columns,
      getList,
      handleCheck,
      rowProps,
    };
  },
});
</script>
<style scoped lang='scss'>
</style>
