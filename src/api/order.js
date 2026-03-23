// 订单相关API
import request from './request'

// 模拟获取订单列表
const getOrderList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          orderNo: 'ORD202401010001',
          shipperName: '张三',
          shipperPhone: '13800138000',
          consigneeName: '李四',
          consigneePhone: '13900139000',
          origin: '北京市',
          destination: '上海市',
          commodityType: '煤炭',
          weight: 20,
          volume: 15,
          pieces: 1,
          vehicleType: '厢式货车',
          vehicleLength: '13米',
          status: 'pending',
          createdAt: '2024-01-01 10:00:00',
          updatedAt: '2024-01-01 10:00:00'
        },
        {
          id: 2,
          orderNo: 'ORD202401010002',
          shipperName: '王五',
          shipperPhone: '13700137000',
          consigneeName: '赵六',
          consigneePhone: '13600136000',
          origin: '广州市',
          destination: '深圳市',
          commodityType: '矿石',
          weight: 30,
          volume: 20,
          pieces: 1,
          vehicleType: '平板车',
          vehicleLength: '17.5米',
          status: 'dispatched',
          createdAt: '2024-01-01 11:00:00',
          updatedAt: '2024-01-01 12:00:00'
        }
      ]
      resolve({
        code: 200,
        data,
        total: data.length,
        message: '获取订单列表成功'
      })
    }, 500)
  })
}

// 模拟获取订单详情
const getOrderDetail = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id),
          orderNo: 'ORD202401010001',
          shipperName: '张三',
          shipperPhone: '13800138000',
          consigneeName: '李四',
          consigneePhone: '13900139000',
          origin: '北京市',
          destination: '上海市',
          commodityType: '煤炭',
          weight: 20,
          volume: 15,
          pieces: 1,
          vehicleType: '厢式货车',
          vehicleLength: '13米',
          status: 'pending',
          createdAt: '2024-01-01 10:00:00',
          updatedAt: '2024-01-01 10:00:00',
          driverInfo: {
            id: 1,
            name: '司机A',
            phone: '13500135000',
            vehicleNo: '京A12345',
            vehicleType: '厢式货车',
            vehicleLength: '13米'
          },
          timeline: [
            {
              time: '2024-01-01 10:00:00',
              status: 'pending',
              description: '订单创建'
            }
          ],
          track: [
            { lng: 116.404, lat: 39.915, time: '2024-01-01 10:00:00' },
            { lng: 116.414, lat: 39.925, time: '2024-01-01 10:30:00' },
            { lng: 116.424, lat: 39.935, time: '2024-01-01 11:00:00' }
          ]
        },
        message: '获取订单详情成功'
      })
    }, 300)
  })
}

// 模拟创建订单
const createOrder = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: Date.now(),
          orderNo: 'ORD' + Date.now(),
          ...data
        },
        message: '创建订单成功'
      })
    }, 500)
  })
}

// 模拟更新订单状态
const updateOrderStatus = (id, status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: parseInt(id),
          status
        },
        message: '更新订单状态成功'
      })
    }, 300)
  })
}

export { getOrderList, getOrderDetail, createOrder, updateOrderStatus }