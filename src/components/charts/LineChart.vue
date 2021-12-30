<!--
 * @Author: lu
 * @Date: 2021-11-30 20:09:41
 * @LastEditTime: 2021-12-03 15:36:32
 * @FilePath: \vue-ts-erp\src\components\charts\LineChart.vue
 * @Description: 
-->
<template>
  <div class="chart-line" :id="id"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  name: "LineChart",
  components: {},
  props: {
    id: {
      type: String,
      default: "line",
    },
    title: {
      type: String,
      default: "line",
    },
    axis: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    function handleDrawing() {
      type EChartsOption = echarts.EChartsOption;
      var chartDom = document.getElementById(props.id ? props.id : "")!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption;

      option = {
        title: {
          text: props.title,
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "57px",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          name: props.axis.x.name,
          data: props.data.x,
        },
        yAxis: {
          name: props.axis.y.name,
          type: "value",
        },
        series: [
          {
            name: "销量",
            data: props.data.y,
            type: "line",
            label: {
              show: true,
            },
            smooth: true,
          },
        ],
      };
      option && myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }
    return { handleDrawing };
  },
});
</script>
<style scoped lang="scss">
@import "@/assets/css/index.scss";
.chart-line {
  width: 100%;
  height: 100%;
}
</style>
