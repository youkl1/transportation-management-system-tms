<template>
  <Layout>
    <template #default>
      <el-card class="mb-4">
        <template #header>
          <div class="card-header">
            <span>报表中心</span>
          </div>
        </template>
        
        <el-tabs v-model="activeTab">
          <!-- 运单报表 -->
          <el-tab-pane label="运单报表" name="order">
            <div class="filter-section mb-4">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-select
                    v-model="orderReportFilters.period"
                    placeholder="选择周期"
                    class="mr-2"
                  >
                    <el-option label="日" value="day" />
                    <el-option label="周" value="week" />
                    <el-option label="月" value="month" />
                    <el-option label="年" value="year" />
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-date-picker
                    v-model="orderReportFilters.dateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="mr-2"
                  />
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" @click="generateOrderReport">生成报表</el-button>
                  <el-button @click="exportOrderReport">导出</el-button>
                </el-col>
              </el-row>
            </div>
            
            <div class="report-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-card class="mb-4">
                    <template #header>
                      <span>运单量趋势</span>
                    </template>
                    <div ref="orderTrendChart" class="chart-container"></div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="mb-4">
                    <template #header>
                      <span>大宗商品运输品类占比</span>
                    </template>
                    <div ref="commodityChart" class="chart-container"></div>
                  </el-card>
                </el-col>
              </el-row>
              
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-card class="mb-4">
                    <template #header>
                      <span>大宗商品运输流向分析</span>
                    </template>
                    <div ref="flowChart" class="chart-container" style="height: 400px;"></div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          
          <!-- 运输报表 -->
          <el-tab-pane label="运输报表" name="transport">
            <div class="filter-section mb-4">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-select
                    v-model="transportReportFilters.period"
                    placeholder="选择周期"
                    class="mr-2"
                  >
                    <el-option label="日" value="day" />
                    <el-option label="周" value="week" />
                    <el-option label="月" value="month" />
                    <el-option label="年" value="year" />
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-date-picker
                    v-model="transportReportFilters.dateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="mr-2"
                  />
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" @click="generateTransportReport">生成报表</el-button>
                  <el-button @click="exportTransportReport">导出</el-button>
                </el-col>
              </el-row>
            </div>
            
            <div class="report-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-card class="mb-4">
                    <template #header>
                      <span>车辆利用率</span>
                    </template>
                    <div ref="vehicleUtilizationChart" class="chart-container"></div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="mb-4">
                    <template #header>
                      <span>司机业绩排名</span>
                    </template>
                    <div ref="driverRankingChart" class="chart-container"></div>
                  </el-card>
                </el-col>
              </el-row>
              
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-card class="mb-4">
                    <template #header>
                      <span>路线优化分析</span>
                    </template>
                    <div ref="routeChart" class="chart-container" style="height: 400px;"></div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          
          <!-- 财务报表 -->
          <el-tab-pane label="财务报表" name="finance">
            <div class="filter-section mb-4">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-select
                    v-model="financeReportFilters.period"
                    placeholder="选择周期"
                    class="mr-2"
                  >
                    <el-option label="日" value="day" />
                    <el-option label="周" value="week" />
                    <el-option label="月" value="month" />
                    <el-option label="年" value="year" />
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-date-picker
                    v-model="financeReportFilters.dateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="mr-2"
                  />
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" @click="generateFinanceReport">生成报表</el-button>
                  <el-button @click="exportFinanceReport">导出</el-button>
                </el-col>
              </el-row>
            </div>
            
            <div class="report-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-card class="mb-4">
                    <template #header>
                      <span>运费收入统计</span>
                    </template>
                    <div ref="incomeChart" class="chart-container"></div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="mb-4">
                    <template #header>
                      <span>成本分析</span>
                    </template>
                    <div ref="costChart" class="chart-container"></div>
                  </el-card>
                </el-col>
              </el-row>
              
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-card class="mb-4">
                    <template #header>
                      <span>利润报表</span>
                    </template>
                    <div ref="profitChart" class="chart-container" style="height: 400px;"></div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </template>
  </Layout>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
import Layout from '../../components/web/Layout.vue'

// 激活的标签页
const activeTab = ref('order')

// 运单报表筛选条件
const orderReportFilters = reactive({
  period: 'month',
  dateRange: []
})

// 运输报表筛选条件
const transportReportFilters = reactive({
  period: 'month',
  dateRange: []
})

// 财务报表筛选条件
const financeReportFilters = reactive({
  period: 'month',
  dateRange: []
})

