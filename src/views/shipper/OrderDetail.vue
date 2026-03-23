<template>
  <div class="shipper-order-detail">
    <div class="header">
      <div class="nav-bar">
        <div class="nav-left" @click="navigateBack">返回</div>
        <div class="nav-title">运单详情</div>
        <div class="nav-right"></div>
      </div>
    </div>
    
    <!-- 运单基本信息 -->
    <div class="card">
      <div class="order-basic">
        <div class="order-no">运单号：ORD20240101001</div>
        <div class="order-status status-待调度">待调度</div>
      </div>
      <div class="info-item">
        <span class="label">货物信息：</span>
        <span class="value">煤炭 50吨 30立方米</span>
      </div>
      <div class="info-item">
        <span class="label">装货地点：</span>
        <span class="value">山西大同 山西省大同市矿区煤场</span>
      </div>
      <div class="info-item">
        <span class="label">卸货地点：</span>
        <span class="value">河北唐山 河北省唐山市曹妃甸区钢铁厂</span>
      </div>
      <div class="info-item">
        <span class="label">运输方式：</span>
        <span class="value">整车</span>
      </div>
      <div class="info-item">
        <span class="label">车型：</span>
        <span class="value">重型卡车</span>
      </div>
      <div class="info-item">
        <span class="label">装货时间：</span>
        <span class="value">2024-01-01 10:00:00</span>
      </div>
      <div class="info-item">
        <span class="label">预计到达：</span>
        <span class="value">2024-01-02 18:00:00</span>
      </div>
      <div class="info-item">
        <span class="label">创建时间：</span>
        <span class="value">2024-01-01 09:00:00</span>
      </div>
      <div class="info-item">
        <span class="label">运费：</span>
        <span class="value">5000元</span>
      </div>
      <div class="info-item">
        <span class="label">支付状态：</span>
        <span class="value">待支付</span>
      </div>
      <div class="info-item">
        <span class="label">备注：</span>
        <span class="value">请确保货物包装完好，避免雨淋</span>
      </div>
    </div>
    
    <!-- 实时运输轨迹 -->
    <div class="card">
      <div class="card-title">实时运输轨迹</div>
      <div class="map-container">
        <div class="map-placeholder">
          <div class="map-marker origin">装货点</div>
          <div class="map-line"></div>
          <div class="map-marker destination">卸货点</div>
          <div class="map-car" style="left: 10%"></div>
        </div>
        <div class="location-info">
          当前位置：山西大同市矿区
        </div>
      </div>
    </div>
    
    <!-- 节点时间线 -->
    <div class="card">
      <div class="card-title">运输节点</div>
      <div class="steps">
        <div class="step active">
          <div class="step-dot"></div>
          <div class="step-content">
            <div class="step-title">下单</div>
            <div class="step-description">2024-01-01 09:00:00</div>
          </div>
        </div>
        <div class="step">
          <div class="step-dot"></div>
          <div class="step-content">
            <div class="step-title">派车</div>
            <div class="step-description"></div>
          </div>
        </div>
        <div class="step">
          <div class="step-dot"></div>
          <div class="step-content">
            <div class="step-title">装货</div>
            <div class="step-description"></div>
          </div>
        </div>
        <div class="step">
          <div class="step-dot"></div>
          <div class="step-content">
            <div class="step-title">运输</div>
            <div class="step-description"></div>
          </div>
        </div>
        <div class="step">
          <div class="step-dot"></div>
          <div class="step-content">
            <div class="step-title">签收</div>
            <div class="step-description"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 司机/车辆信息 -->
    <div class="card">
      <div class="card-title">司机/车辆信息</div>
      <div class="info-item">
        <span class="label">司机姓名：</span>
        <span class="value">-</span>
      </div>
      <div class="info-item">
        <span class="label">联系电话：</span>
        <span class="value">-</span>
      </div>
      <div class="info-item">
        <span class="label">司机评分：</span>
        <span class="value">-星</span>
      </div>
      <div class="info-item">
        <span class="label">驾驶经验：</span>
        <span class="value">-</span>
      </div>
      <div class="info-item">
        <span class="label">车牌号：</span>
        <span class="value">-</span>
      </div>
      <div class="info-item">
        <span class="label">车型：</span>
        <span class="value">-</span>
      </div>
      <div class="info-item">
        <span class="label">载重：</span>
        <span class="value">-</span>
      </div>
      <div class="info-item">
        <span class="label">车长：</span>
        <span class="value">-</span>
      </div>
    </div>
    
    <!-- 磅单/回单 -->
    <div class="card">
      <div class="card-title">磅单/回单</div>
      <div class="documents">
        <div class="no-documents">
          暂无文档
        </div>
      </div>
    </div>
    
    <!-- 操作按钮 -->
    <div class="actions">
      <div class="button disabled">
        待调度
      </div>
    </div>
    
    <ShipperTabbar />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ShipperTabbar from '../../components/mobile/ShipperTabbar.vue'

