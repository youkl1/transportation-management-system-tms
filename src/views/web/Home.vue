<template>
  <div class="web-home">
    <Layout>
      <el-card class="mb-4">
        <template #header>
          <div class="card-header">
            <span>工作台</span>
          </div>
        </template>
        
        <!-- 数据概览卡片 -->
        <div class="stats-grid">
          <el-card class="stat-card">
            <div class="stat-item">
              <div class="stat-value">{{ stats.todayOrders }}</div>
              <div class="stat-label">今日运单量</div>
            </div>
          </el-card>
          <el-card class="stat-card">
            <div class="stat-item">
              <div class="stat-value">{{ stats.pendingDispatch }}</div>
              <div class="stat-label">待调度运单</div>
            </div>
          </el-card>
          <el-card class="stat-card">
            <div class="stat-item">
              <div class="stat-value">{{ stats.transporting }}</div>
              <div class="stat-label">运输中运单</div>
            </div>
          </el-card>
          <el-card class="stat-card">
            <div class="stat-item">
              <div class="stat-value">{{ stats.todaySigned }}</div>
              <div class="stat-label">今日签收量</div>
            </div>
          </el-card>
          <el-card class="stat-card">
            <div class="stat-item">
              <div class="stat-value">{{ stats.vehicleUtilization }}%</div>
              <div class="stat-label">车辆利用率</div>
            </div>
          </el-card>
        </div>
        
        <!-- 图表区域 -->
        <div class="charts-grid">
          <el-card class="chart-card">
            <template #header>
              <div class="chart-header">
                <span>运单趋势</span>
              </div>
            </template>
            <div ref="trendChart" class="chart"></div>
          </el-card>
          <el-card class="chart-card">
            <template #header>
              <div class="chart-header">
                <span>车辆状态分布</span>
              </div>
            </template>
            <div ref="vehicleChart" class="chart"></div>
          </el-card>
          <el-card class="chart-card full-width">
            <template #header>
              <div class="chart-header">
                <span>大宗商品运输品类占比</span>
              </div>
            </template>
            <div ref="categoryChart" class="chart"></div>
          </el-card>
        </div>
        
        <!-- 快捷操作入口 -->
        <div class="quick-actions">
          <h3>快捷操作</h3>
          <div class="action-buttons">
            <el-button type="primary" @click="navigateTo('/web/order/list')">
              <el-icon><Document /></el-icon>
              运单管理
            </el-button>
            <el-button type="success" @click="navigateTo('/web/dispatch')">
              <el-icon><Position /></el-icon>
              调度管理
            </el-button>
            <el-button type="warning" @click="navigateTo('/web/vehicle')">
              <el-icon><Van /></el-icon>
              车辆管理
            </el-button>
            <el-button type="info" @click="navigateTo('/web/driver')">
              <el-icon><User /></el-icon>
              司机管理
            </el-button>
          </div>
        </div>
      </el-card>
    </Layout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '../../components/web/Layout.vue'
import * as echarts from 'echarts'
import {
  Document,
  Position,
  Van,
  User
} from '@element-plus/icons-vue'

const router = useRouter()
const trendChart = ref(null)
const vehicleChart = ref(null)
const categoryChart = ref(null)

// 模拟数据
const stats = ref({
  todayOrders: 120,
  pendingDispatch: 30,
  transporting: 80,
  todaySigned: 45,
  vehicleUtilization: 75
})

// 导航到指定路径
const navigateTo = (path) => {
  router.push(path)
}

// 初始化图表
const initCharts = () => {
  // 运单趋势图
  if (trendChart.value) {
    const chart = echarts.init(trendChart.value)
    chart.setOption({
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110],
        type: 'line',
        smooth: true
      }]
    })
  }
  
  // 车辆状态分布图
  if (vehicleChart.value) {
    const chart = echarts.init(vehicleChart.value)
    chart.setOption({
      series: [{
        type: 'pie',
        data: [
          { value: 75, name: '运输中' },
          { value: 15, name: '空闲' },
          { value: 5, name: '维修中' },
          { value: 5, name: '停运' }
        ]
      }]
    })
  }
  
  // 大宗商品运输品类占比图
  if (categoryChart.value) {
    const chart = echarts.init(categoryChart.value)
    chart.setOption({
      series: [{
        type: 'pie',
        data: [
          { value: 40, name: '煤炭' },
          { value: 25, name: '钢材' },
          { value: 20, name: '矿石' },
          { value: 15, name: '粮食' }
        ]
      }]
    })
  }
}

// 初始化
onMounted(() => {
  initCharts()
  
  // 监听窗口 resize
  window.addEventListener('resize', () => {
    if (trendChart.value) {
      echarts.init(trendChart.value).resize()
    }
    if (vehicleChart.value) {
      echarts.init(vehicleChart.value).resize()
    }
    if (categoryChart.value) {
      echarts.init(categoryChart.value).resize()
    }
  })
})
</script>

<style scoped>
.web-home {
  width: 100%;
  height: 100%;
}

.mb-4 {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.chart-card {
  height: 300px;
}

.chart-card.full-width {
  grid-column: span 2;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart {
  width: 100%;
  height: calc(100% - 48px);
}

.quick-actions {
  margin-top: 24px;
}

.quick-actions h3 {
  margin-bottom: 16px;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-buttons el-button {
  flex: 1;
  min-width: 120px;
}
</style>