<template>
  <div class="login-container">
    <div class="login-content">
      <div class="logo">
        <h1>大宗物流TMS</h1>
        <p>{{ loginTitle }}</p>
      </div>
      <van-form @submit="handleLogin" ref="loginForm">
        <van-field
          v-model="form.username"
          name="username"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请输入账号' }]"
        />
        <van-field
          v-model="form.password"
          name="password"
          label="密码"
          type="password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />

        <div class="form-actions">
          <van-checkbox v-model="form.remember">记住密码</van-checkbox>
          <van-checkbox v-model="form.autoLogin">自动登录</van-checkbox>
        </div>
        <van-button type="primary" native-type="submit" size="large" :loading="loading">
          登录
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../../stores/user'
import request from '../../utils/request'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const loginForm = ref(null)
const loading = ref(false)
const form = ref({
  username: 'test',
  password: 'test123',
  remember: false,
  autoLogin: false
})

const type = computed(() => route.params.type || 'shipper')

const loginTitle = computed(() => {
  const titles = {
    shipper: '货主端登录',
    driver: '司机端登录',
    web: '运营管理后台登录'
  }
  return titles[type.value] || '登录'
})

// 处理登录
const handleLogin = async () => {
  try {
    loading.value = true
    
    // 表单验证
    await loginForm.value.validate()
    
    // 模拟登录请求
    const data = await request.post('/login', {
      type: type.value,
      username: form.value.username,
      password: form.value.password
    })
    
    // 存储登录状态
    userStore.login(data.token, data.userInfo, data.role, data.permissions)
    
    // 跳转到对应端的首页
    if (type.value === 'shipper') {
      router.push('/shipper/home')
    } else if (type.value === 'driver') {
      router.push('/driver/home')
    } else if (type.value === 'web') {
      router.push('/web/home')
    }
  } catch (error) {
    console.error('登录失败:', error)
    // 显示错误信息
  } finally {
    loading.value = false
  }
}

// 初始化
onMounted(() => {
  // 从本地存储加载记住的密码
  const savedUsername = localStorage.getItem('savedUsername')
  const savedPassword = localStorage.getItem('savedPassword')
  if (savedUsername) {
    form.value.username = savedUsername
    form.value.remember = true
    if (savedPassword) {
      form.value.password = savedPassword
    }
  }
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-content {
  width: 90%;
  max-width: 400px;
  padding: 40px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.logo h1 {
  font-size: 24px;
  color: #1989fa;
  margin-bottom: 8px;
}

.logo p {
  font-size: 16px;
  color: #333;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.captcha {
  width: 100px;
  height: 40px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #1989fa;
  cursor: pointer;
  border-radius: 4px;
}
</style>