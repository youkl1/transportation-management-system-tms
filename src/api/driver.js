// 司机相关API
import request from './request'

// 模拟获取司机列表
const getDriverList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          name: '司机A',
          phone: '13500135000',
          idCard: '110101199001011234',
          license: 'A1',
          vehicleNo: '京A12345',
          vehicleType: '厢式货车',
          vehicleLength: '13米',
          status: 'active',
          createdAt: '2024-01-01 10:00:00'
        },
        {
          id: 2,
          name: '司机B',
          phone: '13500135001',
          idCard: '110101199001011235',
          license: 'A2',
          vehicleNo: '京A12346',
          vehicleType: '平板车',
          vehicleLength: '17.5米',
          status: 'active',
          createdAt: '2024-01-01 11:00:00'
        }
      ]
      resolve({
        code: 200,
        data,
        total: data.length,
        message: '获取司机列表成功'
      })
    }, 500)
  })
}

// 模拟获取司机详情
const getDriverDetail = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id),
          name: '司机A',
          phone: '13500135000',
          idCard: '110101199001011234',
          license: 'A1',
          vehicleNo: '京A12345',
          vehicleType: '厢式货车',
          vehicleLength: '13米',
          status: 'active',
          createdAt: '2024-01-01 10:00:00',
          vehicleInfo: {
            id: 1,
            vehicleNo: '京A12345',
            vehicleType: '厢式货车',
            vehicleLength: '13米',
            loadCapacity: 20,
            status: 'active'
          }
        },
        message: '获取司机详情成功'
      })
    }, 300)
  })
}

// 模拟创建司机
const createDriver = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: Date.now(),
          ...data
        },
        message: '创建司机成功'
      })
    }, 500)
  })
}

// 模拟更新司机信息
const updateDriver = (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id),
          ...data
        },
        message: '更新司机信息成功'
      })
    }, 300)
  })
}

// 模拟删除司机
const deleteDriver = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id)
        },
        message: '删除司机成功'
      })
    }, 300)
  })
}

export { getDriverList, getDriverDetail, createDriver, updateDriver, deleteDriver }