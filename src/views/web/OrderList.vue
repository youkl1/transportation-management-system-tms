<template>
  <div class="web-order-list">
    <Layout>
      <template #default>
        <el-card class="mb-4">
          <template #header>
            <div class="card-header">
              <span>运单管理</span>
              <el-button type="primary" @click="addOrder">
                <el-icon><Plus /></el-icon>
                新增运单
              </el-button>
            </div>
          </template>
          
          <!-- 筛选条件 -->
          <div class="filter-form">
            <el-form :inline="true" :model="filterForm" class="mb-4">
              <el-form-item label="运单状态">
                <el-select v-model="filterForm.status" placeholder="请选择">
                  <el-option label="全部" value="" />
                  <el-option label="待调度" value="待调度" />
                  <el-option label="已派车" value="已派车" />
                  <el-option label="装货中" value="装货中" />
                  <el-option label="运输中" value="运输中" />
                  <el-option label="已签收" value="已签收" />
                  <el-option label="已结算" value="已结算" />
                </el-select>
              </el-form-item>
              <el-form-item label="运输方式">
                <el-select v-model="filterForm.transportType" placeholder="请选择">
                  <el-option label="全部" value="" />
                  <el-option label="整车" value="整车" />
                  <el-option label="铁路" value="铁路" />
                  <el-option label="水路" value="水路" />
                </el-select>
              </el-form-item>
              <el-form-item label="货物品类">
                <el-select v-model="filterForm.goodsType" placeholder="请选择">
                  <el-option label="全部" value="" />
                  <el-option label="煤炭" value="煤炭" />
                  <el-option label="钢材" value="钢材" />
                  <el-option label="矿石" value="矿石" />
                  <el-option label="粮食" value="粮食" />
                </el-select>
              </el-form-item>
              <el-form-item label="运单号">
                <el-input v-model="filterForm.orderNo" placeholder="请输入运单号" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">
                  <el-icon><Search /></el-icon>
                  搜索
                </el-button>
                <el-button @click="reset">
                  重置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          
          <!-- 运单列表 -->
          <el-table :data="orders" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="orderNo" label="运单号" />
            <el-table-column prop="goodsName" label="货物名称" />
            <el-table-column prop="weight" label="重量" />
            <el-table-column prop="origin" label="装货点" />
            <el-table-column prop="destination" label="卸货点" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <el-button type="primary" size="small" @click="viewDetail(scope.row.id)">
                  查看详情
                </el-button>
                <el-button size="small" @click="editOrder(scope.row)">
                  编辑
                </el-button>
                <el-button size="small" type="danger" @click="deleteOrder(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-card>
      </template>
    </Layout>
    
    <!-- 新增/编辑运单弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="800px"
    >
      <el-form :model="orderForm" :rules="orderRules" ref="orderFormRef">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="货物名称" prop="goodsName">
              <el-input v-model="orderForm.goodsName" placeholder="请输入货物名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重量" prop="weight">
              <el-input v-model="orderForm.weight" placeholder="请输入重量" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运输方式" prop="transportType">
              <el-select v-model="orderForm.transportType" placeholder="请选择运输方式">
                <el-option label="整车" value="整车" />
                <el-option label="铁路" value="铁路" />
                <el-option label="水路" value="水路" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货物品类" prop="goodsType">
              <el-select v-model="orderForm.goodsType" placeholder="请选择货物品类">
                <el-option label="煤炭" value="煤炭" />
                <el-option label="钢材" value="钢材" />
                <el-option label="矿石" value="矿石" />
                <el-option label="粮食" value="粮食" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="装货点" prop="origin">
              <el-input v-model="orderForm.origin" placeholder="请输入装货点" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="卸货点" prop="destination">
              <el-input v-model="orderForm.destination" placeholder="请输入卸货点" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contactName">
              <el-input v-model="orderForm.contactName" placeholder="请输入联系人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="contactPhone">
              <el-input v-model="orderForm.contactPhone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="orderForm.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveOrder">保存</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 删除确认弹窗 -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="删除确认"
      width="400px"
    >
      <p>确定要删除运单 <span style="color: #f56c6c">{{ deleteOrderNo }}</span> 吗？</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="confirmDelete">删除</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '../../components/web/Layout.vue'
