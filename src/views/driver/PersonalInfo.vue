<template>
  <div class="driver-personal-info">
    <div class="header">
      <div class="nav-bar">
        <div class="nav-left" @click="navigateBack">
          ← 返回
        </div>
        <div class="nav-title">个人信息</div>
        <div class="nav-right"></div>
      </div>
    </div>
    
    <div class="card">
      <div class="info-item">
        <span class="label">姓名</span>
        <span class="value">{{ userInfo.name }}</span>
      </div>
      <div class="info-item">
        <span class="label">手机号</span>
        <span class="value">{{ userInfo.phone }}</span>
      </div>
      <div class="info-item">
        <span class="label">驾驶证号</span>
        <span class="value">{{ userInfo.licenseNo }}</span>
      </div>
      <div class="info-item">
        <span class="label">从业资格证</span>
        <span class="value">{{ userInfo.qualificationNo }}</span>
      </div>
      <div class="info-item">
        <span class="label">车辆信息</span>
        <span class="value">{{ userInfo.licensePlate }} {{ userInfo.vehicleType }}</span>
      </div>
      <div class="info-item">
        <span class="label">车辆载重</span>
        <span class="value">{{ userInfo.weight }}</span>
      </div>
      <div class="info-item">
        <span class="label">车辆长度</span>
        <span class="value">{{ userInfo.length }}</span>
      </div>
    </div>
    
    <div class="button primary" @click="editInfo">
      编辑信息
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟用户信息
const userInfo = ref({
  name: '李四',
  phone: '13900139000',
  licenseNo: '130123199001011234',
  qualificationNo: '1234567890',
  licensePlate: '京A12345',
  vehicleType: '重型卡车',
  weight: '40吨',
  length: '13米'
})

// 编辑信息
const editInfo = () => {
  // 模拟编辑信息
  console.log('编辑信息')
  alert('编辑功能暂未开放')
}

// 返回
const navigateBack = () => {
  router.back()
}
</script>

<style scoped>
.driver-personal-info {
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

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  color: #666;
  font-size: 14px;
}

.value {
  color: #333;
  font-size: 14px;
  flex: 1;
  text-align: right;
  margin-left: 15px;
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