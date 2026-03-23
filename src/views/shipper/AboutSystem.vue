<template>
  <div class="shipper-about-system">
    <div class="header">
      <div class="back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <h1>关于系统</h1>
      <div class="placeholder"></div>
    </div>
    
    <div class="about-card">
      <div class="app-info">
        <div class="app-logo">
          <van-icon name="car" size="64" />
        </div>
        <div class="app-name">物流运输管理系统</div>
        <div class="app-version">版本 {{ appInfo.version }}</div>
      </div>
      
      <div class="info-item">
        <span class="label">系统介绍</span>
        <span class="value">{{ appInfo.description }}</span>
      </div>
      <div class="info-item">
        <span class="label">开发团队</span>
        <span class="value">{{ appInfo.team }}</span>
      </div>
      <div class="info-item">
        <span class="label">联系邮箱</span>
        <span class="value">{{ appInfo.email }}</span>
      </div>
      <div class="info-item">
        <span class="label">更新时间</span>
        <span class="value">{{ appInfo.updateDate }}</span>
      </div>
    </div>
    
    <div class="copyright">
      {{ appInfo.copyright }}
    </div>
    
    <ShipperTabbar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ShipperTabbar from '../../components/mobile/ShipperTabbar.vue'

const router = useRouter()

// 系统信息
const appInfo = ref({
  version: '1.0.0',
  description: '专业的物流运输管理系统，为货主提供便捷的运单管理、地址管理等功能',
  team: '物流系统开发团队',
  email: 'contact@logistics-system.com',
  updateDate: '2026-03-01',
  copyright: '© 2026 物流运输管理系统 版权所有'
})

// 返回上一页
const goBack = () => {
  router.back()
}
</script>

<style scoped>
.shipper-about-system {
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

.about-card {
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.app-info {
  text-align: center;
  margin-bottom: 30px;
}

.app-logo {
  margin-bottom: 16px;
  color: #1989fa;
}

.app-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.app-version {
  font-size: 14px;
  color: #666;
}

.info-item {
  margin-bottom: 20px;
}

.label {
  font-size: 14px;
  color: #666;
  margin-right: 10px;
}

.value {
  font-size: 14px;
  color: #333;
}

.copyright {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 30px;
}
</style>