import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
    role: localStorage.getItem('role') || '',
    permissions: JSON.parse(localStorage.getItem('permissions') || '[]')
  }),
  actions: {
    // 登录
    login(token, userInfo, role, permissions) {
      this.token = token
      this.userInfo = userInfo
      this.role = role
      this.permissions = permissions
      
      // 存储到localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      localStorage.setItem('role', role)
      localStorage.setItem('permissions', JSON.stringify(permissions))
    },
    // 退出登录
    logout() {
      this.token = ''
      this.userInfo = {}
      this.role = ''
      this.permissions = []
      
      // 清除localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('role')
      localStorage.removeItem('permissions')
    },
    // 检查token是否过期
    checkTokenExpired() {
      // 模拟token过期检查
      const now = new Date().getTime()
      const tokenExpiry = localStorage.getItem('tokenExpiry') || now + 3600000 // 默认1小时
      return now > parseInt(tokenExpiry)
    },
    // 更新用户信息
    updateUserInfo(userInfo) {
      this.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    hasPermission: (state) => (permission) => {
      return state.permissions.includes(permission)
    }
  }
})