// 图表引用
const orderTrendChart = ref(null)
const commodityChart = ref(null)
const flowChart = ref(null)
const vehicleUtilizationChart = ref(null)
const driverRankingChart = ref(null)
const routeChart = ref(null)
const incomeChart = ref(null)
const costChart = ref(null)
const profitChart = ref(null)

// 图表实例
let orderTrendChartInstance = null
let commodityChartInstance = null
let flowChartInstance = null
let vehicleUtilizationChartInstance = null
let driverRankingChartInstance = null
let routeChartInstance = null
let incomeChartInstance = null
let costChartInstance = null
let profitChartInstance = null

// 生命周期
onMounted(() => {
  // 初始化图表
  initCharts()
  
  // 生成默认报表
  generateOrderReport()
  generateTransportReport()
  generateFinanceReport()
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // 销毁图表实例
  destroyCharts()
  
  // 移除事件监听
  window.removeEventListener('resize', handleResize)
})

// 初始化图表
const initCharts = () => {
  if (orderTrendChart.value) {
    orderTrendChartInstance = echarts.init(orderTrendChart.value)
  }
  if (commodityChart.value) {
    commodityChartInstance = echarts.init(commodityChart.value)
  }
  if (flowChart.value) {
    flowChartInstance = echarts.init(flowChart.value)
  }
  if (vehicleUtilizationChart.value) {
    vehicleUtilizationChartInstance = echarts.init(vehicleUtilizationChart.value)
  }
  if (driverRankingChart.value) {
    driverRankingChartInstance = echarts.init(driverRankingChart.value)
  }
  if (routeChart.value) {
    routeChartInstance = echarts.init(routeChart.value)
  }
  if (incomeChart.value) {
    incomeChartInstance = echarts.init(incomeChart.value)
  }
  if (costChart.value) {
    costChartInstance = echarts.init(costChart.value)
  }
  if (profitChart.value) {
    profitChartInstance = echarts.init(profitChart.value)
  }
}

// 销毁图表实例
const destroyCharts = () => {
  if (orderTrendChartInstance) {
    orderTrendChartInstance.dispose()
  }
  if (commodityChartInstance) {
    commodityChartInstance.dispose()
  }
  if (flowChartInstance) {
    flowChartInstance.dispose()
  }
  if (vehicleUtilizationChartInstance) {
    vehicleUtilizationChartInstance.dispose()
  }
  if (driverRankingChartInstance) {
    driverRankingChartInstance.dispose()
  }
  if (routeChartInstance) {
    routeChartInstance.dispose()
  }
  if (incomeChartInstance) {
    incomeChartInstance.dispose()
  }
  if (costChartInstance) {
    costChartInstance.dispose()
  }
  if (profitChartInstance) {
    profitChartInstance.dispose()
  }
}

// 处理窗口大小变化
const handleResize = () => {
  if (orderTrendChartInstance) {
    orderTrendChartInstance.resize()
  }
  if (commodityChartInstance) {
    commodityChartInstance.resize()
  }
  if (flowChartInstance) {
    flowChartInstance.resize()
  }
  if (vehicleUtilizationChartInstance) {
    vehicleUtilizationChartInstance.resize()
  }
  if (driverRankingChartInstance) {
    driverRankingChartInstance.resize()
  }
  if (routeChartInstance) {
    routeChartInstance.resize()
  }
  if (incomeChartInstance) {
    incomeChartInstance.resize()
  }
  if (costChartInstance) {
    costChartInstance.resize()
  }
  if (profitChartInstance) {
    profitChartInstance.resize()
  }
}

// 生成运单报表
const generateOrderReport = () => {
  // 运单量趋势图
  const orderTrendOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['运单量']
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '运单量',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230],
        smooth: true
      }
    ]
  }
  
  // 大宗商品运输品类占比
  const commodityOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '货物品类',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 35, name: '煤炭' },
          { value: 25, name: '矿石' },
          { value: 20, name: '粮食' },
          { value: 15, name: '钢材' },
          { value: 5, name: '其他' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  
  // 大宗商品运输流向分析
  const flowOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '运输流向',
        type: 'sankey',
        left: 50,
        top: 20,
        right: 150,
        bottom: 25,
        data: [
          { name: '华北' },
          { name: '华东' },
          { name: '华南' },
          { name: '西南' },
          { name: '西北' },
          { name: '东北' }
        ],
        links: [
          { source: '华北', target: '华东', value: 10 },
          { source: '华北', target: '华南', value: 5 },
          { source: '华北', target: '西南', value: 3 },
          { source: '华东', target: '华南', value: 8 },
          { source: '华东', target: '西南', value: 2 },
          { source: '华南', target: '西南', value: 4 },
          { source: '东北', target: '华北', value: 7 },
          { source: '西北', target: '华北', value: 6 }
        ],
        lineStyle: {
          color: 'gradient',
          curveness: 0.5
        }
      }
    ]
  }
  
  if (orderTrendChartInstance) {
    orderTrendChartInstance.setOption(orderTrendOption)
  }
  if (commodityChartInstance) {
    commodityChartInstance.setOption(commodityOption)
  }
  if (flowChartInstance) {
    flowChartInstance.setOption(flowOption)
  }
}

