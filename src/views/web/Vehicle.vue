<template>
  <div class="web-vehicle">
    <Layout>
      <template #default>
        <el-card class="mb-4">
          <template #header>
            <div class="card-header">
              <span>车辆管理</span>
              <el-button type="primary" @click="addVehicle">
                <el-icon><Plus /></el-icon>
                新增车辆
              </el-button>
            </div>
          </template>
          
          <!-- 筛选条件 -->
          <div class="filter-form">
            <el-form :inline="true" :model="filterForm" class="mb-4">
              <el-form-item label="车牌号">
                <el-input v-model="filterForm.licensePlate" placeholder="请输入车牌号" />
              </el-form-item>
              <el-form-item label="车辆状态">
                <el-select v-model="filterForm.status" placeholder="请选择">
                  <el-option label="全部" value="" />
                  <el-option label="空闲" value="空闲" />
                  <el-option label="运输中" value="运输中" />
                  <el-option label="维修中" value="维修中" />
                  <el-option label="停运" value="停运" />
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
          
          <!-- 车辆列表 -->
          <el-table :data="vehicles" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="licensePlate" label="车牌号" />
            <el-table-column prop="type" label="车型" />
            <el-table-column prop="weight" label="载重" />
            <el-table-column prop="length" label="车长" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="insuranceExpiry" label="保险到期日" />
            <el-table-column prop="inspectionExpiry" label="年检到期日" />
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <el-button type="primary" size="small" @click="editVehicle(scope.row)">
                  编辑
                </el-button>
                <el-button size="small" @click="viewVehicle(scope.row)">
                  查看档案
                </el-button>
                <el-button size="small" type="danger" @click="deleteVehicle(scope.row.id)">
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
    
    <!-- 新增/编辑车辆弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
    >
      <el-form :model="vehicleForm" :rules="vehicleRules" ref="vehicleFormRef">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车牌号" prop="licensePlate">
              <el-input v-model="vehicleForm.licensePlate" placeholder="请输入车牌号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车型" prop="type">
              <el-input v-model="vehicleForm.type" placeholder="请输入车型" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="载重" prop="weight">
              <el-input v-model="vehicleForm.weight" placeholder="请输入载重" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车长" prop="length">
              <el-input v-model="vehicleForm.length" placeholder="请输入车长" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="vehicleForm.status" placeholder="请选择状态">
                <el-option label="空闲" value="空闲" />
                <el-option label="运输中" value="运输中" />
                <el-option label="维修中" value="维修中" />
                <el-option label="停运" value="停运" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保险到期日" prop="insuranceExpiry">
              <el-date-picker v-model="vehicleForm.insuranceExpiry" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年检到期日" prop="inspectionExpiry">
              <el-date-picker v-model="vehicleForm.inspectionExpiry" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="车辆描述" prop="description">
              <el-input type="textarea" v-model="vehicleForm.description" placeholder="请输入车辆描述" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveVehicle">保存</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 查看车辆档案弹窗 -->
    <el-dialog
      v-model="viewDialogVisible"
      title="车辆档案"
      width="600px"
    >
      <el-form :model="viewVehicleForm" label-width="120px">
        <el-form-item label="车牌号">
          <el-input v-model="viewVehicleForm.licensePlate" disabled />
        </el-form-item>
        <el-form-item label="车型">
          <el-input v-model="viewVehicleForm.type" disabled />
        </el-form-item>
        <el-form-item label="载重">
          <el-input v-model="viewVehicleForm.weight" disabled />
        </el-form-item>
        <el-form-item label="车长">
          <el-input v-model="viewVehicleForm.length" disabled />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="viewVehicleForm.status" disabled />
        </el-form-item>
        <el-form-item label="保险到期日">
          <el-input v-model="viewVehicleForm.insuranceExpiry" disabled />
        </el-form-item>
        <el-form-item label="年检到期日">
          <el-input v-model="viewVehicleForm.inspectionExpiry" disabled />
        </el-form-item>
        <el-form-item label="车辆描述">
          <el-input type="textarea" v-model="viewVehicleForm.description" disabled />
        </el-form-item>
      </el-form>
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
      <p>确定要删除车辆 <span style="color: #f56c6c">{{ deleteVehiclePlate }}</span> 吗？</p>
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
  licensePlate: '',
  status: ''
})

