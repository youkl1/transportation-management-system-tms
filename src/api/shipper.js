// 货主相关API
import request from './request'

// 模拟获取货主列表
const getShipperList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          companyName: '北京煤炭公司',
          contactName: '张三',
          contactPhone: '13800138000',
          address: '北京市朝阳区',
          creditLimit: 1000000,
          status: 'active',
          createdAt: '2024-01-01 10:00:00'
        },
        {
          id: 2,
          companyName: '上海矿石公司',
          contactName: '李四',
          contactPhone: '13900139000',
          address: '上海市浦东新区',
          creditLimit: 2000000,
          status: 'active',
          createdAt: '2024-01-01 11:00:00'
        }
      ]
      resolve({
        code: 200,
        data,
        total: data.length,
        message: '获取货主列表成功'
      })
    }, 500)
  })
}

// 模拟获取货主详情
const getShipperDetail = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id),
          companyName: '北京煤炭公司',
          contactName: '张三',
          contactPhone: '13800138000',
          address: '北京市朝阳区',
          creditLimit: 1000000,
          status: 'active',
          createdAt: '2024-01-01 10:00:00',
          orderCount: 100,
          totalAmount: 5000000
        },
        message: '获取货主详情成功'
      })
    }, 300)
  })
}

// 模拟创建货主
const createShipper = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: Date.now(),
          ...data
        },
        message: '创建货主成功'
      })
    }, 500)
  })
}

// 模拟更新货主信息
const updateShipper = (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id),
          ...data
        },
        message: '更新货主信息成功'
      })
    }, 300)
  })
}

// 模拟删除货主
const deleteShipper = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id)
        },
        message: '删除货主成功'
      })
    }, 300)
  })
}

// 模拟重置货主密码
const resetShipperPassword = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id),
          password: '123456'
        },
        message: '重置密码成功'
      })
    }, 300)
  })
}

export { getShipperList, getShipperDetail, createShipper, updateShipper, deleteShipper, resetShipperPassword }