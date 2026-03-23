<template>
  <div class="web-layout">
    <!-- 左侧导航栏 -->
    <div class="sidebar" :class="{ 'collapsed': sidebarCollapsed }">
      <div class="logo">
        <h1 v-if="!sidebarCollapsed">大宗物流TMS</h1>
        <h1 v-else>TMS</h1>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        @select="handleMenuSelect"
        :collapse="sidebarCollapsed"
      >
        <el-menu-item index="/web/home">
          <el-icon><HomeFilled /></el-icon>
          <template #title>工作台</template>
        </el-menu-item>
        <el-menu-item index="/web/order/list">
          <el-icon><Document /></el-icon>
          <template #title>运单管理</template>
        </el-menu-item>
        <el-menu-item index="/web/dispatch">
          <el-icon><Position /></el-icon>
          <template #title>调度管理</template>
        </el-menu-item>
        <el-menu-item index="/web/vehicle">
          <el-icon><Van /></el-icon>
          <template #title>车辆管理</template>
        </el-menu-item>
        <el-menu-item index="/web/driver">
          <el-icon><User /></el-icon>
          <template #title>司机管理</template>
        </el-menu-item>
        <el-menu-item index="/web/shipper">
          <el-icon><OfficeBuilding /></el-icon>
          <template #title>货主管理</template>
        </el-menu-item>
        <el-menu-item index="/web/finance">
          <el-icon><Money /></el-icon>
          <template #title>财务管理</template>
        </el-menu-item>
        <el-menu-item index="/web/report">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>报表中心</template>
        </el-menu-item>
        <el-menu-item index="/web/system">
          <el-icon><Setting /></el-icon>
          <template #title>系统设置</template>
        </el-menu-item>
      </el-menu>
    </div>
    
    <!-- 主内容区 -->
    <div class="main">
      <!-- 顶部Header -->
      <header class="header">
        <div class="header-left">
          <el-button link @click="toggleSidebar">
            <el-icon><Menu /></el-icon>
          </el-button>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-info">
              <el-icon><UserFilled /></el-icon>
              <span>{{ userInfo.name }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="navigateTo('/web/profile')">个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      
      <!-- 内容区 -->
      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { useAppStore } from '../../stores/app'
import {
  HomeFilled,
  Document,
  Position,
  Van,
  User,
  OfficeBuilding,
  Money,
  DataAnalysis,
  Setting,
  Menu,
  UserFilled
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const appStore = useAppStore()

const sidebarCollapsed = computed(() => appStore.sidebarCollapsed)
const userInfo = computed(() => userStore.userInfo)

// 当前活跃菜单
const activeMenu = computed(() => route.path)

// 切换侧边栏
const toggleSidebar = () => {
  appStore.toggleSidebar()
}

// 菜单选择
const handleMenuSelect = (key) => {
  router.push(key)
}

// 导航到指定路径
const navigateTo = (path) => {
  router.push(path)
}

// 退出登录
const logout = () => {
  userStore.logout()
  router.push('/')
}

// 初始化
onMounted(() => {
  // 设置端类型
  appStore.setClientType('web')
})
</script>

<style scoped>
.web-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  background-color: #2c3e50;
  color: white;
  transition: width 0.3s;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 64px;
}

.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #34495e;
}

.logo h1 {
  font-size: 18px;
  margin: 0;
  font-weight: bold;
}

.el-menu-vertical-demo {
  background-color: #2c3e50;
  border-right: none;
}

.el-menu-item {
  color: rgba(255, 255, 255, 0.7);
  height: 60px;
  line-height: 60px;
}

.el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.el-menu-item.is-active {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.2);
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-info span {
  margin-left: 8px;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f5f5;
}
</style>