<template>
  <div class="shipper-address-book">
    <div class="header">
      <h1>地址簿管理</h1>
    </div>
    
    <!-- 地址类型切换 -->
    <div class="address-type">
      <van-tabs v-model="activeType">
        <van-tab name="shipper" :title="`发货人 (${addressCounts.shipper})`" />
        <van-tab name="consignee" :title="`收货人 (${addressCounts.consignee})`" />
        <van-tab name="origin" :title="`装货点 (${addressCounts.origin})`" />
        <van-tab name="destination" :title="`卸货点 (${addressCounts.destination})`" />
      </van-tabs>
    </div>
    
    <!-- 地址列表 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMore"
    >
      <van-cell 
        v-for="address in filteredAddresses" 
        :key="address.id"
        :title="address.name"
        :value="address.isDefault ? '默认' : ''"
        @click="editAddress(address)"
      >
        <template #default>
          <div class="address-info">
            <div class="address-header">
              <span>{{ address.phone }}</span>
              <span class="address-status" :class="address.status">{{ address.status }}</span>
            </div>
            <div class="address-detail">{{ address.address }}</div>
          </div>
        </template>
        <template #right>
          <van-button size="small" type="primary" @click.stop="setDefault(address.id)">
            {{ address.isDefault ? '默认' : '设为默认' }}
          </van-button>
        </template>
      </van-cell>
    </van-list>
    
    <!-- 添加地址按钮 -->
    <van-button type="primary" size="large" class="add-button" @click="addAddress">
      添加地址
    </van-button>
    
    <!-- 添加地址弹窗 -->
    <van-popup v-model:show="showAddPopup" position="bottom" round>
      <div class="popup-content">
        <div class="popup-header">
          <h2>{{ editingAddress ? '编辑地址' : '添加地址' }}</h2>
          <van-icon name="cross" @click="showAddPopup = false" />
        </div>
        <van-form @submit="submitAddress">
          <van-field
            v-model="form.name"
            name="name"
            label="名称"
            placeholder="请输入名称"
            :rules="[{ required: true, message: '请输入名称' }]"
          />
          <van-field
            v-model="form.phone"
            name="phone"
            label="电话"
            placeholder="请输入电话"
            :rules="[{ required: true, message: '请输入电话' }]"
          />
          <van-field
            v-model="form.address"
            name="address"
            label="地址"
            placeholder="请输入详细地址"
            :rules="[{ required: true, message: '请输入详细地址' }]"
            type="textarea"
            :rows="3"
          />
          <van-field name="isDefault">
            <template #label>默认地址</template>
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
import ShipperTabbar from '../../components/mobile/ShipperTabbar.vue'

const loading = ref(false)
const finished = ref(false)
const activeType = ref('shipper')
const showAddPopup = ref(false)
const editingAddress = ref(null)

// 地址数据
const addresses = ref([
  // 发货人
  {
    id: 1,
    type: 'shipper',
    name: '张三',
    phone: '13800138000',
    address: '山西省大同市矿区',
    isDefault: true,
    status: '正常'
  },
  {
    id: 2,
    type: 'shipper',
    name: '王五',
    phone: '13700137000',
    address: '山东省临沂市兰山区',
    isDefault: false,
    status: '正常'
  },
  {
    id: 3,
    type: 'shipper',
    name: '赵六',
    phone: '13600136000',
    address: '安徽省芜湖市镜湖区',
    isDefault: false,
    status: '禁用'
  },
  // 收货人
  {
    id: 4,
    type: 'consignee',
    name: '李四',
    phone: '13900139000',
    address: '河北省唐山市曹妃甸区',
    isDefault: true,
    status: '正常'
  },
  {
    id: 5,
    type: 'consignee',
    name: '钱七',
    phone: '13500135000',
    address: '河南省郑州市金水区',
    isDefault: false,
    status: '正常'
  },
  {
    id: 6,
    type: 'consignee',
    name: '孙八',
    phone: '13400134000',
    address: '江苏省南京市玄武区',
    isDefault: false,
    status: '禁用'
  },
  // 装货点
  {
    id: 7,
    type: 'origin',
    name: '大同煤矿',
    address: '山西省大同市矿区煤场',
    isDefault: true,
    status: '正常'
  },
  {
    id: 8,
    type: 'origin',
    name: '临沂化肥厂',
    address: '山东省临沂市兰山区化工路123号',
    isDefault: false,
    status: '正常'
  },
  {
    id: 9,
    type: 'origin',
    name: '芜湖水泥厂',
    address: '安徽省芜湖市镜湖区建材路456号',
    isDefault: false,
    status: '维护中'
  },
  // 卸货点
  {
    id: 10,
    type: 'destination',
    name: '唐山钢厂',
    address: '河北省唐山市曹妃甸区钢铁厂',
    isDefault: true,
    status: '正常'
  },
  {
    id: 11,
    type: 'destination',
    name: '郑州热电厂',
    address: '河南省郑州市金水区电厂路789号',
    isDefault: false,
    status: '正常'
  },
  {
    id: 12,
    type: 'destination',
    name: '南京建材市场',
    address: '江苏省南京市玄武区建材路101号',
    isDefault: false,
    status: '维护中'
  }
])

