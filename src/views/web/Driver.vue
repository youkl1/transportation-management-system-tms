<template>
  <div class="web-driver">
    <Layout>
      <template #default>
        <el-card class="mb-4">
          <template #header>
            <div class="card-header">
              <span>司机管理</span>
              <el-button type="primary" @click="addDriver">
                <el-icon><Plus /></el-icon>
                新增司机
              </el-button>
            </div>
          </template>
          
          <!-- 筛选条件 -->
          <div class="filter-form">
            <el-form :inline="true" :model="filterForm" class="mb-4">
              <el-form-item label="司机姓名">
                <el-input v-model="filterForm.name" placeholder="请输入司机姓名" />
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="filterForm.phone" placeholder="请输入手机号" />
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="filterForm.status" placeholder="请选择">
                  <el-option label="全部" value="" />
                  <el-option label="正常" value="正常" />
                  <el-option label="审核中" value="审核中" />
                  <el-option label="禁用" value="禁用" />
                </el-select>
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
          
          <!-- 司机列表 -->
          <el-table :data="drivers" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="idCard" label="身份证号" />
            <el-table-column prop="licenseType" label="准驾车型" />
            <el-table-column prop="status" label="状态" />
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <el-button type="primary" size="small" @click="editDriver(scope.row)">
                  编辑
                </el-button>
                <el-button size="small" @click="viewDriver(scope.row)">
                  查看档案
                </el-button>
                <el-button size="small" type="danger" @click="deleteDriver(scope.row.id)">
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
    
    <!-- 新增/编辑司机弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
    >
      <el-form :model="driverForm" :rules="driverRules" ref="driverFormRef">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="driverForm.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="driverForm.phone" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="driverForm.idCard" placeholder="请输入身份证号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="准驾车型" prop="licenseType">
              <el-select v-model="driverForm.licenseType" placeholder="请选择准驾车型">
                <el-option label="A1" value="A1" />
                <el-option label="A2" value="A2" />
                <el-option label="B1" value="B1" />
                <el-option label="B2" value="B2" />
                <el-option label="C1" value="C1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="驾驶证号" prop="licenseNo">
              <el-input v-model="driverForm.licenseNo" placeholder="请输入驾驶证号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="driverForm.status" placeholder="请选择状态">
                <el-option label="正常" value="正常" />
                <el-option label="审核中" value="审核中" />
                <el-option label="禁用" value="禁用" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地址" prop="address">
              <el-input type="textarea" v-model="driverForm.address" placeholder="请输入地址" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveDriver">保存</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 查看司机档案弹窗 -->
    <el-dialog
      v-model="viewDialogVisible"
      title="司机档案"
      width="800px"
    >
      <div class="driver-profile">
        <div class="profile-header">
          <h3>{{ viewDriverData.name }} - 档案信息</h3>
        </div>
        <div class="profile-info">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="label">姓名：</span>
                <span class="value">{{ viewDriverData.name }}</span>
              </div>
              <div class="info-item">
                <span class="label">手机号：</span>
                <span class="value">{{ viewDriverData.phone }}</span>
              </div>
              <div class="info-item">
                <span class="label">身份证号：</span>
                <span class="value">{{ viewDriverData.idCard }}</span>
              </div>
              <div class="info-item">
                <span class="label">准驾车型：</span>
                <span class="value">{{ viewDriverData.licenseType }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="label">驾驶证号：</span>
                <span class="value">{{ viewDriverData.licenseNo }}</span>
              </div>
              <div class="info-item">
                <span class="label">状态：</span>
                <span class="value status-{{ viewDriverData.status }}">{{ viewDriverData.status }}</span>
              </div>
              <div class="info-item">
                <span class="label">地址：</span>
                <span class="value">{{ viewDriverData.address }}</span>
              </div>
              <div class="info-item">
                <span class="label">加入时间：</span>
                <span class="value">{{ viewDriverData.joinTime }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="profile-records">
          <h4>车辆记录</h4>
          <el-table :data="viewDriverData.vehicles" style="width: 100%">
            <el-table-column prop="number" label="车牌号" />
            <el-table-column prop="model" label="车型" />
            <el-table-column prop="status" label="状态" />
          </el-table>
        </div>
        <div class="profile-records">
          <h4>运单记录</h4>
          <el-table :data="viewDriverData.orders" style="width: 100%">
            <el-table-column prop="orderNo" label="运单号" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="createTime" label="创建时间" />
          </el-table>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="viewDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 删除确认弹窗 -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="删除确认"
      width="400px"
    >
      <p>确定要删除司机 <span style="color: #f56c6c">{{ deleteDriverName }}</span> 吗？</p>
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
import Layout from '../../components/web/Layout.vue'
import {
  Plus,
  Search
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 筛选表单
const filterForm = ref({
  name: '',
  phone: '',
  status: ''
})

// 司机数据
const drivers = ref([
  {
    id: 1,
    name: '李四',
    phone: '13900139000',
    idCard: '110101199001011234',
    licenseType: 'A1',
    licenseNo: '110101199001011234',
    status: '正常',
    address: '北京市朝阳区',
    joinTime: '2024-01-01',
    vehicles: [
      { number: '京A12345', model: '解放J6', status: '正常' },
      { number: '京B67890', model: '东风天龙', status: '维修中' }
    ],
    orders: [
      { orderNo: 'ORD20240101001', status: '已完成', createTime: '2024-01-01' },
      { orderNo: 'ORD20240102002', status: '运输中', createTime: '2024-01-02' }
    ]
  },
  {
    id: 2,
    name: '王五',
    phone: '13800138000',
    idCard: '110101199002022345',
    licenseType: 'A2',
    licenseNo: '110101199002022345',
    status: '审核中',
    address: '上海市浦东新区',
    joinTime: '2024-01-02',
    vehicles: [
      { number: '沪A12345', model: '欧曼EST', status: '正常' }
    ],
    orders: [
      { orderNo: 'ORD20240103003', status: '已完成', createTime: '2024-01-03' }
    ]
  },
  {
    id: 3,
    name: '赵六',
    phone: '13700137000',
    idCard: '110101199003033456',
    licenseType: 'A2',
    licenseNo: '110101199003033456',
    status: '正常',
    address: '广州市天河区',
    joinTime: '2024-01-03',
    vehicles: [
      { number: '粤A12345', model: '陕汽德龙', status: '正常' },
      { number: '粤B67890', model: '重汽豪沃', status: '正常' }
    ],
    orders: [
      { orderNo: 'ORD20240104004', status: '已完成', createTime: '2024-01-04' },
      { orderNo: 'ORD20240105005', status: '待调度', createTime: '2024-01-05' }
    ]
  }
])

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 选中的司机
const selectedDrivers = ref([])

// 新增/编辑弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('新增司机')
const driverForm = ref({
  id: '',
  name: '',
  phone: '',
  idCard: '',
  licenseType: '',
  licenseNo: '',
  status: '正常',
  address: ''
})
const driverRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
  licenseType: [{ required: true, message: '请选择准驾车型', trigger: 'change' }],
  licenseNo: [{ required: true, message: '请输入驾驶证号', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}
const driverFormRef = ref(null)

// 查看档案弹窗
const viewDialogVisible = ref(false)
const viewDriverData = ref({
  name: '',
  phone: '',
  idCard: '',
  licenseType: '',
  licenseNo: '',
  status: '',
  address: '',
  joinTime: '',
  vehicles: [],
  orders: []
})

// 删除确认弹窗
const deleteDialogVisible = ref(false)
const deleteDriverId = ref('')
const deleteDriverName = ref('')

// 搜索
const search = () => {
  // 模拟搜索
  console.log('搜索:', filterForm.value)
}

// 重置
const reset = () => {
  filterForm.value = {
    name: '',
    phone: '',
    status: ''
  }
}

// 处理选择变化
const handleSelectionChange = (val) => {
  selectedDrivers.value = val
}

// 处理分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size
}

// 处理当前页变化
const handleCurrentChange = (current) => {
  currentPage.value = current
}

// 新增司机
const addDriver = () => {
  dialogTitle.value = '新增司机'
  driverForm.value = {
    id: '',
    name: '',
    phone: '',
    idCard: '',
    licenseType: '',
    licenseNo: '',
    status: '正常',
    address: ''
  }
  dialogVisible.value = true
}

// 编辑司机
const editDriver = (row) => {
  dialogTitle.value = '编辑司机'
  driverForm.value = { ...row }
  dialogVisible.value = true
}

// 保存司机
const saveDriver = async () => {
  if (!driverFormRef.value) return
  await driverFormRef.value.validate(async (valid) => {
    if (valid) {
      if (driverForm.value.id) {
        // 编辑司机
        const index = drivers.value.findIndex(item => item.id === driverForm.value.id)
        if (index !== -1) {
          drivers.value[index] = { ...driverForm.value }
          ElMessage.success('司机编辑成功')
        }
      } else {
        // 新增司机
        const newDriver = {
          ...driverForm.value,
          id: Date.now(),
          joinTime: new Date().toISOString().split('T')[0],
          vehicles: [],
          orders: []
        }
        drivers.value.unshift(newDriver)
        ElMessage.success('司机新增成功')
      }
      dialogVisible.value = false
    }
  })
}

// 查看司机档案
const viewDriver = (row) => {
  viewDriverData.value = { ...row }
  viewDialogVisible.value = true
}

// 删除司机
const deleteDriver = (id) => {
  const driver = drivers.value.find(item => item.id === id)
  if (driver) {
    deleteDriverId.value = id
    deleteDriverName.value = driver.name
    deleteDialogVisible.value = true
  }
}

// 确认删除
const confirmDelete = () => {
  const index = drivers.value.findIndex(item => item.id === deleteDriverId.value)
  if (index !== -1) {
    drivers.value.splice(index, 1)
    ElMessage.success('司机删除成功')
  }
  deleteDialogVisible.value = false
}
</script>

<style scoped>
.web-driver {
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

.driver-profile {
  margin-top: 20px;
}

.profile-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.profile-header h3 {
  margin: 0;
  color: #333;
}

.profile-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.profile-info .info-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.profile-info .label {
  width: 100px;
  color: #666;
  flex-shrink: 0;
}

.profile-info .value {
  flex: 1;
  color: #333;
}

.status-正常 {
  color: #52c41a;
}

.status-审核中 {
  color: #faad14;
}

.status-禁用 {
  color: #f56c6c;
}

.profile-records {
  margin-top: 20px;
}

.profile-records h4 {
  margin-bottom: 10px;
  color: #666;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>