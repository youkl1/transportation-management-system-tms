<template>
  <div class="shipper-profile">
    <div class="header">
      <h1>个人中心</h1>
    </div>
    
    <!-- 个人信息 -->
    <div class="user-info-card">
      <div class="user-info">
        <div class="avatar">
          <van-icon name="user" size="48" />
        </div>
        <div class="info">
          <div class="name">{{ userInfo.name }}</div>
          <div class="contact">{{ userInfo.contact }} {{ userInfo.phone }}</div>
        </div>
      </div>
    </div>
    
    <!-- 统计信息 -->
    <div class="stats-card">
      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">{{ stats.totalOrders }}</div>
          <div class="stat-label">总运单</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.pendingOrders }}</div>
          <div class="stat-label">待处理</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.completedOrders }}</div>
          <div class="stat-label">已完成</div>
        </div>
      </div>
    </div>
    
    <!-- 功能列表 -->
    <div class="function-list">
      <div class="function-item" @click="editInfo">
        <span>个人信息</span>
        <van-icon name="arrow" />
      </div>
      <div class="function-item" @click="changePassword">
        <span>修改密码</span>
        <van-icon name="arrow" />
      </div>
      <div class="function-item" @click="manageAddress">
        <span>地址管理</span>
        <van-icon name="arrow" />
      </div>
      <div class="function-item" @click="manageVehicles">
        <span>常用车型</span>
        <van-icon name="arrow" />
      </div>
      <div class="function-item" @click="viewExpenses">
        <span>费用明细</span>
        <van-icon name="arrow" />
      </div>
      <div class="function-item" @click="aboutSystem">
        <span>关于系统</span>
        <van-icon name="arrow" />
      </div>
      <div class="function-item" @click="feedback">
        <span>意见反馈</span>
        <van-icon name="arrow" />
      </div>
    </div>
    
    <!-- 退出登录 -->
    <div class="logout-button" @click="logout">
      退出登录
    </div>
    
    <ShipperTabbar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import ShipperTabbar from '../../components/mobile/ShipperTabbar.vue'

const router = useRouter()
const userStore = useUserStore()

// 模拟用户信息
const userInfo = ref({
  name: '货主企业',
  contact: '张三',
  phone: '13800138000'
})

// 模拟统计数据
const stats = ref({
  totalOrders: 128,
  pendingOrders: 15,
  completedOrders: 113
})

// 编辑个人信息
const editInfo = () => {
  // 跳转到个人信息页面
  router.push('/shipper/personal-info')
}

// 修改密码
const changePassword = () => {
  // 跳转到修改密码页面
  router.push('/shipper/change-password')
}

// 地址管理
const manageAddress = () => {
  // 跳转到地址簿页面
  router.push('/shipper/address')
}

// 车辆管理
const manageVehicles = () => {
  // 跳转到车辆管理页面
  router.push('/shipper/vehicle-management')
}

// 费用明细
const viewExpenses = () => {
  // 跳转到费用明细页面
  router.push('/shipper/expense-detail')
}

// 关于系统
const aboutSystem = () => {
  // 跳转到关于系统页面
  router.push('/shipper/about-system')
}

// 意见反馈
const feedback = () => {
  // 跳转到意见反馈页面
  router.push('/shipper/feedback')
}

// 退出登录
const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.shipper-profile {
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

.user-info-card {
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  padding: 20px;
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

.info {
  flex: 1;
}

.name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.contact {
  font-size: 14px;
  color: #666;
}

.stats-card {
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.stats {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.stat-item {
  flex: 1;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #1989fa;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.function-list {
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.function-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.function-item:last-child {
  border-bottom: none;
}

.function-item span {
  font-size: 16px;
  color: #333;
}

.logout-button {
  background-color: white;
  margin: 20px 10px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 16px;
  color: #333;
  cursor: pointer;
}

.logout-button:active {
  background-color: #f5f5f5;
}
</style>