const router = useRouter()
const route = useRoute()

// 模拟运单数据
const orderData = [
  {
    id: 1,
    orderNo: 'ORD20240101001',
    status: '待调度',
    goodsName: '煤炭',
    weight: '50吨',
    volume: '30立方米',
    origin: '山西大同 山西省大同市矿区煤场',
    destination: '河北唐山 河北省唐山市曹妃甸区钢铁厂',
    transportType: '整车',
    vehicleType: '重型卡车',
    loadingTime: '2024-01-01 10:00:00',
    estimatedArrivalTime: '2024-01-02 18:00:00',
    createTime: '2024-01-01 09:00:00',
    price: '5000元',
    paymentStatus: '待支付',
    remarks: '请确保货物包装完好，避免雨淋',
    currentLocation: '山西大同市矿区',
    carPosition: '10%',
    activeStep: 1,
    steps: {
      order: '2024-01-01 09:00:00',
      dispatch: '',
      loading: '',
      transport: '',
      sign: ''
    },
    driver: {
      name: '',
      phone: '',
      rating: '',
      experience: ''
    },
    vehicle: {
      licensePlate: '',
      type: '',
      loadCapacity: '',
      length: ''
    },
    documents: []
  },
  {
    id: 2,
    orderNo: 'ORD20240102002',
    status: '运输中',
    goodsName: '钢材',
    weight: '30吨',
    volume: '25立方米',
    origin: '上海 上海市嘉定区安亭镇安亭大道123号',
    destination: '杭州 杭州市西湖区文三路456号',
    transportType: '整车',
    vehicleType: '重型卡车',
    loadingTime: '2024-01-02 16:00:00',
    estimatedArrivalTime: '2024-01-03 10:00:00',
    createTime: '2024-01-02 14:30:00',
    price: '3000元',
    paymentStatus: '待支付',
    remarks: '请确保货物包装完好，避免雨淋',
    currentLocation: '上海市嘉定区安亭镇',
    carPosition: '40%',
    activeStep: 3,
    steps: {
      order: '2024-01-02 14:30:00',
      dispatch: '2024-01-02 15:00:00',
      loading: '2024-01-02 16:00:00',
      transport: '2024-01-02 17:00:00',
      sign: ''
    },
    driver: {
      name: '李四',
      phone: '13900139000',
      rating: '4.8',
      experience: '5年'
    },
    vehicle: {
      licensePlate: '京A12345',
      type: '重型卡车',
      loadCapacity: '40吨',
      length: '13米'
    },
    documents: [
      {
        id: 1,
        name: '磅单',
        time: '2024-01-02 16:30:00',
        url: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        name: '装货单',
        time: '2024-01-02 16:45:00',
        url: 'https://via.placeholder.com/150'
      }
    ]
  },
  {
    id: 3,
    orderNo: 'ORD20240103003',
    status: '已签收',
    goodsName: '粮食',
    weight: '20吨',
    volume: '40立方米',
    origin: '黑龙江 黑龙江省哈尔滨市香坊区',
    destination: '北京 北京市朝阳区',
    transportType: '整车',
    vehicleType: '厢式货车',
    loadingTime: '2024-01-03 09:00:00',
    estimatedArrivalTime: '2024-01-04 18:00:00',
    createTime: '2024-01-03 08:00:00',
    price: '2500元',
    paymentStatus: '已支付',
    remarks: '请保持车厢通风，避免受潮',
    currentLocation: '北京市朝阳区',
    carPosition: '100%',
    activeStep: 4,
    steps: {
      order: '2024-01-03 08:00:00',
      dispatch: '2024-01-03 08:30:00',
      loading: '2024-01-03 09:00:00',
      transport: '2024-01-03 10:00:00',
      sign: '2024-01-04 18:00:00'
    },
    driver: {
      name: '张三',
      phone: '13800138000',
      rating: '4.9',
      experience: '8年'
    },
    vehicle: {
      licensePlate: '京B67890',
      type: '厢式货车',
      loadCapacity: '25吨',
      length: '9.6米'
    },
    documents: [
      {
        id: 1,
        name: '磅单',
        time: '2024-01-03 09:30:00',
        url: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        name: '装货单',
        time: '2024-01-03 10:00:00',
        url: 'https://via.placeholder.com/150'
      },
      {
        id: 3,
        name: '回单',
        time: '2024-01-04 18:00:00',
        url: 'https://via.placeholder.com/150'
      }
    ]
  },
  {
    id: 4,
    orderNo: 'ORD20240104004',
    status: '已结算',
    goodsName: '化肥',
    weight: '40吨',
    volume: '35立方米',
    origin: '山东临沂 山东省临沂市兰山区化工路123号',
    destination: '河南郑州 河南省郑州市金水区农业路456号',
    transportType: '整车',
    vehicleType: '重型卡车',
    loadingTime: '2024-01-04 11:00:00',
    estimatedArrivalTime: '2024-01-05 12:00:00',
    createTime: '2024-01-04 10:00:00',
    price: '4000元',
    paymentStatus: '已支付',
    remarks: '请保持车厢清洁，避免与其他货物混装',
    currentLocation: '河南省郑州市金水区',
    carPosition: '100%',
    activeStep: 4,
    steps: {
      order: '2024-01-04 10:00:00',
      dispatch: '2024-01-04 10:30:00',
      loading: '2024-01-04 11:00:00',
      transport: '2024-01-04 12:00:00',
      sign: '2024-01-05 12:00:00'
    },
    driver: {
      name: '王五',
      phone: '13700137000',
      rating: '4.7',
      experience: '6年'
    },
    vehicle: {
      licensePlate: '鲁Q12345',
      type: '重型卡车',
      loadCapacity: '45吨',
      length: '13米'
    },
    documents: [
      {
        id: 1,
        name: '磅单',
        time: '2024-01-04 11:30:00',
        url: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        name: '装货单',
        time: '2024-01-04 12:00:00',
        url: 'https://via.placeholder.com/150'
      },
      {
        id: 3,
        name: '回单',
        time: '2024-01-05 12:00:00',
        url: 'https://via.placeholder.com/150'
      }
    ]
  }
]

