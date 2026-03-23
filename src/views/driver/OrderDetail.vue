<template>
  <div class="driver-order-detail">
    <div class="header">
      <div class="nav-bar">
        <div class="nav-left" @click="navigateBack">
          ← 返回
        </div>
        <div class="nav-title">运单详情</div>
        <div class="nav-right"></div>
      </div>
    </div>
    
    <!-- 运单基本信息 -->
    <div class="card">
      <div class="order-basic">
        <div class="order-no">运单号：{{ order.orderNo }}</div>
        <div class="order-status" :class="`status-${order.status}`">{{ order.status }}</div>
      </div>
      <div class="info-item">
        <span class="label">货物信息：</span>
        <span class="value">{{ order.goodsName }} {{ order.weight }}</span>
      </div>
      <div class="info-item">
        <span class="label">运输路线：</span>
        <span class="value">{{ order.origin }} → {{ order.destination }}</span>
      </div>
      <div class="info-item">
        <span class="label">运费：</span>
        <span class="value price">{{ order.price }}</span>
      </div>
      <div class="info-item">
        <span class="label">创建时间：</span>
        <span class="value">{{ order.createTime }}</span>
      </div>
    </div>
    
    <!-- 导航 -->
    <div class="card">
      <div class="card-title">导航</div>
      <div class="button primary large" @click="openNavigation">
        查看导航路线
      </div>
      <div class="map-container">
        <div class="map-placeholder">
          <div class="map-marker origin">装货点</div>
          <div class="map-line"></div>
          <div class="map-marker destination">卸货点</div>
          <div class="map-car" :style="{ left: '40%' }"></div>
        </div>
      </div>
    </div>
    
    <!-- 运输节点 -->
    <div class="card">
      <div class="card-title">运输节点</div>
      <div class="steps-container">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="step-item"
          :class="{ active: index <= activeStep }"
        >
          <div class="step-icon">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-description" v-if="step.description">{{ step.description }}</div>
          </div>
          <div class="step-line" v-if="index < steps.length - 1"></div>
        </div>
      </div>
    </div>
    
    <!-- 操作按钮 -->
    <div class="actions">
      <div v-if="order.status === '运输中'" class="button primary large" @click="updateStatus">
        更新运输状态
      </div>
      <div v-if="order.status === '运输中'" class="button default large" @click="reportException">
        异常上报
      </div>
      <div v-if="order.status === '装货中'" class="button primary large" @click="uploadWeightBill">
        上传磅单
      </div>
      <div v-if="order.status === '卸货完成'" class="button primary large" @click="uploadReceipt">
        上传回单
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const orderId = route.params.id

// 模拟运单数据
const order = ref({
  id: orderId,
  orderNo: 'ORD20240102002',
  status: '运输中',
  goodsName: '钢材',
  weight: '30吨',
  origin: '上海',
  destination: '杭州',
  price: '3000元',
  createTime: '2024-01-02 14:30:00',
  timeline: {
    arriveOrigin: '2024-01-02 15:30:00',
    loading: '2024-01-02 16:30:00',
    transport: '2024-01-02 17:00:00',
    arriveDestination: '',
    unloading: ''
  }
})

// 步骤数据
const steps = ref([
  { title: '已到达装货点', description: order.value.timeline.arriveOrigin },
  { title: '装货完成', description: order.value.timeline.loading },
  { title: '运输中', description: order.value.timeline.transport },
  { title: '已到达卸货点', description: order.value.timeline.arriveDestination },
  { title: '卸货完成', description: order.value.timeline.unloading }
])

// 活跃步骤
const activeStep = computed(() => {
  const statusMap = {
    '待接单': 0,
    '运输中': 2,
    '已到达卸货点': 3,
    '卸货完成': 4
  }
  return statusMap[order.value.status] || 0
})

// 打开导航
const openNavigation = () => {
  // 模拟打开导航
  console.log('打开导航')
}

// 更新运输状态
const updateStatus = () => {
  // 模拟更新运输状态
  if (order.value.status === '运输中') {
    order.value.status = '已到达卸货点'
    order.value.timeline.arriveDestination = new Date().toLocaleString()
    // 更新步骤数据
    steps.value[3].description = order.value.timeline.arriveDestination
  } else if (order.value.status === '已到达卸货点') {
    order.value.status = '卸货完成'
    order.value.timeline.unloading = new Date().toLocaleString()
    // 更新步骤数据
    steps.value[4].description = order.value.timeline.unloading
  }
  console.log('更新运输状态为:', order.value.status)
}

// 异常上报
const reportException = () => {
  // 模拟异常上报
  const exceptionType = prompt('请选择异常类型：\n1. 车辆故障\n2. 道路拥堵\n3. 天气原因\n4. 其他')
  if (exceptionType) {
    const exceptionDesc = prompt('请描述异常情况：')
    if (exceptionDesc) {
      console.log('异常上报：', exceptionType, exceptionDesc)
      alert('异常上报成功！')
    }
  }
}

// 上传磅单
const uploadWeightBill = () => {
  // 模拟上传磅单
  console.log('上传磅单')
}

// 上传回单
const uploadReceipt = () => {
  // 模拟上传回单
  console.log('上传回单')
}

// 返回
const navigateBack = () => {
  router.back()
}
</script>

<style scoped>
.driver-order-detail {
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

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.order-basic {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.order-no {
  font-weight: bold;
  color: #333;
}

.order-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.status-待接单 {
  background-color: #f0f0f0;
  color: #666;
}

.status-运输中 {
  background-color: #e8f4ff;
  color: #1989fa;
}

.status-已签收 {
  background-color: #f0f9eb;
  color: #52c41a;
}

.info-item {
  display: flex;
  margin-bottom: 10px;
}

.label {
  width: 80px;
  color: #666;
  flex-shrink: 0;
}

.value {
  flex: 1;
  color: #333;
}

.value.price {
  color: #52c41a;
  font-weight: bold;
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
  margin-bottom: 10px;
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
}

.button.default:hover {
  background-color: #f5f5f5;
}

.button.large {
  padding: 14px;
  font-size: 16px;
}

.map-container {
  margin-top: 10px;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.map-placeholder {
  position: relative;
  height: 100%;
  padding: 20px;
}

.map-marker {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 4px 8px;
  background-color: white;
  border-radius: 4px;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.map-marker.origin {
  left: 20px;
}

.map-marker.destination {
  right: 20px;
}

.map-line {
  position: absolute;
  top: 50%;
  left: 100px;
  right: 100px;
  height: 2px;
  background-color: #1989fa;
  transform: translateY(-50%);
}

.map-car {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: #1989fa;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.actions {
  margin: 20px 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.steps-container {
  position: relative;
  padding-left: 20px;
}

.step-item {
  position: relative;
  margin-bottom: 20px;
}

.step-icon {
  position: absolute;
  left: -20px;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.step-item.active .step-icon {
  background-color: #1989fa;
  color: white;
}

.step-content {
  padding-left: 10px;
}

.step-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.step-description {
  font-size: 12px;
  color: #999;
}

.step-line {
  position: absolute;
  left: -10px;
  top: 20px;
  bottom: -20px;
  width: 2px;
  background-color: #f0f0f0;
}

.step-item.active .step-line {
  background-color: #1989fa;
}

.step-item:last-child .step-line {
  display: none;
}
</style>