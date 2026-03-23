<template>
  <Layout>
    <template #default>
      <el-card class="mb-4">
        <template #header>
          <div class="card-header">
            <span>财务管理</span>
          </div>
        </template>
        
        <el-tabs v-model="activeTab">
          <!-- 运费订单列表 -->
          <el-tab-pane label="运费订单" name="order">
            <div class="filter-section mb-4">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-input
                    v-model="orderFilters.orderNo"
                    placeholder="运单号"
                    clearable
                    class="mr-2"
                  />
                </el-col>
                <el-col :span="8">
                  <el-select
                    v-model="orderFilters.status"
                    placeholder="支付状态"
                    clearable
                    class="mr-2"
                  >
                    <el-option label="待支付" value="pending" />
                    <el-option label="已支付" value="paid" />
                    <el-option label="部分支付" value="partial" />
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-date-picker
                    v-model="orderFilters.dateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="mr-2"
                  />
                </el-col>
              </el-row>
              <el-row :gutter="20" class="mt-2">
                <el-col :span="8">
                  <el-button type="primary" @click="getOrderList">查询</el-button>
                  <el-button @click="resetOrderFilters">重置</el-button>
                </el-col>
              </el-row>
            </div>
            
            <el-table :data="orderList" style="width: 100%">
              <el-table-column prop="orderNo" label="运单号" width="180" />
              <el-table-column prop="shipperName" label="货主" width="120" />
              <el-table-column prop="driverName" label="司机" width="100" />
              <el-table-column prop="amount" label="运费" width="100" />
              <el-table-column prop="paymentStatus" label="支付状态" width="100">
                <template #default="scope">
                  <el-tag :type="getOrderStatusType(scope.row.paymentStatus)">
                    {{ getOrderStatusText(scope.row.paymentStatus) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="dueDate" label="账期" width="120" />
              <el-table-column prop="createdAt" label="创建时间" width="180" />
              <el-table-column label="操作" width="150">
                <template #default="scope">
                  <el-button size="small" type="primary" @click="viewOrderDetail(scope.row)">查看</el-button>
                  <el-button size="small" type="success" v-if="scope.row.paymentStatus === 'pending'" @click="payOrder(scope.row)">支付</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <el-pagination
              class="mt-4"
              :current-page="orderPagination.current"
              :page-size="orderPagination.size"
              :total="orderPagination.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleOrderSizeChange"
              @current-change="handleOrderCurrentChange"
            />
          </el-tab-pane>
          
          <!-- 司机运费结算 -->
          <el-tab-pane label="司机运费结算" name="settlement">
            <div class="filter-section mb-4">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-input
                    v-model="settlementFilters.driverName"
                    placeholder="司机姓名"
                    clearable
                    class="mr-2"
                  />
                </el-col>
                <el-col :span="8">
                  <el-select
                    v-model="settlementFilters.status"
                    placeholder="结算状态"
                    clearable
                    class="mr-2"
                  >
                    <el-option label="待结算" value="pending" />
                    <el-option label="已结算" value="settled" />
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-date-picker
                    v-model="settlementFilters.dateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="mr-2"
                  />
                </el-col>
              </el-row>
              <el-row :gutter="20" class="mt-2">
                <el-col :span="8">
                  <el-button type="primary" @click="getSettlementList">查询</el-button>
                  <el-button @click="resetSettlementFilters">重置</el-button>
                </el-col>
              </el-row>
            </div>
            
            <el-table :data="settlementList" style="width: 100%">
              <el-table-column prop="id" label="结算单ID" width="120" />
              <el-table-column prop="driverName" label="司机" width="100" />
              <el-table-column prop="driverPhone" label="手机号" width="120" />
              <el-table-column prop="amount" label="结算金额" width="100" />
              <el-table-column prop="orderCount" label="运单数" width="80" />
              <el-table-column prop="status" label="状态" width="100">
                <template #default="scope">
                  <el-tag :type="getSettlementStatusType(scope.row.status)">
                    {{ getSettlementStatusText(scope.row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createdAt" label="创建时间" width="180" />
              <el-table-column label="操作" width="150">
                <template #default="scope">
                  <el-button size="small" type="primary" @click="viewSettlementDetail(scope.row)">查看</el-button>
                  <el-button size="small" type="success" v-if="scope.row.status === 'pending'" @click="approveSettlement(scope.row)">审核</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <el-pagination
              class="mt-4"
              :current-page="settlementPagination.current"
              :page-size="settlementPagination.size"
              :total="settlementPagination.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSettlementSizeChange"
              @current-change="handleSettlementCurrentChange"
            />
          </el-tab-pane>
          
          <!-- 费用管理 -->
          <el-tab-pane label="费用管理" name="expense">
            <div class="filter-section mb-4">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-input
                    v-model="expenseFilters.driverName"
                    placeholder="司机姓名"
                    clearable
                    class="mr-2"
                  />
                </el-col>
                <el-col :span="8">
                  <el-select
                    v-model="expenseFilters.type"
                    placeholder="费用类型"
                    clearable
                    class="mr-2"
                  >
                    <el-option label="过路费" value="toll" />
                    <el-option label="油费" value="fuel" />
                    <el-option label="维修费" value="repair" />
                    <el-option label="其他" value="other" />
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-date-picker
                    v-model="expenseFilters.dateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="mr-2"
                  />
                </el-col>
              </el-row>
              <el-row :gutter="20" class="mt-2">
                <el-col :span="8">
                  <el-button type="primary" @click="getExpenseList">查询</el-button>
                  <el-button @click="resetExpenseFilters">重置</el-button>
                  <el-button type="success" @click="addExpense">新增</el-button>
                </el-col>
              </el-row>
            </div>
            
            <el-table :data="expenseList" style="width: 100%">
              <el-table-column prop="id" label="费用ID" width="120" />
              <el-table-column prop="driverName" label="司机" width="100" />
              <el-table-column prop="type" label="费用类型" width="100">
                <template #default="scope">
                  {{ getExpenseTypeText(scope.row.type) }}
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="金额" width="100" />
              <el-table-column prop="description" label="描述" />
              <el-table-column prop="createdAt" label="提交时间" width="180" />
              <el-table-column prop="status" label="状态" width="100">
                <template #default="scope">
                  <el-tag :type="getExpenseStatusType(scope.row.status)">
                    {{ getExpenseStatusText(scope.row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template #default="scope">
                  <el-button size="small" type="primary" @click="viewExpenseDetail(scope.row)">查看</el-button>
                  <el-button size="small" type="success" v-if="scope.row.status === 'pending'" @click="approveExpense(scope.row)">审核</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <el-pagination
              class="mt-4"
              :current-page="expensePagination.current"
              :page-size="expensePagination.size"
              :total="expensePagination.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleExpenseSizeChange"
              @current-change="handleExpenseCurrentChange"
            />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </template>
  </Layout>
  
  <!-- 费用新增/编辑弹窗 -->
  <el-dialog
    v-model="expenseDialogVisible"
    :title="expenseDialogTitle"
    width="500px"
  >
    <el-form :model="expenseForm" :rules="expenseRules" ref="expenseFormRef">
      <el-form-item label="司机" prop="driverId">
        <el-select v-model="expenseForm.driverId" placeholder="选择司机">
          <el-option
            v-for="driver in drivers"
            :key="driver.id"
            :label="driver.name"
            :value="driver.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="费用类型" prop="type">
        <el-select v-model="expenseForm.type" placeholder="选择费用类型">
          <el-option label="过路费" value="toll" />
          <el-option label="油费" value="fuel" />
          <el-option label="维修费" value="repair" />
          <el-option label="其他" value="other" />
        </el-select>
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <el-input v-model.number="expenseForm.amount" placeholder="请输入金额" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="expenseForm.description" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="凭证">
        <el-upload
          class="upload-demo"
          action="#"
          :auto-upload="false"
          :on-change="handleExpenseFileChange"
          :file-list="expenseForm.files"
          list-type="picture"
        >
          <el-button type="primary">上传凭证</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="expenseDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveExpense">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import Layout from '../../components/web/Layout.vue'

// 激活的标签页
const activeTab = ref('order')

// 运费订单相关
const orderList = ref([
  {
    id: 1,
    orderNo: 'ORD20240101001',
    shipperName: '货主企业A',
    driverName: '张三',
    amount: 1200,
    paymentStatus: 'pending',
    dueDate: '2024-01-15',
    createdAt: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    orderNo: 'ORD20240101002',
    shipperName: '货主企业B',
    driverName: '李四',
    amount: 2500,
    paymentStatus: 'paid',
    dueDate: '2024-01-10',
    createdAt: '2024-01-01 11:00:00'
  },
  {
    id: 3,
    orderNo: 'ORD20240101003',
    shipperName: '货主企业C',
    driverName: '王五',
    amount: 1800,
    paymentStatus: 'partial',
    dueDate: '2024-01-20',
    createdAt: '2024-01-01 12:00:00'
  }
])
const orderFilters = reactive({
  orderNo: '',
  status: '',
  dateRange: []
})
const orderPagination = reactive({
  current: 1,
  size: 10,
  total: 100
})

// 司机运费结算相关
const settlementList = ref([
  {
    id: 1,
    driverName: '张三',
    driverPhone: '13800138000',
    amount: 5000,
    orderCount: 5,
    status: 'pending',
    createdAt: '2024-01-01 09:00:00'
  },
  {
    id: 2,
    driverName: '李四',
    driverPhone: '13900139000',
    amount: 8000,
    orderCount: 8,
    status: 'settled',
    createdAt: '2023-12-31 17:00:00'
  }
])
const settlementFilters = reactive({
  driverName: '',
  status: '',
  dateRange: []
})
const settlementPagination = reactive({
  current: 1,
  size: 10,
  total: 50
})

// 费用管理相关
const expenseList = ref([
  {
    id: 1,
    driverName: '张三',
    type: 'toll',
    amount: 200,
    description: '高速过路费',
    status: 'approved',
    createdAt: '2024-01-01 10:30:00'
  },
  {
    id: 2,
    driverName: '李四',
    type: 'fuel',
    amount: 500,
    description: '加油费用',
    status: 'pending',
    createdAt: '2024-01-01 11:30:00'
  },
  {
    id: 3,
    driverName: '王五',
    type: 'repair',
    amount: 800,
    description: '车辆维修',
    status: 'rejected',
    createdAt: '2024-01-01 12:30:00'
  }
])
const expenseFilters = reactive({
  driverName: '',
  type: '',
  dateRange: []
})
const expensePagination = reactive({
  current: 1,
  size: 10,
  total: 80
})

// 费用表单相关
const expenseDialogVisible = ref(false)
const expenseDialogTitle = ref('新增费用')
const expenseForm = reactive({
  id: '',
  driverId: '',
  type: '',
  amount: '',
  description: '',
  files: []
})
const expenseRules = {
  driverId: [{ required: true, message: '请选择司机', trigger: 'change' }],
  type: [{ required: true, message: '请选择费用类型', trigger: 'change' }],
  amount: [{ required: true, message: '请输入金额', trigger: 'blur' }, { type: 'number', message: '金额必须为数字', trigger: 'blur' }]
}
const expenseFormRef = ref(null)

// 司机列表
const drivers = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
])

// 生命周期
onMounted(() => {
  // 初始化数据已在上面定义
})

// 获取运费订单列表
const getOrderList = () => {
  // 模拟搜索
  console.log('搜索订单:', orderFilters)
  ElMessage.success('订单列表加载成功')
}

// 重置订单筛选条件
const resetOrderFilters = () => {
  orderFilters.orderNo = ''
  orderFilters.status = ''
  orderFilters.dateRange = []
  getOrderList()
}

// 订单分页处理
const handleOrderSizeChange = (size) => {
  orderPagination.size = size
  getOrderList()
}

const handleOrderCurrentChange = (current) => {
  orderPagination.current = current
  getOrderList()
}

// 获取司机运费结算列表
const getSettlementList = () => {
  // 模拟搜索
  console.log('搜索结算:', settlementFilters)
  ElMessage.success('结算列表加载成功')
}

// 重置结算筛选条件
const resetSettlementFilters = () => {
  settlementFilters.driverName = ''
  settlementFilters.status = ''
  settlementFilters.dateRange = []
  getSettlementList()
}

// 结算分页处理
const handleSettlementSizeChange = (size) => {
  settlementPagination.size = size
  getSettlementList()
}

const handleSettlementCurrentChange = (current) => {
  settlementPagination.current = current
  getSettlementList()
}

// 获取费用列表
const getExpenseList = () => {
  // 模拟搜索
  console.log('搜索费用:', expenseFilters)
  ElMessage.success('费用列表加载成功')
}

// 重置费用筛选条件
const resetExpenseFilters = () => {
  expenseFilters.driverName = ''
  expenseFilters.type = ''
  expenseFilters.dateRange = []
  getExpenseList()
}

// 费用分页处理
const handleExpenseSizeChange = (size) => {
  expensePagination.size = size
  getExpenseList()
}

const handleExpenseCurrentChange = (current) => {
  expensePagination.current = current
  getExpenseList()
}

// 新增费用
const addExpense = () => {
  expenseDialogTitle.value = '新增费用'
  expenseForm.id = ''
  expenseForm.driverId = ''
  expenseForm.type = ''
  expenseForm.amount = ''
  expenseForm.description = ''
  expenseForm.files = []
  expenseDialogVisible.value = true
}

// 保存费用
const saveExpense = async () => {
  if (!expenseFormRef.value) return
  try {
    await expenseFormRef.value.validate()
    // 模拟保存
    ElMessage.success('保存成功')
    expenseDialogVisible.value = false
    getExpenseList()
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 处理费用文件上传
const handleExpenseFileChange = (file, fileList) => {
  expenseForm.files = fileList
}

// 查看订单详情
const viewOrderDetail = (row) => {
  ElMessage.info(`查看订单 ${row.orderNo} 详情`)
}

// 支付订单
const payOrder = (row) => {
  ElMessage.success(`订单 ${row.orderNo} 支付成功`)
  // 更新订单状态
  row.paymentStatus = 'paid'
}

// 查看结算详情
const viewSettlementDetail = (row) => {
  ElMessage.info(`查看结算单 ${row.id} 详情`)
}

// 审核结算
const approveSettlement = (row) => {
  ElMessage.success(`结算单 ${row.id} 审核通过`)
  // 更新结算状态
  row.status = 'settled'
}

// 查看费用详情
const viewExpenseDetail = (row) => {
  ElMessage.info(`查看费用 ${row.id} 详情`)
}

// 审核费用
const approveExpense = (row) => {
  ElMessage.success(`费用 ${row.id} 审核通过`)
  // 更新费用状态
  row.status = 'approved'
}

// 订单状态类型
const getOrderStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    paid: 'success',
    partial: 'info'
  }
  return typeMap[status] || ''
}

// 订单状态文本
const getOrderStatusText = (status) => {
  const textMap = {
    pending: '待支付',
    paid: '已支付',
    partial: '部分支付'
  }
  return textMap[status] || ''
}

// 结算状态类型
const getSettlementStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    settled: 'success'
  }
  return typeMap[status] || ''
}

// 结算状态文本
const getSettlementStatusText = (status) => {
  const textMap = {
    pending: '待结算',
    settled: '已结算'
  }
  return textMap[status] || ''
}

// 费用类型文本
const getExpenseTypeText = (type) => {
  const textMap = {
    toll: '过路费',
    fuel: '油费',
    repair: '维修费',
    other: '其他'
  }
  return textMap[type] || ''
}

// 费用状态类型
const getExpenseStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || ''
}

// 费用状态文本
const getExpenseStatusText = (status) => {
  const textMap = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝'
  }
  return textMap[status] || ''
}
</script>

<style scoped>
.finance-container {
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

.mt-2 {
  margin-top: 10px;
}

.mt-4 {
  margin-top: 20px;
}
</style>