// 根据路由参数获取运单ID
const orderId = computed(() => {
  const id = parseInt(route.params.id) || 1
  console.log('orderId:', id)
  return id
})

// 获取当前运单数据
const order = ref(orderData[0])

onMounted(() => {
  console.log('运单详情页加载，运单ID:', orderId.value)
  const foundOrder = orderData.find(o => o.id === orderId.value)
  console.log('foundOrder:', foundOrder)
  order.value = foundOrder || orderData[0]
  console.log('当前运单:', order.value)
})

// 预览图片
const previewImage = (url) => {
  // 模拟图片预览
  console.log('预览图片:', url)
}

// 确认签收
const confirmSign = () => {
  // 模拟确认签收
  console.log('确认签收运单:', order.value.orderNo)
  // 这里可以添加确认签收的逻辑
}

// 返回
const navigateBack = () => {
  router.back()
}
</script>

<style scoped>
.shipper-order-detail {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 70px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #1989fa;
  color: white;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  padding: 0 15px;
}

.nav-left {
  font-size: 14px;
  cursor: pointer;
}

.nav-title {
  font-size: 16px;
  font-weight: bold;
}

.nav-right {
  width: 40px;
}

.card {
  margin: 10px 15px;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
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

.status-待调度 {
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
  padding: 5px 0;
}

.label {
  width: 80px;
  color: #333;
  font-weight: bold;
  flex-shrink: 0;
}

.value {
  flex: 1;
  color: #666;
  word-break: break-word;
}

.map-container {
  position: relative;
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

.location-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
}

.steps {
  margin-left: 10px;
}

.step {
  display: flex;
  margin-bottom: 15px;
  position: relative;
}

.step::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 16px;
  bottom: -15px;
  width: 2px;
  background-color: #e5e5e5;
  z-index: 1;
}

.step:last-child::before {
  display: none;
}

.step-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #e5e5e5;
  margin-right: 10px;
  position: relative;
  z-index: 2;
}

.step.active .step-dot {
  background-color: #1989fa;
}

.step-content {
  flex: 1;
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

.documents {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.no-documents {
  text-align: center;
  padding: 20px;
  color: #999;
}

.actions {
  margin: 20px 15px;
  display: flex;
  gap: 10px;
}

.button {
  flex: 1;
  height: 44px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.button.primary {
  background-color: #1989fa;
  color: white;
}

.button.disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}
</style>