// 系统相关API
import request from './request'

// 模拟获取角色列表
const getRoleList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          name: '超级管理员',
          description: '拥有系统所有权限',
          createdAt: '2024-01-01 10:00:00'
        },
        {
          id: 2,
          name: '调度员',
          description: '负责运单调度',
          createdAt: '2024-01-01 11:00:00'
        },
        {
          id: 3,
          name: '财务',
          description: '负责财务管理',
          createdAt: '2024-01-01 12:00:00'
        }
      ]
      resolve({
        code: 200,
        data,
        total: data.length,
        message: '获取角色列表成功'
      })
    }, 500)
  })
}

// 模拟获取部门列表
const getDepartments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          label: '技术部',
          children: [
            { id: 2, label: '前端组' },
            { id: 3, label: '后端组' }
          ]
        },
        {
          id: 4,
          label: '运营部',
          children: [
            { id: 5, label: '调度组' },
            { id: 6, label: '客服组' }
          ]
        },
        {
          id: 7,
          label: '财务部'
        }
      ]
      resolve({
        code: 200,
        data,
        message: '获取部门列表成功'
      })
    }, 300)
  })
}

// 模拟获取成员列表
const getMembers = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          name: '张三',
          phone: '13800138000',
          position: '前端开发',
          roleName: '调度员',
          department: '技术部',
          createdAt: '2024-01-01 10:00:00'
        },
        {
          id: 2,
          name: '李四',
          phone: '13900139000',
          position: '后端开发',
          roleName: '超级管理员',
          department: '技术部',
          createdAt: '2024-01-01 11:00:00'
        }
      ]
      resolve({
        code: 200,
        data,
        total: data.length,
        message: '获取成员列表成功'
      })
    }, 500)
  })
}

// 模拟获取字典列表
const getDictionaryList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          type: 'transport_type',
          code: 'truck',
          value: '整车',
          sort: 1,
          status: 'active'
        },
        {
          id: 2,
          type: 'transport_type',
          code: 'rail',
          value: '铁路',
          sort: 2,
          status: 'active'
        },
        {
          id: 3,
          type: 'commodity_type',
          code: 'coal',
          value: '煤炭',
          sort: 1,
          status: 'active'
        },
        {
          id: 4,
          type: 'commodity_type',
          code: 'ore',
          value: '矿石',
          sort: 2,
          status: 'active'
        },
        {
          id: 5,
          type: 'vehicle_type',
          code: 'van',
          value: '厢式货车',
          sort: 1,
          status: 'active'
        },
        {
          id: 6,
          type: 'order_status',
          code: 'pending',
          value: '待调度',
          sort: 1,
          status: 'active'
        }
      ]
      resolve({
        code: 200,
        data,
        total: data.length,
        message: '获取字典列表成功'
      })
    }, 500)
  })
}

// 模拟获取日志列表
const getLogList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          username: 'admin',
          ip: '192.168.1.1',
          type: 'login',
          content: '登录系统',
          createdAt: '2024-01-01 10:00:00'
        },
        {
          id: 2,
          username: 'admin',
          ip: '192.168.1.1',
          type: 'operation',
          content: '创建运单',
          createdAt: '2024-01-01 10:30:00'
        },
        {
          id: 3,
          username: 'admin',
          ip: '192.168.1.1',
          type: 'operation',
          content: '分配司机',
          createdAt: '2024-01-01 11:00:00'
        }
      ]
      resolve({
        code: 200,
        data,
        total: data.length,
        message: '获取日志列表成功'
      })
    }, 500)
  })
}

export { getRoleList, getDepartments, getMembers, getDictionaryList, getLogList }