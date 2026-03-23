<template>
  <div class="shipper-order-list">
    <div class="header">
      <h1>我的运单</h1>
    </div>
    
    <!-- 状态筛选 -->
    <div class="status-filter">
      <div class="filter-tabs">
        <div 
          v-for="status in statuses" 
          :key="status.value"
          class="filter-tab"
          :class="{ active: activeStatus === status.value }"
          @click="activeStatus = status.value"
        >
          {{ status.label }}
        </div>
      </div>
    </div>
    
    <!-- 运单列表 -->
    <div class="order-list">
      <div 
        v-for="order in filteredOrders" 
        :key="order.id"
        class="order-item"
        :class="order.status"
        @click="navigateTo(`/shipper/order/detail/${order.id}`)"
      >
        <div class="order-header">
          <div class="order-no">{{ order.orderNo }}</div>
          <div class="order-status" :class="order.status">{{ order.status }}</div>
        </div>
        <div class="order-content">
          <div class="order-goods">{{ order.goodsName }} {{ order.weight }}</div>
          <div class="order-route">{{ order.origin }} → {{ order.destination }}</div>
          <div class="order-time">{{ order.createTime }}</div>
        </div>
      </div>
      <div v-if="filteredOrders.length === 0" class="empty-order">
        暂无运单
      </div>
    </div>
    
    <ShipperTabbar />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ShipperTabbar from '../../components/mobile/ShipperTabbar.vue'

const router = useRouter()
const loading = ref(false)
const finished = ref(false)
const activeStatus = ref('all')

// 运单状态
const statuses = [
  { value: 'all', label: '全部' },
  { value: '待调度', label: '待调度' },
  { value: '已派车', label: '已派车' },
  { value: '装货中', label: '装货中' },
  { value: '运输中', label: '运输中' },
  { value: '已签收', label: '已签收' },
  { value: '已结算', label: '已结算' }
]

// 运单数据
const orders = ref([
  {
    id: 1,
    orderNo: 'ORD20240101001',
    status: '待调度',
    goodsName: '煤炭',
    weight: '50吨',
    origin: '山西大同',
    destination: '河北唐山',
    createTime: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    orderNo: 'ORD20240102002',
    status: '运输中',
    goodsName: '钢材',
    weight: '30吨',
    origin: '上海',
    destination: '杭州',
    createTime: '2024-01-02 14:30:00'
  },
  {
    id: 3,
    orderNo: 'ORD20240103003',
    status: '已签收',
    goodsName: '粮食',
    weight: '20吨',
    origin: '黑龙江',
    destination: '北京',
    createTime: '2024-01-03 09:00:00'
  },
  {
    id: 4,
    orderNo: 'ORD20240104004',
    status: '已结算',
    goodsName: '化肥',
    weight: '40吨',
    origin: '山东临沂',
    destination: '河南郑州',
    createTime: '2024-01-04 11:00:00'
  },
  {
    id: 5,
    orderNo: 'ORD20240105005',
    status: '已派车',
    goodsName: '水泥',
    weight: '60吨',
    origin: '安徽芜湖',
    destination: '江苏南京',
    createTime: '2024-01-05 08:30:00'
  },
  {
    id: 6,
    orderNo: 'ORD20240106006',
    status: '装货中',
    goodsName: '木材',
    weight: '35吨',
    origin: '江西九江',
    destination: '湖北武汉',
    createTime: '2024-01-06 13:00:00'
  },
  {
    id: 7,
    orderNo: 'ORD20240107007',
    status: '待调度',
    goodsName: '石油',
    weight: '55吨',
    origin: '山东东营',
    destination: '山东济南',
    createTime: '2024-01-07 09:30:00'
  },
  {
    id: 8,
    orderNo: 'ORD20240108008',
    status: '运输中',
    goodsName: '电子产品',
    weight: '10吨',
    origin: '广东深圳',
    destination: '四川成都',
    createTime: '2024-01-08 15:00:00'
  }
])

// 筛选后的运单
const filteredOrders = computed(() => {
  if (activeStatus.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === activeStatus.value)
})

// 加载更多
const loadMore = () => {
  // 模拟加载更多数据
  setTimeout(() => {
    loading.value = false
    finished.value = true
  }, 1000)
}

// 导航到运单详情
const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.shipper-order-list {
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

.status-filter {
  background-color: white;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-tabs {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 10px;
}

.filter-tab {
  padding: 15px 20px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.filter-tab.active {
  color: #1989fa;
  font-weight: bold;
}

.filter-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  height: 2px;
  background-color: #1989fa;
  border-radius: 2px;
}

.order-list {
  padding: 10px;
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
}

.order-status.待调度 {
  background-color: #e3f2fd;
  color: #2196f3;
}

.order-status.已派车 {
  background-color: #e8f5e8;
  color: #4caf50;
}

.order-status.装货中 {
  background-color: #fff3e0;
  color: #ff9800;
}

.order-status.运输中 {
  background-color: #f3e5f5;
  color: #9c27b0;
}

.order-status.已签收 {
  background-color: #e0f7fa;
  color: #00acc1;
}

.order-status.已结算 {
  background-color: #f9fbe7;
  color: #8bc34a;
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

.order-time {
  font-size: 12px;
  color: #999;
}

.empty-order {
  text-align: center;
  padding: 40px 0;
  color: #999;
  font-size: 14px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>