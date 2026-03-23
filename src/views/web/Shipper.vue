<template>
  <div class="web-shipper">
    <Layout>
      <template #default>
        <el-card class="mb-4">
          <template #header>
            <div class="card-header">
              <span>货主管理</span>
              <el-button type="primary" @click="addShipper">
                <el-icon><Plus /></el-icon>
                新增货主
              </el-button>
            </div>
          </template>
          
          <!-- 筛选条件 -->
          <div class="filter-form">
            <el-form :inline="true" :model="filterForm" class="mb-4">
              <el-form-item label="企业名称">
                <el-input v-model="filterForm.companyName" placeholder="请输入企业名称" />
              </el-form-item>
              <el-form-item label="联系人">
                <el-input v-model="filterForm.contact" placeholder="请输入联系人" />
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
          
          <!-- 货主列表 -->
          <el-table :data="shippers" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="companyName" label="企业名称" />
            <el-table-column prop="contact" label="联系人" />
            <el-table-column prop="phone" label="联系电话" />
            <el-table-column prop="creditLimit" label="信用额度" />
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <el-button type="primary" size="small" @click="editShipper(scope.row)">
                  编辑
                </el-button>
                <el-button size="small" @click="resetPassword(scope.row)">
                  重置密码
                </el-button>
                <el-button size="small" type="danger" @click="deleteShipper(scope.row.id)">
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
    
    <!-- 新增/编辑货主弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
    >
      <el-form :model="shipperForm" :rules="shipperRules" ref="shipperFormRef">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业名称" prop="companyName">
              <el-input v-model="shipperForm.companyName" placeholder="请输入企业名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="shipperForm.contact" placeholder="请输入联系人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="shipperForm.phone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="信用额度" prop="creditLimit">
              <el-input v-model="shipperForm.creditLimit" placeholder="请输入信用额度" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="shipperForm.username" placeholder="请输入用户名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password" v-if="!shipperForm.id">
              <el-input type="password" v-model="shipperForm.password" placeholder="请输入密码" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地址" prop="address">
              <el-input type="textarea" v-model="shipperForm.address" placeholder="请输入地址" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveShipper">保存</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 重置密码弹窗 -->
    <el-dialog
      v-model="resetPasswordDialogVisible"
      title="重置密码"
      width="400px"
    >
      <p>确定要重置货主 <span style="color: #409eff">{{ resetPasswordShipperName }}</span> 的密码吗？</p>
      <p class="tip">重置后密码将变为默认密码：<strong>123456</strong></p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetPasswordDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmResetPassword">确认重置</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 删除确认弹窗 -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="删除确认"
      width="400px"
    >
      <p>确定要删除货主 <span style="color: #f56c6c">{{ deleteShipperName }}</span> 吗？</p>
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
  companyName: '',
  contact: ''
})

// 货主数据
const shippers = ref([
  {
    id: 1,
    companyName: '货主企业A',
    contact: '张三',
    phone: '13800138000',
    creditLimit: '100000',
    username: 'shipper1',
    address: '北京市朝阳区'
  },
  {
    id: 2,
    companyName: '货主企业B',
    contact: '李四',
    phone: '13900139000',
    creditLimit: '200000',
    username: 'shipper2',
    address: '上海市浦东新区'
  },
  {
    id: 3,
    companyName: '货主企业C',
    contact: '王五',
    phone: '13700137000',
    creditLimit: '150000',
    username: 'shipper3',
    address: '广州市天河区'
  }
])

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 选中的货主
const selectedShippers = ref([])

// 新增/编辑货主弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('新增货主')
const shipperForm = ref({
  id: null,
  companyName: '',
  contact: '',
  phone: '',
  creditLimit: '',
  username: '',
  password: '',
  address: ''
})
const shipperFormRef = ref(null)
const shipperRules = ref({
  companyName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
  creditLimit: [{ required: true, message: '请输入信用额度', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 重置密码弹窗
const resetPasswordDialogVisible = ref(false)
const resetPasswordShipperId = ref(null)
const resetPasswordShipperName = ref('')

// 删除确认弹窗
const deleteDialogVisible = ref(false)
const deleteShipperId = ref(null)
const deleteShipperName = ref('')

// 搜索
const search = () => {
  // 模拟搜索
  console.log('搜索:', filterForm.value)
  ElMessage.success('搜索功能开发中')
}

// 重置
const reset = () => {
  filterForm.value = {
    companyName: '',
    contact: ''
  }
}

// 处理选择变化
const handleSelectionChange = (val) => {
  selectedShippers.value = val
}

// 处理分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size
}

// 处理当前页变化
const handleCurrentChange = (current) => {
  currentPage.value = current
}

// 新增货主
const addShipper = () => {
  dialogTitle.value = '新增货主'
  shipperForm.value = {
    id: null,
    companyName: '',
    contact: '',
    phone: '',
    creditLimit: '',
    username: '',
    password: '',
    address: ''
  }
  dialogVisible.value = true
}

// 编辑货主
const editShipper = (row) => {
  dialogTitle.value = '编辑货主'
  shipperForm.value = { ...row }
  dialogVisible.value = true
}

// 保存货主
const saveShipper = async () => {
  try {
    await shipperFormRef.value.validate()
    if (shipperForm.value.id) {
      // 编辑
      const index = shippers.value.findIndex(item => item.id === shipperForm.value.id)
      if (index !== -1) {
        shippers.value[index] = { ...shipperForm.value }
        ElMessage.success('货主编辑成功')
      }
    } else {
      // 新增
      const newShipper = {
        ...shipperForm.value,
        id: Date.now()
      }
      shippers.value.unshift(newShipper)
      ElMessage.success('货主新增成功')
    }
    dialogVisible.value = false
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 重置密码
const resetPassword = (row) => {
  resetPasswordShipperId.value = row.id
  resetPasswordShipperName.value = row.companyName
  resetPasswordDialogVisible.value = true
}

// 确认重置密码
const confirmResetPassword = () => {
  ElMessage.success(`货主 ${resetPasswordShipperName.value} 密码重置成功，新密码：123456`)
  resetPasswordDialogVisible.value = false
}

// 删除货主
const deleteShipper = (id) => {
  const shipper = shippers.value.find(item => item.id === id)
  if (shipper) {
    deleteShipperId.value = id
    deleteShipperName.value = shipper.companyName
    deleteDialogVisible.value = true
  }
}

// 确认删除
const confirmDelete = () => {
  shippers.value = shippers.value.filter(item => item.id !== deleteShipperId.value)
  ElMessage.success(`货主 ${deleteShipperName.value} 删除成功`)
  deleteDialogVisible.value = false
}
</script>

<style scoped>
.web-shipper {
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