// 认证相关API
import request from './request'

// 模拟登录
const login = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          token: 'mock-token-' + Date.now(),
          userInfo: {
            id: 1,
            username: data.username,
            name: data.username === 'admin' ? '管理员' : data.username === 'shipper' ? '货主用户' : '司机用户',
            role: data.type === 'web' ? 'web' : data.type === 'shipper' ? 'shipper' : 'driver'
          }
        },
        message: '登录成功'
      })
    }, 500)
  })
}

// 模拟登出
const logout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: null,
        message: '登出成功'
      })
    }, 300)
  })
}

// 模拟获取用户信息
const getUserInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: 1,
          username: 'admin',
          name: '管理员',
          role: 'web'
        },
        message: '获取用户信息成功'
      })
    }, 300)
  })
}

export { login, logout, getUserInfo }