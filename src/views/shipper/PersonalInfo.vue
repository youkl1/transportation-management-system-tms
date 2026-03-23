<template>
  <div class="shipper-personal-info">
    <div class="header">
      <div class="back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <h1>个人信息</h1>
      <div class="placeholder"></div>
    </div>
    
    <div class="info-card">
      <div class="info-item">
        <span class="label">企业名称</span>
        <span class="value">{{ userInfo.name }}</span>
      </div>
      <div class="info-item">
        <span class="label">联系人</span>
        <span class="value">{{ userInfo.contact }}</span>
      </div>
      <div class="info-item">
        <span class="label">联系电话</span>
        <span class="value">{{ userInfo.phone }}</span>
      </div>
      <div class="info-item">
        <span class="label">企业地址</span>
        <span class="value">{{ userInfo.address }}</span>
      </div>
      <div class="info-item">
        <span class="label">企业类型</span>
        <span class="value">{{ userInfo.type }}</span>
      </div>
      <div class="info-item">
        <span class="label">注册时间</span>
        <span class="value">{{ userInfo.registerDate }}</span>
      </div>
    </div>
    
    <van-button type="primary" size="large" class="edit-button" @click="editInfo">
      编辑信息
    </van-button>
    
    <ShipperTabbar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ShipperTabbar from '../../components/mobile/ShipperTabbar.vue'

const router = useRouter()

// 模拟用户信息
const userInfo = ref({
  name: '货主企业',
  contact: '张三',
  phone: '13800138000',
  address: '北京市朝阳区建国路88号',
  type: '物流运输',
  registerDate: '2023-01-01'
})

// 返回上一页
const goBack = () => {
  router.back()
}

// 编辑信息
const editInfo = () => {
  // 模拟编辑信息
  console.log('编辑个人信息')
}
</script>

<style scoped>
.shipper-personal-info {
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
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

.info-card {
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-size: 14px;
  color: #666;
}

.value {
  font-size: 14px;
  color: #333;
  text-align: right;
  flex: 1;
  margin-left: 20px;
}

.edit-button {
  margin: 20px 10px;
}
</style>