<!--
 * @Author: lu
 * @Date: 2021-11-23 15:00:54
 * @LastEditTime: 2021-12-23 13:49:48
 * @FilePath: \vue-ts-erp\src\views\Login.vue
 * @Description: 
-->
<template>
  <div class="box flex flex-column">
    <div class="header">
      <div class="main flex flex-align">
        <img :src="path.loginLogo" alt="logo" />
        <p class="title fz-20">ERP登录页面</p>
      </div>
    </div>
    <div
      class="flex-1 content flex flex-end flex-align"
      :style="{ backgroundImage: 'url(' + path.loginBg + ')' }"
    >
      <div class="login-box">
        <h2 class="tit">欢迎登录</h2>
        <n-form
          :model="formValue"
          :rules="rules"
          ref="formRef"
          :show-label="false"
        >
          <n-form-item label="账号" path="username">
            <n-input
              v-model:value="formValue.username"
              placeholder="请输入登录账号"
            >
              <template #prefix>
                <n-icon>
                  <person-outline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input
              v-model:value="formValue.password"
              type="password"
              placeholder="请输入登录密码"
            >
              <template #prefix>
                <n-icon>
                  <Lock-closed-outline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item label>
            <n-button type="primary" @click="handleLogin" class="flex-1"
              >立即登录</n-button
            >
          </n-form-item>
        </n-form>
      </div>
    </div>
    <div class="footer">124</div>
  </div>
</template>
<script lang="ts">
import { PersonOutline, LockClosedOutline } from "@vicons/ionicons5";
import { defineComponent, ref } from "vue";
import md5 from "md5";
import { useMessage, NForm } from "naive-ui";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import VStorage from "../utils/storage";
import { regs } from "../utils/regular";
import { reqLogin } from "../api/index";
export default defineComponent({
  name: "App",
  components: { PersonOutline, LockClosedOutline },
  setup() {
    const message = useMessage();
    const store = useStore();
    const router = useRouter();
    const { path } = store.state;

    const formRef = ref(NForm);
    const formValue = ref({
      username: "",
      password: "",
    });
    const rules = {
      username: {
        required: true,
        trigger: ["blur"],
        validator(rule: object, value: any) {
          if (!value) {
            return new Error("请输入登录账号");
          } else if (!regs.username.test(value)) {
            return new Error("账号有误");
          }
          return true;
        },
      },
      password: {
        required: true,
        trigger: ["blur"],
        validator(rule: object, value: any) {
          if (!value) {
            return new Error("请输入登录密码");
          } else if (!regs.password.test(value)) {
            return new Error("密码有误");
          }
          return true;
        },
      },
    };
    // 登录
    const handleLogin = () => {
      let { username, password } = formValue.value;
      formRef.value.validate(async (errors: any) => {
        if (!errors) {
          const res: any = await reqLogin({
            username,
            password: md5(password),
          });
          if (res.status == 200) {
            VStorage.setItem("session_id", res.data.session_id);
            VStorage.setItem("login", res.data);
            router.push("/manage/");
          } else {
            message.error(res.msg);
          }
        }
      });
    };
    return { formRef, path, formValue, rules, handleLogin };
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/index.scss";
.box {
  height: 100%;
}
.header {
  height: 80px;
  .main {
    @extend .box;
    width: 1350px;
    margin: 0 auto;
    img {
      height: 44px;
    }
    .title {
      margin: 20px 0 0 10px;
      color: $deep-gray;
    }
  }
}
.content {
  background: url("../assets/images/bg.png") no-repeat top center;
  .login-box {
    width: 300px;
    min-height: 100px;
    background: $white;
    border-radius: 3px;
    padding: 40px 30px;
    margin-right: 12%;
    .tit {
      text-align: center;
      padding-bottom: 20px;
    }
  }
}
.footer {
  height: 160px;
}
</style>