// 生成运输报表
const generateTransportReport = () => {
  // 车辆利用率
  const vehicleUtilizationOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['利用率']
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value',
      max: 100
    },
    series: [
      {
        name: '利用率',
        type: 'line',
        data: [85, 82, 88, 90, 92, 87],
        smooth: true
      }
    ]
  }
  
  // 司机业绩排名
  const driverRankingOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['司机A', '司机B', '司机C', '司机D', '司机E']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '完成运单量',
        type: 'bar',
        data: [35, 28, 25, 22, 18]
      }
    ]
  }
  
  // 路线优化分析
  const routeOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '路线长度',
        type: 'graph',
        layout: 'force',
        data: [
          { name: '北京', x: 100, y: 100 },
          { name: '上海', x: 200, y: 100 },
          { name: '广州', x: 200, y: 200 },
          { name: '成都', x: 100, y: 200 },
          { name: '西安', x: 50, y: 150 }
        ],
        links: [
          { source: '北京', target: '上海', value: 1318 },
          { source: '北京', target: '广州', value: 2120 },
          { source: '北京', target: '成都', value: 1870 },
          { source: '上海', target: '广州', value: 1430 },
          { source: '上海', target: '成都', value: 1980 },
          { source: '广州', target: '成都', value: 1620 },
          { source: '西安', target: '北京', value: 1100 },
          { source: '西安', target: '成都', value: 840 }
        ],
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }
    ]
  }
  
  if (vehicleUtilizationChartInstance) {
    vehicleUtilizationChartInstance.setOption(vehicleUtilizationOption)
  }
  if (driverRankingChartInstance) {
    driverRankingChartInstance.setOption(driverRankingOption)
  }
  if (routeChartInstance) {
    routeChartInstance.setOption(routeOption)
  }
}

// 生成财务报表
const generateFinanceReport = () => {
  // 运费收入统计
  const incomeOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['运费收入']
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '运费收入',
        type: 'bar',
        data: [120000, 132000, 101000, 134000, 90000, 230000]
      }
    ]
  }
  
  // 成本分析
  const costOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '成本构成',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 40, name: '油费' },
          { value: 20, name: '过路费' },
          { value: 15, name: '司机工资' },
          { value: 10, name: '车辆维修' },
          { value: 15, name: '其他' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  
  // 利润报表
  const profitOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['收入', '成本', '利润']
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '收入',
        type: 'line',
        data: [120000, 132000, 101000, 134000, 90000, 230000]
      },
      {
        name: '成本',
        type: 'line',
        data: [80000, 90000, 70000, 95000, 65000, 150000]
      },
      {
        name: '利润',
        type: 'line',
        data: [40000, 42000, 31000, 39000, 25000, 80000]
      }
    ]
  }
  
  if (incomeChartInstance) {
    incomeChartInstance.setOption(incomeOption)
  }
  if (costChartInstance) {
    costChartInstance.setOption(costOption)
  }
  if (profitChartInstance) {
    profitChartInstance.setOption(profitOption)
  }
}

// 导出运单报表
const exportOrderReport = () => {
  ElMessage.success('运单报表导出成功')
}

// 导出运输报表
const exportTransportReport = () => {
  ElMessage.success('运输报表导出成功')
}

// 导出财务报表
const exportFinanceReport = () => {
  ElMessage.success('财务报表导出成功')
}
</script>

<style scoped>
.report-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-section {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
}

.mb-4 {
  margin-bottom: 20px;
}

.mr-2 {
  margin-right: 10px;
}

.chart-container {
  width: 100%;
  height: 300px;
}

.report-content {
  margin-top: 20px;
}
</style>