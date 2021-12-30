<!--
 * @Author: lu
 * @Date: 2021-11-30 09:50:45
 * @LastEditTime: 2021-12-06 14:22:59
 * @FilePath: \vue-ts-erp\src\views\home\Home.vue
 * @Description: 
-->
<template>
  <div class="flex flex-column">
    <div class="top flex">
      <div class="left">
        <div class="count-con padding-15 borderbox flex space-between">
          <div class="flex flex-column flex-align">
            <count-to
              class="fz-30 primary"
              :startVal="0"
              :endVal="headerData.unPurchase"
              :duration="4000"
            ></count-to>
            <p>未采购</p>
          </div>
          <div class="flex flex-column flex-align">
            <count-to
              class="fz-30 primary"
              :startVal="0"
              :endVal="headerData.unAudit"
              :duration="4000"
            ></count-to>
            <p>待审核</p>
          </div>
          <div class="flex flex-column flex-align">
            <count-to
              class="fz-30 primary"
              :startVal="0"
              :endVal="headerData.unPrint"
              :duration="4000"
            ></count-to>
            <p>未打印</p>
          </div>
          <div class="flex flex-column flex-align">
            <count-to
              class="fz-30 primary"
              :startVal="0"
              :endVal="headerData.unSort"
              :duration="4000"
            ></count-to>
            <p>未分拣</p>
          </div>
          <div class="flex flex-column flex-align">
            <count-to
              class="fz-30 primary"
              :startVal="0"
              :endVal="headerData.unCheck"
              :duration="4000"
            ></count-to>
            <p>待验货</p>
          </div>
          <div class="flex flex-column flex-align">
            <count-to
              class="fz-30 primary"
              :startVal="0"
              :endVal="headerData.unDealReturn"
              :duration="4000"
            ></count-to>
            <p>待处理售后单</p>
          </div>
          <div class="flex flex-column flex-align">
            <count-to
              class="fz-30 primary"
              :startVal="0"
              :endVal="headerData.todayConfirmReturn"
              :duration="4000"
            ></count-to>
            <p>今日确认退货</p>
          </div>
        </div>
        <div class="flex chart-box">
          <div class="chart">
            <LineChart
              id="purchase"
              :data="sevenPurchaseData"
              title="7日采购"
              :axis="{ x: { name: '日期/天' }, y: { name: '数量：sku件' } }"
              ref="chartPurchase"
            />
          </div>
          <div class="chart">
            <LineChart
              id="order"
              :data="sevenOrderData"
              title="7日订单"
              :axis="{ x: { name: '日期/天' }, y: { name: '数量：单' } }"
              ref="chartOrder"
            />
          </div>
        </div>
      </div>
      <div class="right flex-1">sdf</div>
    </div>
    <div class="flex-1">123</div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  onBeforeMount,
  toRefs,
  ref,
  watch,
  toRaw,
} from "vue";
import { reqHeaderData } from "../../api/index";
import LineChart from "@/components/charts/LineChart.vue";
export default defineComponent({
  name: "App",
  components: { LineChart },
  setup() {
    let state = reactive({
      headerData: {},
      sevenPurchaseData: { x: [], y: [] },
      sevenOrderData: { x: [], y: [] },
    });
    const chartPurchase = ref(null);
    const chartOrder = ref(null);
    onBeforeMount(() => {
      getHeaderData();
    });
    // 头部实时统计及7日数据
    const getHeaderData = async () => {
      const { result } = reqHeaderData();
      watch(result, () => {
        if (result.value) {
          state.headerData = result.value;
          result.value.sevenPurchaseGoodsData.forEach((item: any) => {
            state.sevenPurchaseData.x.push(item.time as never);
            state.sevenPurchaseData.y.push(item.nums as never);
          });

          result.value.sevenSyncOrderData.map((item: any) => {
            state.sevenOrderData.x.push(item.time as never);
            state.sevenOrderData.y.push(item.nums as never);
          });
          (chartPurchase.value as any).handleDrawing();
          (chartOrder.value as any).handleDrawing();
        }
      });
    };

    return { ...toRefs(state), chartPurchase, chartOrder };
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/index.scss";
.top {
  height: 400px;
  .left {
    width: 75%;
    .count-con {
      height: 100px;
      .flex {
        min-width: 90px;
      }
    }
    .chart {
      width: 50%;
    }
    .chart-box {
      height: calc(100% - 100px);
    }
  }
}
</style>