import {
  Plus,
  Search
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 筛选表单
const filterForm = ref({
  status: '',
  transportType: '',
  goodsType: '',
  orderNo: ''
})

// 运单数据
const orders = ref([
  {
    id: 1,
    orderNo: 'ORD20240101001',
    status: '待调度',
    goodsName: '煤炭',
    weight: '50吨',
    origin: '山西大同',
    destination: '河北唐山',
    createTime: '2024-01-01 10:00:00',
    contactName: '张三',
    contactPhone: '13800138000',
    transportType: '整车',
    goodsType: '煤炭',
    remark: '加急运输'
  },
  {
    id: 2,
    orderNo: 'ORD20240102002',
    status: '运输中',
    goodsName: '钢材',
    weight: '30吨',
    origin: '上海',
    destination: '杭州',
    createTime: '2024-01-02 14:30:00',
    contactName: '李四',
    contactPhone: '13900139000',
    transportType: '整车',
    goodsType: '钢材',
    remark: ''
  },
  {
    id: 3,
    orderNo: 'ORD20240103003',
    status: '已签收',
    goodsName: '粮食',
    weight: '20吨',
    origin: '黑龙江',
    destination: '北京',
    createTime: '2024-01-03 09:00:00',
    contactName: '王五',
    contactPhone: '13700137000',
    transportType: '铁路',
    goodsType: '粮食',
    remark: '需要保温'
  }
])

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 选中的运单
const selectedOrders = ref([])

// 新增/编辑弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('新增运单')
const orderForm = ref({
  id: '',
  goodsName: '',
  weight: '',
  transportType: '',
  goodsType: '',
  origin: '',
  destination: '',
  contactName: '',
  contactPhone: '',
  remark: ''
})
const orderRules = {
  goodsName: [{ required: true, message: '请输入货物名称', trigger: 'blur' }],
  weight: [{ required: true, message: '请输入重量', trigger: 'blur' }],
  transportType: [{ required: true, message: '请选择运输方式', trigger: 'change' }],
  goodsType: [{ required: true, message: '请选择货物品类', trigger: 'change' }],
  origin: [{ required: true, message: '请输入装货点', trigger: 'blur' }],
  destination: [{ required: true, message: '请输入卸货点', trigger: 'blur' }],
  contactName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  contactPhone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
}
const orderFormRef = ref(null)

// 删除确认弹窗
const deleteDialogVisible = ref(false)
const deleteOrderId = ref('')
const deleteOrderNo = ref('')

// 搜索
const search = () => {
  // 模拟搜索
  console.log('搜索:', filterForm.value)
}

// 重置
const reset = () => {
  filterForm.value = {
    status: '',
    transportType: '',
    goodsType: '',
    orderNo: ''
  }
}

// 处理选择变化
const handleSelectionChange = (val) => {
  selectedOrders.value = val
}

// 处理分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size
}

// 处理当前页变化
const handleCurrentChange = (current) => {
  currentPage.value = current
}

// 新增运单
const addOrder = () => {
  dialogTitle.value = '新增运单'
  orderForm.value = {
    id: '',
    goodsName: '',
    weight: '',
    transportType: '',
    goodsType: '',
    origin: '',
    destination: '',
    contactName: '',
    contactPhone: '',
    remark: ''
  }
  dialogVisible.value = true
}

// 查看详情
const viewDetail = (id) => {
  router.push(`/web/order/detail/${id}`)
}

// 编辑运单
const editOrder = (row) => {
  dialogTitle.value = '编辑运单'
  orderForm.value = { ...row }
  dialogVisible.value = true
}

// 保存运单
const saveOrder = async () => {
  if (!orderFormRef.value) return
  await orderFormRef.value.validate(async (valid) => {
    if (valid) {
      if (orderForm.value.id) {
        // 编辑运单
        const index = orders.value.findIndex(item => item.id === orderForm.value.id)
        if (index !== -1) {
          orders.value[index] = { ...orderForm.value }
          ElMessage.success('运单编辑成功')
        }
      } else {
        // 新增运单
        const newOrder = {
          ...orderForm.value,
          id: Date.now(),
          orderNo: `ORD${new Date().getTime()}`,
          status: '待调度',
          createTime: new Date().toLocaleString('zh-CN')
        }
        orders.value.unshift(newOrder)
        ElMessage.success('运单新增成功')
      }
      dialogVisible.value = false
    }
  })
}

// 删除运单
const deleteOrder = (id) => {
  const order = orders.value.find(item => item.id === id)
  if (order) {
    deleteOrderId.value = id
    deleteOrderNo.value = order.orderNo
    deleteDialogVisible.value = true
  }
}

// 确认删除
const confirmDelete = () => {
  const index = orders.value.findIndex(item => item.id === deleteOrderId.value)
  if (index !== -1) {
    orders.value.splice(index, 1)
    ElMessage.success('运单删除成功')
  }
  deleteDialogVisible.value = false
}
</script>

<style scoped>
.web-order-list {
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

.filter-form {
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>