// 表单数据
const form = ref({
  name: '',
  phone: '',
  address: '',
  isDefault: false
})

// 地址数量统计
const addressCounts = computed(() => {
  return {
    shipper: addresses.value.filter(address => address.type === 'shipper').length,
    consignee: addresses.value.filter(address => address.type === 'consignee').length,
    origin: addresses.value.filter(address => address.type === 'origin').length,
    destination: addresses.value.filter(address => address.type === 'destination').length
  }
})

// 筛选后的地址
const filteredAddresses = computed(() => {
  return addresses.value.filter(address => address.type === activeType.value)
})

// 加载更多
const loadMore = () => {
  // 模拟加载更多数据
  setTimeout(() => {
    loading.value = false
    finished.value = true
  }, 1000)
}

// 添加地址
const addAddress = () => {
  editingAddress.value = null
  form.value = {
    name: '',
    phone: '',
    address: '',
    isDefault: false
  }
  showAddPopup.value = true
}

// 编辑地址
const editAddress = (address) => {
  editingAddress.value = address
  form.value = {
    name: address.name,
    phone: address.phone,
    address: address.address,
    isDefault: address.isDefault
  }
  showAddPopup.value = true
}

// 提交地址
const submitAddress = () => {
  if (editingAddress.value) {
    // 编辑现有地址
    const index = addresses.value.findIndex(address => address.id === editingAddress.value.id)
    if (index !== -1) {
      addresses.value[index] = {
        ...addresses.value[index],
        name: form.value.name,
        phone: form.value.phone,
        address: form.value.address,
        isDefault: form.value.isDefault
      }
      // 如果设置为默认地址，将同类型其他地址设置为非默认
      if (form.value.isDefault) {
        addresses.value.forEach(address => {
          if (address.type === editingAddress.value.type && address.id !== editingAddress.value.id) {
            address.isDefault = false
          }
        })
      }
    }
  } else {
    // 添加新地址
    const newId = Math.max(...addresses.value.map(address => address.id)) + 1
    const newAddress = {
      id: newId,
      type: activeType.value,
      name: form.value.name,
      phone: form.value.phone,
      address: form.value.address,
      isDefault: form.value.isDefault
    }
    addresses.value.push(newAddress)
    // 如果设置为默认地址，将同类型其他地址设置为非默认
    if (form.value.isDefault) {
      addresses.value.forEach(address => {
        if (address.type === activeType.value && address.id !== newId) {
          address.isDefault = false
        }
      })
    }
  }
  showAddPopup.value = false
}

// 设置默认地址
const setDefault = (addressId) => {
  addresses.value.forEach(address => {
    if (address.type === activeType.value) {
      address.isDefault = address.id === addressId
    }
  })
}
</script>

<style scoped>
.shipper-address-book {
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 100px;
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

.address-type {
  background-color: white;
  margin-bottom: 10px;
}

.address-info {
  flex: 1;
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.address-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
}

.address-status.正常 {
  background-color: #e8f5e8;
  color: #4caf50;
}

.address-status.禁用 {
  background-color: #ffebee;
  color: #f44336;
}

.address-status.维护中 {
  background-color: #fff3e0;
  color: #ff9800;
}

.address-detail {
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