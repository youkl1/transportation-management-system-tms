<template>
  <div class="entry-container">
    <div class="entry-content">
      <div class="logo">
        <h1>大宗物流TMS</h1>
        <p>Transportation Management System</p>
      </div>
      <div class="buttons">
        <van-button type="primary" size="large" @click="navigateToLogin('shipper')">
          货主端（小程序）
        </van-button>
        <van-button type="primary" size="large" @click="navigateToLogin('driver')">
          司机端（小程序）
        </van-button>
        <van-button type="primary" size="large" @click="navigateToLogin('web')">
          运营管理后台（WEB端）
        </van-button>
      </div>
      <div class="footer">
        <p>版本号：v1.0.0</p>
        <p>© 2024 大宗物流TMS系统 版权所有</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToLogin = (type) => {
  router.push(`/login/${type}`)
}
</script>

<style scoped>
.entry-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.entry-content {
  width: 90%;
  max-width: 400px;
  padding: 40px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  margin-bottom: 40px;
}

.logo h1 {
  font-size: 24px;
  color: #1989fa;
  margin-bottom: 8px;
}

.logo p {
  font-size: 14px;
  color: #999;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.footer {
  font-size: 12px;
  color: #999;
}

.footer p {
  margin: 4px 0;
}
</style>