<!--
 * @Author: lu
 * @Date: 2021-12-10 11:23:56
 * @LastEditTime: 2021-12-27 17:57:19
 * @FilePath: \vue-ts-erp\src\components\ui\dataTable\EditNumberCell.vue
 * @Description: 表格数字编辑框
-->
<template>
  <span v-if="!isShow">{{ value }}</span>
  <n-input-number
    v-if="isShow"
    v-model:value="num"
    size="small"
    @click.stop
    clearable
  />
  <n-icon size="16" @click.stop="handleEdit" v-if="!isShow">
    <CreateOutline />
  </n-icon>
  <n-icon size="16" @click.stop="handleCheck" v-else><CheckmarkSharp /></n-icon>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { CreateOutline, CheckmarkSharp } from "@vicons/ionicons5";
export default defineComponent({
  name: "EditNumberCell",
  components: { CreateOutline, CheckmarkSharp },
  props: {
    value: {},
    show: {
      type: Boolean,
      default: false,
    },
    target: {},
  },
  setup(props) {
    let num = ref(Number(props.value));
    let isShow = ref(props.show);
    const onChange = inject("changeNumberCell") as any;
    // 编辑
    const handleEdit = () => {
      isShow.value = true;
    };
    // 确认
    const handleCheck = () => {
      isShow.value = false;
      if (!num.value) {
        num.value = 0;
      }
      if (onChange) {
        // num 修改后的值  target 目标对象
        onChange(num, props.target);
      }
    };
    return {
      num,
      isShow,
      handleEdit,
      handleCheck,
    };
  },
});
</script>
<style scoped lang='scss'>
@import "@/assets/css/index.scss";
</style>