<template>
  <div class="shipper-change-password">
    <div class="header">
      <div class="back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <h1>修改密码</h1>
      <div class="placeholder"></div>
    </div>
    
    <div class="form-card">
      <van-form @submit="submitPassword">
        <van-field
          v-model="form.oldPassword"
          name="oldPassword"
          label="原密码"
          placeholder="请输入原密码"
          type="password"
          :rules="[{ required: true, message: '请输入原密码' }]"
        />
        <van-field
          v-model="form.newPassword"
          name="newPassword"
          label="新密码"
          placeholder="请输入新密码"
          type="password"
          :rules="[{ required: true, message: '请输入新密码' }]"
        />
        <van-field
          v-model="form.confirmPassword"
          name="confirmPassword"
          label="确认密码"
          placeholder="请再次输入新密码"
          type="password"
          :rules="[{ required: true, message: '请确认密码' }]"
        />
        <van-button type="primary" size="large" native-type="submit" class="submit-button">
          确认修改
        </van-button>
      </van-form>
    </div>
    
    <ShipperTabbar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import ShipperTabbar from '../../components/mobile/ShipperTabbar.vue'

const router = useRouter()

// 表单数据
const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 返回上一页
const goBack = () => {
  router.back()
}

// 提交密码修改
const submitPassword = () => {
  // 模拟密码修改
  if (form.value.newPassword !== form.value.confirmPassword) {
    showToast('两次输入的密码不一致')
    return
  }
  showToast('密码修改成功')
  setTimeout(() => {
    router.back()
  }, 1500)
}
</script>

<style scoped>
.shipper-change-password {
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
}

.header {
  background-color: #1989fa;
  color: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.header h1 {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.placeholder {
  width: 40px;
}

.form-card {
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.submit-button {
  margin-top: 20px;
}
</style>