<!--
 * @Author: lu
 * @Date: 2021-11-30 11:00:21
 * @LastEditTime: 2021-12-04 16:35:41
 * @FilePath: \vue-ts-erp\src\components\SideBar.vue
 * @Description: 
-->
<template>
  <div class="bar">
    <n-layout has-sider>
      <n-layout-sider
        collapse-mode="width"
        :default-collapsed="false"
        show-trigger="bar"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
      >
        <NMenu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout style="height: 100%" />
    </n-layout>
  </div>
</template>
<script lang="ts">
import { h, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { NIcon } from "naive-ui";
import {
  Home as HomeIcon,
  BagHandle as BagIcon,
  DocumentText as DocIcon,
  Cart as CartIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from "@vicons/ionicons5";
function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menuOptions = [
  {
    label: "且听风吟",
    key: "hear-the-wind-sing",
    icon: renderIcon(HomeIcon),
  },
  {
    label: "1973年的弹珠玩具",
    key: "pinball-1973",
    icon: renderIcon(BagIcon),
    disabled: true,
    children: [
      {
        label: "鼠",
        key: "rat",
      },
    ],
  },
  {
    label: "寻羊冒险记",
    key: "a-wild-sheep-chase",
    // disabled: true,
    icon: renderIcon(DocIcon),
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
    icon: renderIcon(CartIcon),
    children: [
      {
        type: "group",
        label: "人物",
        key: "people",
        icon: renderIcon(PersonIcon),
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "饮品",
            key: "beverage",
            icon: renderIcon(WineIcon),
          },
          {
            label: "食物",
            key: "food",
          },
        ],
      },
      {
        type: "group",
        label: "人物",
        key: "people",
        icon: renderIcon(PersonIcon),
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "饮品",
            key: "beverage",
            icon: renderIcon(WineIcon),
          },
          {
            label: "食物",
            key: "food",
          },
        ],
      },
      {
        type: "group",
        label: "人物",
        key: "people",
        icon: renderIcon(PersonIcon),
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "饮品",
            key: "beverage",
            icon: renderIcon(WineIcon),
          },
          {
            label: "食物",
            key: "food",
          },
        ],
      },
      {
        type: "group",
        label: "人物",
        key: "people",
        icon: renderIcon(PersonIcon),
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "饮品",
            key: "beverage",
            icon: renderIcon(WineIcon),
          },
          {
            label: "食物",
            key: "food",
          },
        ],
      },
      {
        type: "group",
        label: "人物",
        key: "people",
        icon: renderIcon(PersonIcon),
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "饮品",
            key: "beverage",
            icon: renderIcon(WineIcon),
          },
          {
            label: "食物",
            key: "food",
          },
        ],
      },
      {
        type: "group",
        label: "人物",
        key: "people",
        icon: renderIcon(PersonIcon),
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "饮品",
            key: "beverage",
            icon: renderIcon(WineIcon),
          },
          {
            label: "食物",
            key: "food",
          },
        ],
      },
      {
        type: "group",
        label: "人物",
        key: "people",
        icon: renderIcon(PersonIcon),
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "饮品",
            key: "beverage",
            icon: renderIcon(WineIcon),
          },
          {
            label: "食物",
            key: "food",
          },
        ],
      },
      {
        type: "group",
        label: "人物",
        key: "people",
        icon: renderIcon(PersonIcon),
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "饮品",
            key: "beverage",
            icon: renderIcon(WineIcon),
          },
          {
            label: "食物",
            key: "food",
          },
        ],
      },
      {
        type: "group",
        label: "人物",
        key: "people",
        icon: renderIcon(PersonIcon),
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "饮品",
            key: "beverage",
            icon: renderIcon(WineIcon),
          },
          {
            label: "食物",
            key: "food",
          },
        ],
      },

      {
        label: "过去增多，未来减少",
        key: "the-past-increases-the-future-recedes",
      },
    ],
  },
];

export default defineComponent({
  name: "SiderBar",
  components: { HomeIcon, BagIcon, DocIcon, CartIcon },
  setup() {
    const router = useRouter();
    return { router, menuOptions };
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/index.scss";
.n-layout,
.n-layout-sider {
  // width: 50px;
  height: 100%;
  background: $light-gray;
}
</style>