
<template>
  <div class="item-1 borderbox">
    <div
      class="m-item-content flex space-between flex-align"
      @click="handleHref(item)"
    >
      <div class="area flex center">
        <component :is="item.icon"></component>
        <label class="label">{{ item.label }}</label>
      </div>
      <div class="arrow flex center" v-if="item.children">
        <n-icon :size="16" v-if="expandedKeys.includes(item.key)"
          ><ChevronDownOutline
        /></n-icon>
        <n-icon :size="16" v-else><ChevronForward /></n-icon>
      </div>
    </div>

    <slot name="default"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ChevronDownOutline, ChevronForward } from "@vicons/ionicons5";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "MenuItem",
  components: { ChevronDownOutline, ChevronForward },
  props: {
    item: {},
    expandedKeys: {},
  },
  setup() {
    const router = useRouter();
    const handleHref = (item: any) => {
      if (item.href) {
        router.push(item.href);
      }
    };
    return { handleHref };
  },
});
</script>
<style scoped lang='scss'>
@import "@/assets/css/index.scss";
.side-box {
  width: 60px;
  background: #f5f5f5;
  position: relative;
  transition: all 0.5s;
  .n-menu-item-content {
    padding-left: 18px !important;
  }
  // 隐藏
  &.side-hide {
    width: 60px;
    .toggle-btn {
      left: 57px;
    }
    .m-icon {
      font-size: 26px !important;
    }
    .label {
      width: 0 !important;
      overflow: hidden;
    }
    .arrow {
      display: none;
    }
  }
  // 显示
  &.side-show {
    width: 200px;
    .toggle-btn {
      left: 197px;
    }
    .m-icon {
      font-size: 20px !important;
      margin-right: 3px;
    }
    .label {
      overflow: hidden;
    }
  }
}
.menu-box {
  transition: all 0.5s;
  .item-1 {
    width: 100%;
    overflow-x: hidden;
    padding: 8px 10px 8px 14px;
    cursor: pointer;
    .m-item-content:hover {
      color: $primary;
    }
    .area {
      white-space: nowrap;
      .m-icon {
        font-size: 20px;
        transition: all 0.5s;
      }
      .label {
        display: inline-block;
        width: auto;
        cursor: pointer;
        transition: all 0.5s;
      }
    }
  }
}
</style>