// 车辆数据
const vehicles = ref([
  {
    id: 1,
    licensePlate: '京A12345',
    type: '重型卡车',
    weight: '40吨',
    length: '13米',
    status: '运输中',
    insuranceExpiry: '2024-12-31',
    inspectionExpiry: '2024-06-30',
    description: '重型卡车，主要用于长途运输'
  },
  {
    id: 2,
    licensePlate: '京B67890',
    type: '半挂车',
    weight: '50吨',
    length: '17.5米',
    status: '空闲',
    insuranceExpiry: '2024-12-31',
    inspectionExpiry: '2024-07-15',
    description: '半挂车，用于大型货物运输'
  },
  {
    id: 3,
    licensePlate: '京C13579',
    type: '集装箱车',
    weight: '45吨',
    length: '14.6米',
    status: '维修中',
    insuranceExpiry: '2024-12-31',
    inspectionExpiry: '2024-08-20',
    description: '集装箱车，用于标准化货物运输'
  }
])

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 选中的车辆
const selectedVehicles = ref([])

// 新增/编辑车辆弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('新增车辆')
const vehicleForm = ref({
  id: null,
  licensePlate: '',
  type: '',
  weight: '',
  length: '',
  status: '',
  insuranceExpiry: '',
  inspectionExpiry: '',
  description: ''
})
const vehicleFormRef = ref(null)
const vehicleRules = ref({
  licensePlate: [{ required: true, message: '请输入车牌号', trigger: 'blur' }],
  type: [{ required: true, message: '请输入车型', trigger: 'blur' }],
  weight: [{ required: true, message: '请输入载重', trigger: 'blur' }],
  length: [{ required: true, message: '请输入车长', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
  insuranceExpiry: [{ required: true, message: '请选择保险到期日', trigger: 'change' }],
  inspectionExpiry: [{ required: true, message: '请选择年检到期日', trigger: 'change' }]
})

// 查看车辆档案弹窗
const viewDialogVisible = ref(false)
const viewVehicleForm = ref({
  licensePlate: '',
  type: '',
  weight: '',
  length: '',
  status: '',
  insuranceExpiry: '',
  inspectionExpiry: '',
  description: ''
})

// 删除确认弹窗
const deleteDialogVisible = ref(false)
const deleteVehicleId = ref(null)
const deleteVehiclePlate = ref('')

// 搜索
const search = () => {
  // 模拟搜索
  console.log('搜索:', filterForm.value)
  ElMessage.success('搜索功能开发中')
}

// 重置
const reset = () => {
  filterForm.value = {
    licensePlate: '',
    status: ''
  }
}

// 处理选择变化
const handleSelectionChange = (val) => {
  selectedVehicles.value = val
}

// 处理分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size
}

// 处理当前页变化
const handleCurrentChange = (current) => {
  currentPage.value = current
}

// 新增车辆
const addVehicle = () => {
  dialogTitle.value = '新增车辆'
  vehicleForm.value = {
    id: null,
    licensePlate: '',
    type: '',
    weight: '',
    length: '',
    status: '',
    insuranceExpiry: '',
    inspectionExpiry: '',
    description: ''
  }
  dialogVisible.value = true
}

// 编辑车辆
const editVehicle = (row) => {
  dialogTitle.value = '编辑车辆'
  vehicleForm.value = { ...row }
  dialogVisible.value = true
}

// 保存车辆
const saveVehicle = async () => {
  try {
    await vehicleFormRef.value.validate()
    if (vehicleForm.value.id) {
      // 编辑
      const index = vehicles.value.findIndex(item => item.id === vehicleForm.value.id)
      if (index !== -1) {
        vehicles.value[index] = { ...vehicleForm.value }
        ElMessage.success('车辆编辑成功')
      }
    } else {
      // 新增
      const newVehicle = {
        ...vehicleForm.value,
        id: Date.now()
      }
      vehicles.value.unshift(newVehicle)
      ElMessage.success('车辆新增成功')
    }
    dialogVisible.value = false
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 查看车辆档案
const viewVehicle = (row) => {
  viewVehicleForm.value = { ...row }
  viewDialogVisible.value = true
}

// 删除车辆
const deleteVehicle = (id) => {
  const vehicle = vehicles.value.find(item => item.id === id)
  if (vehicle) {
    deleteVehicleId.value = id
    deleteVehiclePlate.value = vehicle.licensePlate
    deleteDialogVisible.value = true
  }
}

// 确认删除
const confirmDelete = () => {
  vehicles.value = vehicles.value.filter(item => item.id !== deleteVehicleId.value)
  ElMessage.success(`车辆 ${deleteVehiclePlate.value} 删除成功`)
  deleteDialogVisible.value = false
}
</script>

<style scoped>
.web-vehicle {
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