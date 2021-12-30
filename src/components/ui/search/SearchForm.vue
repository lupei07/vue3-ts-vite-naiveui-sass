<!--
 * @Author: lu
 * @Date: 2021-12-13 14:20:15
 * @LastEditTime: 2021-12-27 17:37:03
 * @FilePath: \vue-ts-erp\src\components\ui\search\SearchForm.vue
 * @Description: 搜索
-->
<template>
  <n-form
    :model="form"
    size="small"
    label-placement="left"
    :show-feedback="false"
    ref="formRef"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi
        class="item"
        v-for="(item, index) in searchProps"
        :key="index"
        :span="item.col ? item.col : 3"
        :label="item.label"
      >
        <n-input
          v-if="item.type == 'input'"
          placeholder="请输入"
          v-model:value="form[item.decorator]"
          clearable
        />
        <n-select
          v-if="item.type == 'select'"
          placeholder="请选择"
          :options="form.list"
          v-model:value="form[item.decorator]"
          clearable
        />
        <n-date-picker
          v-if="item.type == 'range-picker'"
          v-model:value="form[item.decorator]"
          type="datetimerange"
          clearable
        />
      </n-form-item-gi>
      <n-form-item-gi>
        <n-button class="margin-right-10" @click="handleSearch" type="primary"
          >搜索</n-button
        >
        <n-button @click="handleReset">重置</n-button>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
export default defineComponent({
  name: "App",
  components: {},
  props: {
    searchProps: {
      type: Array,
      default: () => [],
    },
    search: {},
  },
  setup(props, { emit }) {
    const formRef = ref();
    const state = reactive({
      form: <object>{},
    });
    // 搜索
    const handleSearch = () => {
      // 调起父页面查询列表
      emit("search");
    };
    // 重置
    const handleReset = () => {
      const keys = Object.keys(state.form);
      keys.forEach((item) => {
        // state.form[item] = ""; // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
        state.form = { ...state.form, [item]: "" };
        emit("search");
      });
    };
    return { ...toRefs(state), handleSearch, handleReset, formRef };
  },
});
</script>
<style scoped lang='scss'>
@import "@/assets/css/index.scss";
.item {
  margin-bottom: 10px;
}
</style>
