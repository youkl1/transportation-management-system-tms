<template>
  <div class="driver-home">
    <div class="header">
      <h1>司机工作台</h1>
    </div>
    
    <!-- 快捷入口 -->
    <div class="quick-actions">
      <div class="action-grid">
        <div class="action-item" @click="navigateTo('/driver/order/list?status=待接单')">
          <div class="action-icon">⏰</div>
          <div class="action-text">待接单</div>
        </div>
        <div class="action-item" @click="navigateTo('/driver/order/list?status=运输中')">
          <div class="action-icon">📍</div>
          <div class="action-text">运输中</div>
        </div>
        <div class="action-item" @click="navigateTo('/driver/order/list?status=已签收')">
          <div class="action-icon">📄</div>
          <div class="action-text">我的回单</div>
        </div>
      </div>
    </div>
    
    <!-- 数据概览 -->
    <div class="data-overview">
      <h2>数据概览</h2>
      <div class="data-card">
        <div class="data-item">
          <span class="data-label">今日待送运单数</span>
          <span class="data-value">{{ todayOrders }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">本月完成运单数</span>
          <span class="data-value">{{ monthCompletedOrders }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">本月运费收入</span>
          <span class="data-value">{{ monthIncome }}元</span>
        </div>
      </div>
    </div>
    
    <!-- 最近运单 -->
    <div class="recent-orders">
      <h2>最近运单</h2>
      <div class="order-list">
        <div 
          v-for="order in recentOrders" 
          :key="order.id"
          class="order-item"
          @click="navigateTo(`/driver/order/detail/${order.id}`)"
        >
          <div class="order-header">
            <div class="order-no">{{ order.orderNo }}</div>
            <div class="order-status">{{ order.status }}</div>
          </div>
          <div class="order-content">
            <div class="order-goods">{{ order.goodsName }} {{ order.weight }}</div>
            <div class="order-route">{{ order.origin }} → {{ order.destination }}</div>
            <div class="order-price" v-if="order.price">运费：{{ order.price }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <DriverTabbar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DriverTabbar from '../../components/mobile/DriverTabbar.vue'

const router = useRouter()

// 数据概览
const todayOrders = ref(2)
const monthCompletedOrders = ref(15)
const monthIncome = ref(75000)

// 最近运单
const recentOrders = ref([
  {
    id: 1,
    orderNo: 'ORD20240101001',
    status: '待接单',
    goodsName: '煤炭',
    weight: '50吨',
    origin: '山西大同',
    destination: '河北唐山',
    price: '5000元'
  },
  {
    id: 2,
    orderNo: 'ORD20240102002',
    status: '运输中',
    goodsName: '钢材',
    weight: '30吨',
    origin: '上海',
    destination: '杭州',
    price: '3000元'
  }
])

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.driver-home {
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 50px;
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

.quick-actions {
  margin: 20px 0;
  background-color: white;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-grid {
  display: flex;
  justify-content: space-around;
  padding: 0 10px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 15px 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-item:hover {
  transform: translateY(-2px);
}

.action-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.action-text {
  font-size: 14px;
  color: #333;
}

.data-overview {
  margin: 0 15px 20px;
}

.data-overview h2 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

.data-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.data-item:last-child {
  border-bottom: none;
}

.data-label {
  color: #666;
}

.data-value {
  font-weight: bold;
  color: #1989fa;
}

.recent-orders {
  margin: 0 15px;
}

.recent-orders h2 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

.order-list {
  padding: 0;
}

.order-item {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.order-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.order-no {
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

.order-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  background-color: #e3f2fd;
  color: #2196f3;
}

.order-content {
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
}

.order-goods {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.order-route {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.order-price {
  font-size: 12px;
  color: #52c41a;
  font-weight: bold;
}
</style>