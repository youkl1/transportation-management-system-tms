<template>
  <div class="shipper-create-order">
    <div class="header">
      <van-nav-bar title="发货下单" left-text="返回" @click-left="navigateBack" />
    </div>
    
    <van-form @submit="handleSubmit" ref="createForm">
      <!-- 基础信息 -->
      <van-cell-group>
        <van-cell title="发货人信息" is-link @click="openAddressBook('shipper')">
          <template #default>
            <div v-if="form.shipperName">{{ form.shipperName }} {{ form.shipperPhone }}</div>
            <div v-else class="placeholder">请选择发货人</div>
          </template>
        </van-cell>
        <van-cell title="收货人信息" is-link @click="openAddressBook('consignee')">
          <template #default>
            <div v-if="form.consigneeName">{{ form.consigneeName }} {{ form.consigneePhone }}</div>
            <div v-else class="placeholder">请选择收货人</div>
          </template>
        </van-cell>
        <van-cell title="装货点" is-link @click="openAddressBook('origin')">
          <template #default>
            <div v-if="form.origin">{{ form.origin }}</div>
            <div v-else class="placeholder">请选择装货点</div>
          </template>
        </van-cell>
        <van-cell title="卸货点" is-link @click="openAddressBook('destination')">
          <template #default>
            <div v-if="form.destination">{{ form.destination }}</div>
            <div v-else class="placeholder">请选择卸货点</div>
          </template>
        </van-cell>
      </van-cell-group>
      
      <!-- 货物信息 -->
      <van-cell-group title="货物信息">
        <van-field
          v-model="form.goodsName"
          label="货物名称"
          placeholder="请输入货物名称"
          :rules="[{ required: true, message: '请输入货物名称' }]"
        />
        <van-field
          v-model="form.weight"
          label="重量"
          placeholder="请输入重量"
          :rules="[{ required: true, message: '请输入重量' }]"
        />
        <van-field
          v-model="form.volume"
          label="体积"
          placeholder="请输入体积"
        />
        <van-field
          v-model="form.quantity"
          label="件数"
          placeholder="请输入件数"
        />
        <van-field
          v-model="form.packageType"
          label="包装方式"
          placeholder="请输入包装方式"
        />
      </van-cell-group>
      
      <!-- 运输需求 -->
      <van-cell-group title="运输需求">
        <van-field
          v-model="form.transportType"
          label="运输方式"
          placeholder="请选择运输方式"
          is-link
          @click="openTransportTypePicker"
          :rules="[{ required: true, message: '请选择运输方式' }]"
        />
        <van-field
          v-model="form.vehicleType"
          label="车型要求"
          placeholder="请选择车型"
          is-link
          @click="openVehicleTypePicker"
        />
        <van-field
          v-model="form.loadingTime"
          label="装货时间"
          placeholder="请选择装货时间"
          is-link
          @click="openLoadingTimePicker"
          :rules="[{ required: true, message: '请选择装货时间' }]"
        />
        <van-field
          v-model="form.unloadingTime"
          label="卸货时间"
          placeholder="请选择卸货时间"
          is-link
          @click="openUnloadingTimePicker"
        />
        <van-field
          v-model="form.remarks"
          label="备注"
          type="textarea"
          placeholder="请输入备注信息"
          :rows="3"
        />
      </van-cell-group>
      
      <!-- 运费预估 -->
      <div class="estimate">
        <h3>运费预估：{{ estimatedPrice }}元</h3>
      </div>
      
      <van-button type="primary" native-type="submit" size="large" :loading="loading" style="margin: 20px;">
        提交订单
      </van-button>
    </van-form>
    
    <!-- 选择器弹窗 -->
    <van-popup v-model:show="showTransportTypePicker" position="bottom">
      <van-picker
        :columns="transportTypes"
        @confirm="(value) => { form.transportType = value[0]; showTransportTypePicker = false }"
        @cancel="showTransportTypePicker = false"
      />
    </van-popup>
    
    <van-popup v-model:show="showVehicleTypePicker" position="bottom">
      <van-picker
        :columns="vehicleTypes"
        @confirm="(value) => { form.vehicleType = value[0]; showVehicleTypePicker = false }"
        @cancel="showVehicleTypePicker = false"
      />
    </van-popup>
    
    <van-datetime-picker
      v-model="loadingTime"
      type="datetime"
      title="选择装货时间"
      @confirm="(value) => { form.loadingTime = formatDate(value); showLoadingTimePicker = false }"
      @cancel="showLoadingTimePicker = false"
      v-model:show="showLoadingTimePicker"
    />
    
    <van-datetime-picker
      v-model="unloadingTime"
      type="datetime"
      title="选择卸货时间"
      @confirm="(value) => { form.unloadingTime = formatDate(value); showUnloadingTimePicker = false }"
      @cancel="showUnloadingTimePicker = false"
      v-model:show="showUnloadingTimePicker"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const createForm = ref(null)
const loading = ref(false)

// 表单数据
const form = ref({
  shipperName: '',
  shipperPhone: '',
  consigneeName: '',
  consigneePhone: '',
  origin: '',
  destination: '',
  goodsName: '',
  weight: '',
  volume: '',
  quantity: '',
  packageType: '',
  transportType: '',
  vehicleType: '',
  loadingTime: '',
  unloadingTime: '',
  remarks: ''
})

// 选择器状态
const showTransportTypePicker = ref(false)
const showVehicleTypePicker = ref(false)
const showLoadingTimePicker = ref(false)
const showUnloadingTimePicker = ref(false)

// 时间选择器值
const loadingTime = ref(new Date())
const unloadingTime = ref(new Date())

// 选项数据
const transportTypes = ['整车', '铁路', '水路']
const vehicleTypes = ['重型卡车', '半挂车', '集装箱车', '平板车']

// 运费预估
const estimatedPrice = computed(() => {
  // 模拟运费计算
  const weight = parseFloat(form.value.weight) || 0
  return Math.round(weight * 100)
})

// 格式化日期
const formatDate = (date) => {
  return date.toLocaleString('zh-CN')
}

// 打开地址簿
const openAddressBook = (type) => {
  // 模拟打开地址簿
  console.log('打开地址簿:', type)
}

// 打开运输方式选择器
const openTransportTypePicker = () => {
  showTransportTypePicker.value = true
}

// 打开车型选择器
const openVehicleTypePicker = () => {
  showVehicleTypePicker.value = true
}

// 打开装货时间选择器
const openLoadingTimePicker = () => {
  showLoadingTimePicker.value = true
}

// 打开卸货时间选择器
const openUnloadingTimePicker = () => {
  showUnloadingTimePicker.value = true
}

// 提交订单
const handleSubmit = async () => {
  try {
    loading.value = true
    
    // 表单验证
    const validateResult = await createForm.value.validate()
    if (!validateResult) return
    
    // 模拟提交订单
    setTimeout(() => {
      loading.value = false
      // 跳转到运单列表
      router.push('/shipper/order/list')
    }, 1000)
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    loading.value = false
  }
}

// 返回
const navigateBack = () => {
  router.back()
}
</script>

<style scoped>
.shipper-create-order {
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.placeholder {
  color: #999;
}

.estimate {
  margin: 20px;
  padding: 15px;
  background-color: #e8f4ff;
  border-radius: 8px;
  text-align: center;
}

.estimate h3 {
  color: #1989fa;
  font-size: 16px;
}
</style>