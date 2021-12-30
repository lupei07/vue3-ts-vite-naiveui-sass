<!--
 * @Author: lu
 * @Date: 2021-11-29 15:19:32
 * @LastEditTime: 2021-12-16 14:45:08
 * @FilePath: \vue-ts-erp\src\views\Manage.vue
 * @Description: 
-->
<template>
  <div class="manage flex flex-column">
    <Header />
    <div class="flex flex-1">
      <!-- <SideBar /> -->
      <SideMenu />
      <div class="flex flex-1 flex-column" style="overflow: auto">
        <n-breadcrumb>
          <n-breadcrumb-item href="#"> 北京总行 </n-breadcrumb-item>
          <n-breadcrumb-item href="#"> 天津分行 </n-breadcrumb-item>
          <n-breadcrumb-item href="#"> 平山道支行 </n-breadcrumb-item>
        </n-breadcrumb>
        <router-view>
          <template #default="{ Component, route }">
            <transition name="fade" mode="out-in" appear>
              <keep-alive v-if="route.meta.keepAlive">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
              <component v-else :is="Component" :key="route.fullPath" />
            </transition>
          </template>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMessage } from "naive-ui";
import Header from "@/components/layout/Header.vue";
import SideBar from "@/components/layout/SideBar.vue";
import SideMenu from "@/components/layout/sideMenu/SideMenu.vue";
// import HelloWorld from "../components/HelloWorld";
export default defineComponent({
  name: "Manage",
  components: { Header, SideMenu, SideBar },
  setup() {
    window.$message = useMessage();
    return {};
  },
});
</script>
<style lang="scss" scoped>
.manage {
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s out-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
