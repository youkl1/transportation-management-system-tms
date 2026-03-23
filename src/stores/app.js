import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 端类型：shipper, driver, web
    clientType: '',
    // WEB端导航折叠状态
    sidebarCollapsed: false,
    // 主题设置
    theme: 'light'
  }),
  actions: {
    // 设置端类型
    setClientType(type) {
      this.clientType = type
    },
    // 切换导航折叠状态
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    // 设置导航折叠状态
    setSidebarCollapsed(collapsed) {
      this.sidebarCollapsed = collapsed
    },
    // 设置主题
    setTheme(theme) {
      this.theme = theme
    }
  }
})