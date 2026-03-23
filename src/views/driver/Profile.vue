<template>
  <div class="driver-profile">
    <div class="header">
      <h1>个人中心</h1>
    </div>
    
    <!-- 个人信息 -->
    <div class="card">
      <div class="user-info">
        <div class="avatar">
          <div class="avatar-icon">👤</div>
        </div>
        <div class="info">
          <div class="name">{{ userInfo.name }}</div>
          <div class="phone">{{ userInfo.phone }}</div>
          <div class="vehicle">{{ userInfo.licensePlate }} {{ userInfo.vehicleType }}</div>
        </div>
      </div>
    </div>
    
    <!-- 我的收入 -->
    <div class="card">
      <div class="card-title">我的收入</div>
      <div class="income-item">
        <span class="label">今日收入</span>
        <span class="value">{{ todayIncome }}元</span>
      </div>
      <div class="income-item">
        <span class="label">本月收入</span>
        <span class="value">{{ monthIncome }}元</span>
      </div>
      <div class="button primary" @click="viewIncomeRecords">
        查看结算记录
      </div>
    </div>
    
    <!-- 功能列表 -->
    <div class="cell-group">
      <div class="cell" @click="editInfo">
        <span class="cell-title">个人信息</span>
        <span class="cell-arrow">→</span>
      </div>
      <div class="cell" @click="changePassword">
        <span class="cell-title">修改密码</span>
        <span class="cell-arrow">→</span>
      </div>
      <div class="cell" @click="aboutSystem">
        <span class="cell-title">关于系统</span>
        <span class="cell-arrow">→</span>
      </div>
    </div>
    
    <!-- 退出登录 -->
    <div class="button default" @click="logout">
      退出登录
    </div>
    
    <DriverTabbar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import DriverTabbar from '../../components/mobile/DriverTabbar.vue'

const router = useRouter()
const userStore = useUserStore()

// 模拟用户信息
const userInfo = ref({
  name: '李四',
  phone: '13900139000',
  licensePlate: '京A12345',
  vehicleType: '重型卡车',
  weight: '40吨',
  length: '13米'
})

// 收入信息
const todayIncome = ref(3000)
const monthIncome = ref(75000)

// 编辑个人信息
const editInfo = () => {
  router.push('/driver/personal-info')
}

// 修改密码
const changePassword = () => {
  router.push('/driver/change-password')
}

// 关于系统
const aboutSystem = () => {
  router.push('/driver/about-system')
}

// 查看收入记录
const viewIncomeRecords = () => {
  router.push('/driver/income-records')
}

// 退出登录
const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.driver-profile {
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
}

.header {
  background-color: #1989fa;
  color: white;
  padding: 20px;
  text-align: center;
}

.header h1 {
  font-size: 18px;
  font-weight: bold;
}

.card {
  background-color: white;
  margin: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e8f4ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.avatar-icon {
  font-size: 32px;
}

.info {
  flex: 1;
}

.name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.phone {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.vehicle {
  font-size: 14px;
  color: #666;
}

.income-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.income-item:last-child {
  margin-bottom: 15px;
}

.label {
  color: #666;
}

.value {
  font-weight: bold;
  color: #52c41a;
  font-size: 16px;
}

.button {
  display: block;
  width: 100%;
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

.button.default {
  background-color: white;
  color: #333;
  border: 1px solid #d9d9d9;
  margin: 15px auto;
  width: calc(100% - 30px);
}

.button.default:hover {
  background-color: #f5f5f5;
}

.cell-group {
  background-color: white;
  margin: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cell:hover {
  background-color: #f5f5f5;
}

.cell:last-child {
  border-bottom: none;
}

.cell-title {
  font-size: 14px;
  color: #333;
}

.cell-arrow {
  font-size: 14px;
  color: #999;
}
</style>