<template>
  <div class="driver-order-list">
    <div class="header">
      <h1>运单管理</h1>
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
        <div class="order-actions" v-if="order.status === '待接单'">
          <div class="accept-button" @click.stop="acceptOrder(order.id)">
            接单
          </div>
        </div>
      </div>
      <div v-if="filteredOrders.length === 0" class="empty-order">
        暂无运单
      </div>
    </div>
    
    <DriverTabbar />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import DriverTabbar from '../../components/mobile/DriverTabbar.vue'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const finished = ref(false)
const activeStatus = ref('all')

// 运单状态
const statuses = [
  { value: 'all', label: '全部' },
  { value: '待接单', label: '待接单' },
  { value: '运输中', label: '运输中' },
  { value: '已签收', label: '已签收' },
  { value: '已结算', label: '已结算' }
]

// 运单数据
const orders = ref([
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
  },
  {
    id: 3,
    orderNo: 'ORD20240103003',
    status: '已签收',
    goodsName: '粮食',
    weight: '20吨',
    origin: '黑龙江',
    destination: '北京',
    price: '2000元'
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

// 接单
const acceptOrder = (orderId) => {
  // 模拟接单
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.status = '运输中'
  }
}

// 导航到运单详情
const navigateTo = (path) => {
  router.push(path)
}

// 初始化
onMounted(() => {
  // 从路由参数获取状态
  const status = route.query.status
  if (status) {
    activeStatus.value = status
  }
})
</script>

<style scoped>
.driver-order-list {
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
  padding: 15px 10px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 10px;
  position: relative;
}

.filter-tab.active {
  color: #1989fa;
  font-weight: bold;
}

.filter-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 10px;
  height: 2px;
  background-color: #1989fa;
}

.order-list {
  padding: 0 15px;
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

.order-actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.accept-button {
  padding: 6px 12px;
  background-color: #1989fa;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.accept-button:hover {
  background-color: #096dd9;
}

.empty-order {
  text-align: center;
  padding: 40px 0;
  color: #999;
  font-size: 14px;
}
</style>