// API请求封装

// 模拟API基础URL
const BASE_URL = '/api'

// 模拟数据
const mockData = {
  // 登录
  login: {
    shipper: {
      token: 'shipper-token-123',
      userInfo: {
        id: 1,
        name: '货主企业',
        contact: '张三',
        phone: '13800138000'
      },
      role: 'shipper',
      permissions: ['create_order', 'view_order', 'manage_address']
    },
    driver: {
      token: 'driver-token-123',
      userInfo: {
        id: 2,
        name: '李四',
        phone: '13900139000',
        licensePlate: '京A12345',
        vehicleType: '重型卡车',
        loadCapacity: '40吨',
        length: '13米'
      },
      role: 'driver',
      permissions: ['accept_order', 'update_order', 'report_exception']
    },
    web: {
      token: 'web-token-123',
      userInfo: {
        id: 3,
        name: '王五',
        role: '超级管理员'
      },
      role: 'web',
      permissions: ['manage_order', 'manage_driver', 'manage_vehicle', 'manage_finance', 'manage_settings']
    }
  },
  // 货主端运单列表
  shipperOrders: [
    {
      id: 1,
      orderNo: 'ORD20240101001',
      status: '待调度',
      goodsName: '煤炭',
      weight: '50吨',
      origin: '山西大同',
      destination: '河北唐山',
      createTime: '2024-01-01 10:00:00'
    },
    {
      id: 2,
      orderNo: 'ORD20240102002',
      status: '运输中',
      goodsName: '钢材',
      weight: '30吨',
      origin: '上海',
      destination: '杭州',
      createTime: '2024-01-02 14:30:00'
    }
  ],
  // 司机端运单列表
  driverOrders: [
    {
      id: 1,
      orderNo: 'ORD20240101001',
      status: '待接单',
      goodsName: '煤炭',
      weight: '50吨',
      origin: '山西大同',
      destination: '河北唐山',
      price: '5000元'
    },
    {
      id: 2,
      orderNo: 'ORD20240102002',
      status: '运输中',
      goodsName: '钢材',
      weight: '30吨',
      origin: '上海',
      destination: '杭州',
      price: '3000元'
    }
  ],
  // WEB端运单列表
  webOrders: [
    {
      id: 1,
      orderNo: 'ORD20240101001',
      status: '待调度',
      shipper: '货主企业',
      driver: '李四',
      vehicle: '京A12345',
      goodsName: '煤炭',
      weight: '50吨',
      origin: '山西大同',
      destination: '河北唐山',
      createTime: '2024-01-01 10:00:00'
    },
    {
      id: 2,
      orderNo: 'ORD20240102002',
      status: '运输中',
      shipper: '货主企业',
      driver: '李四',
      vehicle: '京A12345',
      goodsName: '钢材',
      weight: '30吨',
      origin: '上海',
      destination: '杭州',
      createTime: '2024-01-02 14:30:00'
    }
  ]
}

// 模拟延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 请求方法
const request = async (url, options = {}) => {
  // 模拟网络延迟
  await delay(300)
  
  // 解析URL
  let path = url.replace(BASE_URL, '')
  // 处理没有BASE_URL的情况
  if (path === url) {
    path = url
  }
  
  // 模拟响应
  let response
  switch (path) {
    case '/login':
      const { type, username, password } = options.data
      if (username && password) {
        response = {
          code: 200,
          data: mockData.login[type],
          message: '登录成功'
        }
      } else {
        response = {
          code: 400,
          message: '用户名或密码错误'
        }
      }
      break
    case '/shipper/orders':
      response = {
        code: 200,
        data: mockData.shipperOrders,
        message: '获取成功'
      }
      break
    case '/driver/orders':
      response = {
        code: 200,
        data: mockData.driverOrders,
        message: '获取成功'
      }
      break
    case '/web/orders':
      response = {
        code: 200,
        data: mockData.webOrders,
        message: '获取成功'
      }
      break
    default:
      response = {
        code: 200,
        data: null,
        message: '请求成功'
      }
  }
  
  // 模拟错误
  if (Math.random() > 0.95) {
    response = {
      code: 500,
      message: '服务器内部错误'
    }
  }
  
  // 检查响应状态
  if (response.code === 200) {
    return response.data
  } else {
    throw new Error(response.message)
  }
}

// 导出常用方法
export default {
  get: (url, params) => request(url, { method: 'GET', params }),
  post: (url, data) => request(url, { method: 'POST', data }),
  put: (url, data) => request(url, { method: 'PUT', data }),
  delete: (url) => request(url, { method: 'DELETE' })
}