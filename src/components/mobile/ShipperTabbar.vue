<template>
  <div class="shipper-tabbar">
    <div class="tabbar-item" :class="{ active: currentPath === '/shipper/home' }" @click="navigateTo('/shipper/home')">
      <div class="tabbar-icon">🏠</div>
      <div class="tabbar-text">首页</div>
    </div>
    <div class="tabbar-item" :class="{ active: currentPath === '/shipper/order/list' }" @click="navigateTo('/shipper/order/list')">
      <div class="tabbar-icon">📋</div>
      <div class="tabbar-text">运单</div>
    </div>
    <div class="tabbar-item" :class="{ active: currentPath === '/shipper/address' }" @click="navigateTo('/shipper/address')">
      <div class="tabbar-icon">📍</div>
      <div class="tabbar-text">地址簿</div>
    </div>
    <div class="tabbar-item" :class="{ active: currentPath === '/shipper/profile' }" @click="navigateTo('/shipper/profile')">
      <div class="tabbar-icon">👤</div>
      <div class="tabbar-text">我的</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const currentPath = computed(() => route.path)

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.shipper-tabbar {
  display: flex;
  height: 50px;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tabbar-item.active {
  color: #1989fa;
}

.tabbar-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.tabbar-text {
  font-size: 12px;
}
</style>