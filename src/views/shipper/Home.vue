<template>
  <div class="shipper-home">
    <div class="header">
      <h1>货主工作台</h1>
    </div>
    
    <!-- 快捷入口 -->
    <div class="quick-actions">
      <div class="action-grid">
        <div class="action-item" @click="navigateTo('/shipper/order/create')">
          <div class="action-icon">📦</div>
          <div class="action-text">我要发货</div>
        </div>
        <div class="action-item" @click="navigateTo('/shipper/order/list')">
          <div class="action-icon">📋</div>
          <div class="action-text">我的运单</div>
        </div>
        <div class="action-item" @click="navigateTo('/shipper/order/list')">
          <div class="action-icon">📍</div>
          <div class="action-text">在途跟踪</div>
        </div>
      </div>
    </div>
    
    <!-- 数据概览 -->
    <div class="data-overview">
      <h2>数据概览</h2>
      <div class="data-card">
        <div class="data-item">
          <span class="data-label">本月发货量</span>
          <span class="data-value">120吨</span>
        </div>
        <div class="data-item">
          <span class="data-label">待签收运单数</span>
          <span class="data-value">5</span>
        </div>
        <div class="data-item">
          <span class="data-label">在途运单数</span>
          <span class="data-value">3</span>
        </div>
      </div>
    </div>
    
    <!-- 最近运单 -->
    <div class="recent-orders">
      <h2>最近运单</h2>
      <van-cell-group>
        <van-cell 
          v-for="order in recentOrders" 
          :key="order.id"
          :title="order.orderNo"
          :value="order.status"
          @click="navigateTo(`/shipper/order/detail/${order.id}`)"
        >
          <template #default>
            <div class="order-info">
              <div>{{ order.goodsName }} {{ order.weight }}</div>
              <div class="order-route">{{ order.origin }} → {{ order.destination }}</div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    
    <ShipperTabbar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ShipperTabbar from '../../components/mobile/ShipperTabbar.vue'

const router = useRouter()

// 最近运单模拟数据
const recentOrders = ref([
  {
    id: 1,
    orderNo: 'ORD20240101001',
    status: '待调度',
    goodsName: '煤炭',
    weight: '50吨',
    origin: '山西大同',
    destination: '河北唐山'
  },
  {
    id: 2,
    orderNo: 'ORD20240102002',
    status: '运输中',
    goodsName: '钢材',
    weight: '30吨',
    origin: '上海',
    destination: '杭州'
  },
  {
    id: 3,
    orderNo: 'ORD20240103003',
    status: '已签收',
    goodsName: '粮食',
    weight: '20吨',
    origin: '黑龙江',
    destination: '北京'
  },
  {
    id: 4,
    orderNo: 'ORD20240104004',
    status: '已结算',
    goodsName: '化肥',
    weight: '40吨',
    origin: '山东临沂',
    destination: '河南郑州'
  },
  {
    id: 5,
    orderNo: 'ORD20240105005',
    status: '待调度',
    goodsName: '水泥',
    weight: '60吨',
    origin: '安徽芜湖',
    destination: '江苏南京'
  }
])

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.shipper-home {
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

.order-info {
  flex: 1;
}

.order-route {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>