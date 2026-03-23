<template>
  <div class="web-dispatch">
    <Layout>
      <template #default>
        <el-card class="mb-4">
          <template #header>
            <div class="card-header">
              <span>调度管理</span>
            </div>
          </template>
          
          <!-- 待调度运单列表 -->
          <el-card class="mb-4">
            <template #header>
              <div class="card-header">
                <span>待调度运单</span>
              </div>
            </template>
            <el-table :data="pendingOrders" style="width: 100%">
              <el-table-column prop="orderNo" label="运单号" />
              <el-table-column prop="goodsName" label="货物名称" />
              <el-table-column prop="weight" label="重量" />
              <el-table-column prop="origin" label="装货点" />
              <el-table-column prop="destination" label="卸货点" />
              <el-table-column label="操作" width="150">
                <template #default="scope">
                  <el-button type="primary" size="small" @click="openDispatchDialog(scope.row)">
                    人工调度
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          
          <!-- 车辆定位监控 -->
          <el-card>
            <template #header>
              <div class="card-header">
                <span>车辆定位监控</span>
              </div>
            </template>
            <div class="map-container">
              <div class="map-placeholder">
                <div 
                  v-for="vehicle in vehicles" 
                  :key="vehicle.id"
                  class="map-vehicle"
                  :style="{ left: vehicle.position.x + '%', top: vehicle.position.y + '%' }"
                  :title="vehicle.licensePlate"
                >
                  <div class="vehicle-marker">
                    {{ vehicle.licensePlate }}
                  </div>
                </div>
              </div>
            </div>
            <div class="vehicle-list">
              <h3>车辆列表</h3>
              <el-table :data="vehicles" style="width: 100%">
                <el-table-column prop="licensePlate" label="车牌号" />
                <el-table-column prop="driver" label="司机" />
                <el-table-column prop="status" label="状态" />
                <el-table-column prop="position" label="位置" />
                <el-table-column prop="speed" label="速度" />
              </el-table>
            </div>
          </el-card>
        </el-card>
        
        <!-- 人工调度弹窗 -->
        <el-dialog
          v-model="dialogVisible"
          title="人工调度"
          width="500px"
        >
          <el-form :model="dispatchForm" label-width="100px">
            <el-form-item label="运单号">
              <el-input v-model="dispatchForm.orderNo" disabled />
            </el-form-item>
            <el-form-item label="货物信息">
              <el-input v-model="dispatchForm.goodsInfo" disabled />
            </el-form-item>
            <el-form-item label="运输路线">
              <el-input v-model="dispatchForm.route" disabled />
            </el-form-item>
            <el-form-item label="选择司机">
              <el-select v-model="dispatchForm.driverId" placeholder="请选择司机">
                <el-option 
                  v-for="driver in drivers" 
                  :key="driver.id" 
                  :label="driver.name" 
                  :value="driver.id" 
                />
              </el-select>
            </el-form-item>
            <el-form-item label="选择车辆">
              <el-select v-model="dispatchForm.vehicleId" placeholder="请选择车辆">
                <el-option 
                  v-for="vehicle in availableVehicles" 
                  :key="vehicle.id" 
                  :label="vehicle.licensePlate" 
                  :value="vehicle.id" 
                />
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="dispatchForm.remarks" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="confirmDispatch">确认调度</el-button>
            </span>
          </template>
        </el-dialog>
      </template>
    </Layout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Layout from '../../components/web/Layout.vue'

// 待调度运单
const pendingOrders = ref([
  {
    id: 1,
    orderNo: 'ORD20240101001',
    goodsName: '煤炭',
    weight: '50吨',
    origin: '山西大同',
    destination: '河北唐山'
  },
  {
    id: 2,
    orderNo: 'ORD20240104004',
    goodsName: '矿石',
    weight: '40吨',
    origin: '内蒙古',
    destination: '山东青岛'
  }
])

// 司机列表
const drivers = ref([
  { id: 1, name: '李四' },
  { id: 2, name: '王五' },
  { id: 3, name: '赵六' }
])

// 可用车辆
const availableVehicles = ref([
  { id: 1, licensePlate: '京A12345', type: '重型卡车' },
  { id: 2, licensePlate: '京B67890', type: '半挂车' }
])

// 车辆定位数据
const vehicles = ref([
  {
    id: 1,
    licensePlate: '京A12345',
    driver: '李四',
    status: '运输中',
    position: { x: 30, y: 40 },
    speed: '60km/h'
  },
  {
    id: 2,
    licensePlate: '京B67890',
    driver: '王五',
    status: '空闲',
    position: { x: 60, y: 60 },
    speed: '0km/h'
  },
  {
    id: 3,
    licensePlate: '京C13579',
    driver: '赵六',
    status: '运输中',
    position: { x: 80, y: 30 },
    speed: '50km/h'
  }
])

// 调度弹窗
const dialogVisible = ref(false)
const dispatchForm = ref({
  orderNo: '',
  goodsInfo: '',
  route: '',
  driverId: '',
  vehicleId: '',
  remarks: ''
})

// 打开调度弹窗
const openDispatchDialog = (order) => {
  dispatchForm.value = {
    orderNo: order.orderNo,
    goodsInfo: `${order.goodsName} ${order.weight}`,
    route: `${order.origin} → ${order.destination}`,
    driverId: '',
    vehicleId: '',
    remarks: ''
  }
  dialogVisible.value = true
}

// 确认调度
const confirmDispatch = () => {
  console.log('确认调度:', dispatchForm.value)
  dialogVisible.value = false
}
</script>

<style scoped>
.web-dispatch {
  width: 100%;
  height: 100%;
}

.mb-4 {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.map-container {
  position: relative;
  height: 400px;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.map-placeholder {
  position: relative;
  height: 100%;
  width: 100%;
}

.map-vehicle {
  position: absolute;
  transform: translate(-50%, -50%);
}

.vehicle-marker {
  padding: 4px 8px;
  background-color: #1989fa;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.vehicle-list h3 {
  margin-bottom: 16px;
  color: #333;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>