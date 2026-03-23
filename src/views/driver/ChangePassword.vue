<template>
  <div class="driver-change-password">
    <div class="header">
      <div class="nav-bar">
        <div class="nav-left" @click="navigateBack">
          ← 返回
        </div>
        <div class="nav-title">修改密码</div>
        <div class="nav-right"></div>
      </div>
    </div>
    
    <div class="card">
      <div class="form-item">
        <label class="form-label">原密码</label>
        <input 
          type="password" 
          class="form-input" 
          v-model="oldPassword"
          placeholder="请输入原密码"
        />
      </div>
      <div class="form-item">
        <label class="form-label">新密码</label>
        <input 
          type="password" 
          class="form-input" 
          v-model="newPassword"
          placeholder="请输入新密码"
        />
      </div>
      <div class="form-item">
        <label class="form-label">确认新密码</label>
        <input 
          type="password" 
          class="form-input" 
          v-model="confirmPassword"
          placeholder="请确认新密码"
        />
      </div>
    </div>
    
    <div class="button primary" @click="changePassword">
      确认修改
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 密码数据
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// 修改密码
const changePassword = () => {
  // 简单验证
  if (!oldPassword.value) {
    alert('请输入原密码')
    return
  }
  if (!newPassword.value) {
    alert('请输入新密码')
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    alert('两次输入的密码不一致')
    return
  }
  
  // 模拟修改密码
  console.log('修改密码', oldPassword.value, newPassword.value)
  alert('密码修改成功！')
  router.back()
}

// 返回
const navigateBack = () => {
  router.back()
}
</script>

<style scoped>
.driver-change-password {
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1989fa;
  color: white;
  padding: 12px 16px;
  height: 44px;
}

.nav-left {
  font-size: 14px;
  cursor: pointer;
}

.nav-title {
  font-size: 16px;
  font-weight: bold;
  flex: 1;
  text-align: center;
}

.nav-right {
  width: 50px;
}

.card {
  background-color: white;
  margin: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.form-item {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #1989fa;
}

.button {
  display: block;
  width: 90%;
  margin: 20px auto;
  padding: 12px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button.primary {
  background-color: #1989fa;
  color: white;
}

.button.primary:hover {
  background-color: #096dd9;
}
</style>