<template>
  <div class="shipper-vehicle-management">
    <div class="header">
      <div class="back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <h1>常用车型</h1>
      <div class="placeholder"></div>
    </div>
    
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMore"
    >
      <van-cell 
        v-for="vehicle in vehicles" 
        :key="vehicle.id"
        :title="vehicle.name"
        :value="vehicle.isDefault ? '默认' : ''"
        @click="editVehicle(vehicle)"
      >
        <template #default>
          <div class="vehicle-info">
            <div>{{ vehicle.type }}</div>
            <div class="vehicle-detail">{{ vehicle.capacity }} | {{ vehicle.size }}</div>
          </div>
        </template>
        <template #right>
          <van-button size="small" type="primary" @click.stop="setDefault(vehicle.id)">
            {{ vehicle.isDefault ? '默认' : '设为默认' }}
          </van-button>
        </template>
      </van-cell>
    </van-list>
    
    <!-- 添加车型按钮 -->
    <van-button type="primary" size="large" class="add-button" @click="addVehicle">
      添加车型
    </van-button>
    
    <!-- 添加车型弹窗 -->
    <van-popup v-model:show="showAddPopup" position="bottom" round>
      <div class="popup-content">
        <div class="popup-header">
          <h2>{{ editingVehicle ? '编辑车型' : '添加车型' }}</h2>
          <van-icon name="cross" @click="showAddPopup = false" />
        </div>
        <van-form @submit="submitVehicle">
          <van-field
            v-model="form.name"
            name="name"
            label="车型名称"
            placeholder="请输入车型名称"
            :rules="[{ required: true, message: '请输入车型名称' }]"
          />
          <van-field
            v-model="form.type"
            name="type"
            label="车型类型"
            placeholder="请输入车型类型"
            :rules="[{ required: true, message: '请输入车型类型' }]"
          />
          <van-field
            v-model="form.capacity"
            name="capacity"
            label="载重"
            placeholder="请输入载重"
            :rules="[{ required: true, message: '请输入载重' }]"
          />
          <van-field
            v-model="form.size"
            name="size"
            label="尺寸"
            placeholder="请输入尺寸"
            :rules="[{ required: true, message: '请输入尺寸' }]"
          />
          <van-field name="isDefault">
            <template #label>默认车型</template>
            <template #input>
              <van-switch v-model="form.isDefault" />
            </template>
          </van-field>
          <div class="popup-actions">
            <van-button type="default" @click="showAddPopup = false">取消</van-button>
            <van-button type="primary" native-type="submit">保存</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    
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
const showAddPopup = ref(false)
const editingVehicle = ref(null)

// 车型数据
const vehicles = ref([
  {
    id: 1,
    name: '重型卡车',
    type: '厢式货车',
    capacity: '10吨',
    size: '12米',
    isDefault: true
  },
  {
    id: 2,
    name: '中型卡车',
    type: '栏板货车',
    capacity: '5吨',
    size: '8米',
    isDefault: false
  },
  {
    id: 3,
    name: '轻型卡车',
    type: '厢式货车',
    capacity: '2吨',
    size: '4.2米',
    isDefault: false
  },
  {
    id: 4,
    name: '半挂车',
    type: '平板挂车',
    capacity: '20吨',
    size: '16米',
    isDefault: false
  }
])

// 表单数据
const form = ref({
  name: '',
  type: '',
  capacity: '',
  size: '',
  isDefault: false
})

// 返回上一页
const goBack = () => {
  router.back()
}

// 加载更多
const loadMore = () => {
  // 模拟加载更多数据
  setTimeout(() => {
    loading.value = false
    finished.value = true
  }, 1000)
}

// 添加车型
const addVehicle = () => {
  editingVehicle.value = null
  form.value = {
    name: '',
    type: '',
    capacity: '',
    size: '',
    isDefault: false
  }
  showAddPopup.value = true
}

// 编辑车型
const editVehicle = (vehicle) => {
  editingVehicle.value = vehicle
  form.value = {
    name: vehicle.name,
    type: vehicle.type,
    capacity: vehicle.capacity,
    size: vehicle.size,
    isDefault: vehicle.isDefault
  }
  showAddPopup.value = true
}

// 提交车型
const submitVehicle = () => {
  if (editingVehicle.value) {
    // 编辑现有车型
    const index = vehicles.value.findIndex(vehicle => vehicle.id === editingVehicle.value.id)
    if (index !== -1) {
      vehicles.value[index] = {
        ...vehicles.value[index],
        name: form.value.name,
        type: form.value.type,
        capacity: form.value.capacity,
        size: form.value.size,
        isDefault: form.value.isDefault
      }
      // 如果设置为默认车型，将其他车型设置为非默认
      if (form.value.isDefault) {
        vehicles.value.forEach(vehicle => {
          if (vehicle.id !== editingVehicle.value.id) {
            vehicle.isDefault = false
          }
        })
      }
    }
  } else {
    // 添加新车型
    const newId = Math.max(...vehicles.value.map(vehicle => vehicle.id)) + 1
    const newVehicle = {
      id: newId,
      name: form.value.name,
      type: form.value.type,
      capacity: form.value.capacity,
      size: form.value.size,
      isDefault: form.value.isDefault
    }
    vehicles.value.push(newVehicle)
    // 如果设置为默认车型，将其他车型设置为非默认
    if (form.value.isDefault) {
      vehicles.value.forEach(vehicle => {
        if (vehicle.id !== newId) {
          vehicle.isDefault = false
        }
      })
    }
  }
  showAddPopup.value = false
}

// 设置默认车型
const setDefault = (vehicleId) => {
  vehicles.value.forEach(vehicle => {
    vehicle.isDefault = vehicle.id === vehicleId
  })
}
</script>

<style scoped>
.shipper-vehicle-management {
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 100px;
}

.header {
  background-color: #1989fa;
  color: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.header h1 {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.placeholder {
  width: 40px;
}

.vehicle-info {
  flex: 1;
}

.vehicle-detail {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.add-button {
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 340px;
}

.popup-content {
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.popup-header h2 {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.popup-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.popup-actions van-button {
  flex: 1;
}
</style>