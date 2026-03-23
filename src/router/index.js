import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

// 端选择页面
const EntryPage = () => import('../views/entry/EntryPage.vue')
// 登录页面
const LoginPage = () => import('../views/entry/LoginPage.vue')

// 货主端路由
const shipperRoutes = [
  {
    path: '/shipper/home',
    name: 'ShipperHome',
    component: () => import('../views/shipper/Home.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  },
  {
    path: '/shipper/order/create',
    name: 'ShipperCreateOrder',
    component: () => import('../views/shipper/CreateOrder.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  },
  {
    path: '/shipper/order/list',
    name: 'ShipperOrderList',
    component: () => import('../views/shipper/OrderList.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  },
  {
    path: '/shipper/order/detail/:id',
    name: 'ShipperOrderDetail',
    component: () => import('../views/shipper/OrderDetail.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  },
  {
    path: '/shipper/address',
    name: 'ShipperAddress',
    component: () => import('../views/shipper/AddressBook.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  },
  {
    path: '/shipper/profile',
    name: 'ShipperProfile',
    component: () => import('../views/shipper/Profile.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  },
  {
    path: '/shipper/personal-info',
    name: 'ShipperPersonalInfo',
    component: () => import('../views/shipper/PersonalInfo.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  },
  {
    path: '/shipper/change-password',
    name: 'ShipperChangePassword',
    component: () => import('../views/shipper/ChangePassword.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  },
  {
    path: '/shipper/vehicle-management',
    name: 'ShipperVehicleManagement',
    component: () => import('../views/shipper/VehicleManagement.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  },
  {
    path: '/shipper/expense-detail',
    name: 'ShipperExpenseDetail',
    component: () => import('../views/shipper/ExpenseDetail.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  },
  {
    path: '/shipper/about-system',
    name: 'ShipperAboutSystem',
    component: () => import('../views/shipper/AboutSystem.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  },
  {
    path: '/shipper/feedback',
    name: 'ShipperFeedback',
    component: () => import('../views/shipper/Feedback.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  },
  {
    path: '/shipper/test',
    name: 'ShipperTest',
    component: () => import('../views/shipper/TestPage.vue'),
    meta: { requiresAuth: true, role: 'shipper' }
  }
]

// 司机端路由
const driverRoutes = [
  {
    path: '/driver/home',
    name: 'DriverHome',
    component: () => import('../views/driver/Home.vue'),
    meta: { requiresAuth: true, role: 'driver' }
  },
  {
    path: '/driver/order/list',
    name: 'DriverOrderList',
    component: () => import('../views/driver/OrderList.vue'),
    meta: { requiresAuth: true, role: 'driver' }
  },
  {
    path: '/driver/order/detail/:id',
    name: 'DriverOrderDetail',
    component: () => import('../views/driver/OrderDetail.vue'),
    meta: { requiresAuth: true, role: 'driver' }
  },
  {
    path: '/driver/profile',
    name: 'DriverProfile',
    component: () => import('../views/driver/Profile.vue'),
    meta: { requiresAuth: true, role: 'driver' }
  },
  {
    path: '/driver/personal-info',
    name: 'DriverPersonalInfo',
    component: () => import('../views/driver/PersonalInfo.vue'),
    meta: { requiresAuth: true, role: 'driver' }
  },
  {
    path: '/driver/change-password',
    name: 'DriverChangePassword',
    component: () => import('../views/driver/ChangePassword.vue'),
    meta: { requiresAuth: true, role: 'driver' }
  },
  {
    path: '/driver/about-system',
    name: 'DriverAboutSystem',
    component: () => import('../views/driver/AboutSystem.vue'),
    meta: { requiresAuth: true, role: 'driver' }
  },
  {
    path: '/driver/income-records',
    name: 'DriverIncomeRecords',
    component: () => import('../views/driver/IncomeRecords.vue'),
    meta: { requiresAuth: true, role: 'driver' }
  }
]

// WEB端路由
const webRoutes = [
  {
    path: '/web/home',
    name: 'WebHome',
    component: () => import('../views/web/Home.vue'),
    meta: { requiresAuth: true, role: 'web' }
  },
  {
    path: '/web/order/list',
    name: 'WebOrderList',
    component: () => import('../views/web/OrderList.vue'),
    meta: { requiresAuth: true, role: 'web' }
  },
  {
    path: '/web/order/detail/:id',
    name: 'WebOrderDetail',
    component: () => import('../views/web/OrderDetail.vue'),
    meta: { requiresAuth: true, role: 'web' }
  },
  {
    path: '/web/dispatch',
    name: 'WebDispatch',
    component: () => import('../views/web/Dispatch.vue'),
    meta: { requiresAuth: true, role: 'web' }
  },
  {
    path: '/web/vehicle',
    name: 'WebVehicle',
    component: () => import('../views/web/Vehicle.vue'),
    meta: { requiresAuth: true, role: 'web' }
  },
  {
    path: '/web/driver',
    name: 'WebDriver',
    component: () => import('../views/web/Driver.vue'),
    meta: { requiresAuth: true, role: 'web' }
  },
  {
    path: '/web/shipper',
    name: 'WebShipper',
    component: () => import('../views/web/Shipper.vue'),
    meta: { requiresAuth: true, role: 'web' }
  },
  {
    path: '/web/finance',
    name: 'WebFinance',
    component: () => import('../views/web/Finance.vue'),
    meta: { requiresAuth: true, role: 'web' }
  },
  {
    path: '/web/report',
    name: 'WebReport',
    component: () => import('../views/web/Report.vue'),
    meta: { requiresAuth: true, role: 'web' }
  },
  {
    path: '/web/system',
    name: 'WebSystem',
    component: () => import('../views/web/System.vue'),
    meta: { requiresAuth: true, role: 'web' }
  },
  {
    path: '/web/profile',
    name: 'WebProfile',
    component: () => import('../views/web/Profile.vue'),
    meta: { requiresAuth: true, role: 'web' }
  }
]

const routes = [
  {
    path: '/',
    name: 'Entry',
    component: EntryPage
  },
  {
    path: '/login/:type',
    name: 'Login',
    component: LoginPage,
    props: true
  },
  ...shipperRoutes,
  ...driverRoutes,
  ...webRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const requiresAuth = to.meta.requiresAuth
  const requiredRole = to.meta.role

  if (requiresAuth) {
    if (!userStore.token) {
      // 未登录，跳转到端选择页
      next('/')
    } else if (userStore.role !== requiredRole) {
      // 角色不匹配，跳转到对应端的首页
      if (userStore.role === 'shipper') {
        next('/shipper/home')
      } else if (userStore.role === 'driver') {
        next('/driver/home')
      } else if (userStore.role === 'web') {
        next('/web/home')
      } else {
        next('/')
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router