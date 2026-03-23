// 财务相关API
import request from './request'

// 模拟获取运费订单列表
const getOrderList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          orderNo: 'ORD202401010001',
          shipperName: '北京煤炭公司',
          driverName: '司机A',
          amount: 5000,
          paymentStatus: 'pending',
          dueDate: '2024-01-15',
          createdAt: '2024-01-01 10:00:00'
        },
        {
          id: 2,
          orderNo: 'ORD202401010002',
          shipperName: '上海矿石公司',
          driverName: '司机B',
          amount: 8000,
          paymentStatus: 'paid',
          dueDate: '2024-01-15',
          createdAt: '2024-01-01 11:00:00'
        }
      ]
      resolve({
        code: 200,
        data,
        total: data.length,
        message: '获取运费订单列表成功'
      })
    }, 500)
  })
}

// 模拟获取司机运费结算列表
const getSettlementList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          driverName: '司机A',
          driverPhone: '13500135000',
          amount: 15000,
          orderCount: 3,
          status: 'pending',
          createdAt: '2024-01-01 10:00:00'
        },
        {
          id: 2,
          driverName: '司机B',
          driverPhone: '13500135001',
          amount: 24000,
          orderCount: 4,
          status: 'settled',
          createdAt: '2024-01-01 11:00:00'
        }
      ]
      resolve({
        code: 200,
        data,
        total: data.length,
        message: '获取司机运费结算列表成功'
      })
    }, 500)
  })
}

// 模拟获取费用列表
const getExpenseList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          driverName: '司机A',
          type: 'toll',
          amount: 500,
          description: '过路费',
          status: 'pending',
          createdAt: '2024-01-01 10:00:00'
        },
        {
          id: 2,
          driverName: '司机B',
          type: 'fuel',
          amount: 1200,
          description: '油费',
          status: 'approved',
          createdAt: '2024-01-01 11:00:00'
        }
      ]
      resolve({
        code: 200,
        data,
        total: data.length,
        message: '获取费用列表成功'
      })
    }, 500)
  })
}

// 模拟获取司机列表
const getDrivers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        { id: 1, name: '司机A' },
        { id: 2, name: '司机B' }
      ]
      resolve({
        code: 200,
        data,
        message: '获取司机列表成功'
      })
    }, 300)
  })
}

export { getOrderList, getSettlementList, getExpenseList, getDrivers }