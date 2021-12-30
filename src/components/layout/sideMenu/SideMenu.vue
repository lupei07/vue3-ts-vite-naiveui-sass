<!--
 * @Author: lu
 * @Date: 2021-12-15 14:16:16
 * @LastEditTime: 2021-12-21 15:56:46
 * @FilePath: \vue-ts-erp\src\components\layout\sideMenu\SideMenu.vue
 * @Description: 
-->
<template>
  <div class="side-box" :class="show ? 'side-show' : 'side-hide'">
    <Inoicons
      class="toggle-btn"
      :size="30"
      icon="ListOutline"
      @click="handleToogle"
    />

    <div class="menu-box">
      <MenuItem
        v-for="(item, index) in menuOptions"
        :item="item"
        :expandedKeys="expandedKeys"
        @click.stop="changeExpandedKeys(item.level, item)"
      >
        <template v-if="item.children" v-slot:default>
          <n-collapse-transition :show="expandedKeys.includes(item.key)">
            <MenuItem
              v-for="(child, index) in item.children"
              :item="child"
              :expandedKeys="expandedKeys"
              @click.stop="changeExpandedKeys(child.level, child)"
            >
              <template v-if="child.children">
                <n-collapse-transition :show="expandedKeys.includes(child.key)">
                  <MenuItem
                    v-for="(grandson, index) in child.children"
                    :item="grandson"
                    :expandedKeys="expandedKeys"
                    @click.stop="changeExpandedKeys(grandson.level, grandson)"
                  ></MenuItem>
                </n-collapse-transition>
              </template>
            </MenuItem>
          </n-collapse-transition>
        </template>
      </MenuItem>
    </div>
  </div>
</template>
<script lang="ts">
import { h, defineComponent, ref, reactive } from "vue";
import MenuItem from "./MenuItem.vue";
import Inoicons from "@/components/ui/icon/Index.vue";
export default defineComponent({
  name: "SideMenu",
  components: {
    Inoicons,
    MenuItem,
  },
  setup() {
    const renderIcon = (icon: any) => {
      return () => h(Inoicons, { class: "m-icon", icon });
    };
    const menuOptions = [
      {
        label: "首页",
        key: "hear-the-wind-sing",
        level: "1",
        href: "/manage/home",
        expanded: false,
        icon: renderIcon("Home"),
      },
      {
        label: "订单管理",
        key: "order-manage",
        level: "1",
        icon: renderIcon("BagHandle"),
        disabled: true,
        expanded: false,
        children: [
          {
            label: "订单处理",
            href: "/manage/order-process",
            key: "order-process",
            level: "2",
          },
          {
            label: "订单查询",
            href: "/manage/order-list",
            key: "order-list",
            level: "2",
          },
        ],
      },
      {
        label: "仓库管理",
        key: "warehouse-manage",
        level: "1",
        icon: renderIcon("DocumentText"),
        disabled: true,
        expanded: false,
        children: [
          {
            label: "发货单",
            href: "/manage/invoice-list",
            key: "invoice-list",
            level: "2",
          },
        ],
      },
      {
        label: "舞，舞，舞",
        key: "dance-dance-dance",
        level: "1",
        icon: renderIcon("Cart"),
        expanded: false,
        children: [
          {
            type: "group",
            label: "人物",
            key: "people",
            level: "2",
            children: [
              {
                label: "叙事者",
                key: "narrator",
                level: "3",
              },
              {
                label: "羊男",
                key: "sheep-man",
                level: "3",
              },
            ],
          },
          {
            label: "饮品",
            key: "beverage",
            level: "2",
            children: [
              {
                label: "威士忌",
                key: "whisky",
                level: "3",
                href: "https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin",
              },
            ],
          },
          {
            label: "食物",
            key: "food",
            level: "2",
            children: [
              {
                label: "三明治",
                key: "sandwich",
                level: "3",
              },
            ],
          },
          {
            label: "过去增多，未来减少",
            key: "the-past-increases-the-future-recedes",
            level: "2",
          },
        ],
      },
    ];

    const show = ref(true);
    const handleToogle = () => {
      show.value = !show.value;
      expandedKeys.value = [];
    };
    const expandedKeys = ref(["dance-dance-dance"]); // 需要展开的菜单key
    const changeExpandedKeys = (levle: string, item: any) => {
      console.log(show.value);
      if (!show.value) return false;
      switch (levle) {
        case "1":
          expandedKeys.value = [];
          expandedKeys.value.push(item.key);
          break;
        default:
          expandedKeys.value.push(item.key);
      }
    };

    return {
      show,
      menuOptions: reactive(menuOptions),
      expandedKeys,
      handleToogle,
      changeExpandedKeys,
    };
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

  .toggle-btn {
    position: absolute;
    cursor: pointer;
    left: 57px;
    background: #fff;
    transition: left 0.5s;
  }
}
</style>
