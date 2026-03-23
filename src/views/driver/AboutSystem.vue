<template>
  <div class="driver-about-system">
    <div class="header">
      <div class="nav-bar">
        <div class="nav-left" @click="navigateBack">
          ← 返回
        </div>
        <div class="nav-title">关于系统</div>
        <div class="nav-right"></div>
      </div>
    </div>
    
    <div class="card">
      <div class="system-info">
        <div class="system-logo">🚚</div>
        <div class="system-name">物流运输管理系统</div>
        <div class="system-version">版本：v1.0.0</div>
      </div>
      
      <div class="info-section">
        <div class="section-title">系统介绍</div>
        <div class="section-content">
          本系统为物流运输管理系统，专为司机端设计，提供运单管理、路线导航、收入统计等功能，帮助司机更高效地完成运输任务。
        </div>
      </div>
      
      <div class="info-section">
        <div class="section-title">联系方式</div>
        <div class="section-content">
          <div class="contact-item">客服电话：400-123-4567</div>
          <div class="contact-item">邮箱：service@example.com</div>
          <div class="contact-item">地址：北京市朝阳区物流园区A座</div>
        </div>
      </div>
      
      <div class="info-section">
        <div class="section-title">版权信息</div>
        <div class="section-content">
          © 2026 物流运输管理系统 版权所有
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回
const navigateBack = () => {
  router.back()
}
</script>

<style scoped>
.driver-about-system {
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1989fa;
  color: white;
  padding: 12px 16px;
  height: 44px;
}

.nav-left {
  font-size: 14px;
  cursor: pointer;
}

.nav-title {
  font-size: 16px;
  font-weight: bold;
  flex: 1;
  text-align: center;
}

.nav-right {
  width: 50px;
}

.card {
  background-color: white;
  margin: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.system-info {
  text-align: center;
  margin-bottom: 30px;
}

.system-logo {
  font-size: 64px;
  margin-bottom: 15px;
}

.system-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.system-version {
  font-size: 14px;
  color: #999;
}

.info-section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.section-content {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.contact-item {
  margin-bottom: 8px;
}

.contact-item:last-child {
  margin-bottom: 0;
}
</style>