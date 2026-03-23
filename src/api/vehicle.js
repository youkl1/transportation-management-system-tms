// 车辆相关API
import request from './request'

// 模拟获取车辆列表
const getVehicleList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          vehicleNo: '京A12345',
          vehicleType: '厢式货车',
          vehicleLength: '13米',
          loadCapacity: 20,
          status: 'active',
          insuranceExpiry: '2024-12-31',
          inspectionExpiry: '2024-12-31',
          createdAt: '2024-01-01 10:00:00'
        },
        {
          id: 2,
          vehicleNo: '京A12346',
          vehicleType: '平板车',
          vehicleLength: '17.5米',
          loadCapacity: 30,
          status: 'active',
          insuranceExpiry: '2024-12-31',
          inspectionExpiry: '2024-12-31',
          createdAt: '2024-01-01 11:00:00'
        }
      ]
      resolve({
        code: 200,
        data,
        total: data.length,
        message: '获取车辆列表成功'
      })
    }, 500)
  })
}

// 模拟获取车辆详情
const getVehicleDetail = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id),
          vehicleNo: '京A12345',
          vehicleType: '厢式货车',
          vehicleLength: '13米',
          loadCapacity: 20,
          status: 'active',
          insuranceExpiry: '2024-12-31',
          inspectionExpiry: '2024-12-31',
          createdAt: '2024-01-01 10:00:00',
          driverInfo: {
            id: 1,
            name: '司机A',
            phone: '13500135000'
          }
        },
        message: '获取车辆详情成功'
      })
    }, 300)
  })
}

// 模拟创建车辆
const createVehicle = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: Date.now(),
          ...data
        },
        message: '创建车辆成功'
      })
    }, 500)
  })
}

// 模拟更新车辆信息
const updateVehicle = (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id),
          ...data
        },
        message: '更新车辆信息成功'
      })
    }, 300)
  })
}

// 模拟删除车辆
const deleteVehicle = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id)
        },
        message: '删除车辆成功'
      })
    }, 300)
  })
}

// 模拟获取车辆位置
const getVehiclePosition = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id),
          vehicleNo: '京A12345',
          lng: 116.404,
          lat: 39.915,
          speed: 60,
          direction: '东南',
          updatedAt: new Date().toISOString()
        },
        message: '获取车辆位置成功'
      })
    }, 300)
  })
}

export { getVehicleList, getVehicleDetail, createVehicle, updateVehicle, deleteVehicle, getVehiclePosition }