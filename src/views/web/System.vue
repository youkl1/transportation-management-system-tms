<template>
  <Layout>
    <template #default>
      <el-card class="mb-4">
        <template #header>
          <div class="card-header">
            <span>系统设置</span>
          </div>
        </template>
        
        <el-tabs v-model="activeTab">
          <!-- 角色权限管理 -->
          <el-tab-pane label="角色权限管理" name="role">
            <div class="filter-section mb-4">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-input
                    v-model="roleFilters.name"
                    placeholder="角色名称"
                    clearable
                    class="mr-2"
                  />
                </el-col>
                <el-col :span="16" class="text-right">
                  <el-button type="primary" @click="addRole">新增角色</el-button>
                </el-col>
              </el-row>
            </div>
            
            <el-table :data="roleList" style="width: 100%">
              <el-table-column prop="id" label="角色ID" width="100" />
              <el-table-column prop="name" label="角色名称" width="120" />
              <el-table-column prop="description" label="角色描述" />
              <el-table-column prop="createdAt" label="创建时间" width="180" />
              <el-table-column label="操作" width="150">
                <template #default="scope">
                  <el-button size="small" type="primary" @click="editRole(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(scope.row)" v-if="scope.row.id !== 1">删除</el-button>
                  <el-button size="small" type="info" @click="setPermissions(scope.row)">权限设置</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <el-pagination
              class="mt-4"
              :current-page="rolePagination.current"
              :page-size="rolePagination.size"
              :total="rolePagination.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleRoleSizeChange"
              @current-change="handleRoleCurrentChange"
            />
          </el-tab-pane>
          
          <!-- 组织架构管理 -->
          <el-tab-pane label="组织架构管理" name="organization">
            <div class="organization-content">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-card class="mb-4">
                    <template #header>
                      <span>部门结构</span>
                    </template>
                    <el-tree
                      :data="departments"
                      node-key="id"
                      default-expand-all
                      @node-click="handleDepartmentClick"
                    >
                      <template #default="{ node, data }">
                        <span class="department-node">
                          {{ node.label }}
                          <el-button size="mini" link @click.stop="addDepartment(data)">+</el-button>
                          <el-button size="mini" link @click.stop="editDepartment(data)">编辑</el-button>
                          <el-button size="mini" link @click.stop="deleteDepartment(data)">删除</el-button>
                        </span>
                      </template>
                    </el-tree>
                  </el-card>
                </el-col>
                <el-col :span="18">
                  <el-card class="mb-4">
                    <template #header>
                      <div class="card-header">
                        <span>部门成员</span>
                        <el-button type="primary" @click="addMember">新增成员</el-button>
                      </div>
                    </template>
                    <el-table :data="members" style="width: 100%">
                      <el-table-column prop="id" label="ID" width="80" />
                      <el-table-column prop="name" label="姓名" width="100" />
                      <el-table-column prop="phone" label="手机号" width="120" />
                      <el-table-column prop="position" label="职位" width="100" />
                      <el-table-column prop="roleName" label="角色" width="100" />
                      <el-table-column label="操作" width="120">
                        <template #default="scope">
                          <el-button size="small" type="primary" @click="editMember(scope.row)">编辑</el-button>
                          <el-button size="small" type="danger" @click="deleteMember(scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    
                    <el-pagination
                      class="mt-4"
                      :current-page="memberPagination.current"
                      :page-size="memberPagination.size"
                      :total="memberPagination.total"
                      layout="total, sizes, prev, pager, next, jumper"
                      @size-change="handleMemberSizeChange"
                      @current-change="handleMemberCurrentChange"
                    />
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          
          <!-- 字典管理 -->
          <el-tab-pane label="字典管理" name="dictionary">
            <div class="filter-section mb-4">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-select
                    v-model="dictionaryFilters.type"
                    placeholder="字典类型"
                    clearable
                    class="mr-2"
                  >
                    <el-option label="运输方式" value="transport_type" />
                    <el-option label="货物品类" value="commodity_type" />
                    <el-option label="车辆类型" value="vehicle_type" />
                    <el-option label="运单状态" value="order_status" />
                  </el-select>
                </el-col>
                <el-col :span="16" class="text-right">
                  <el-button type="primary" @click="addDictionary">新增字典</el-button>
                </el-col>
              </el-row>
            </div>
            
            <el-table :data="dictionaryList" style="width: 100%">
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="type" label="字典类型" width="120">
                <template #default="scope">
                  {{ getDictionaryTypeText(scope.row.type) }}
                </template>
              </el-table-column>
              <el-table-column prop="code" label="字典编码" width="120" />
              <el-table-column prop="value" label="字典值" width="120" />
              <el-table-column prop="sort" label="排序" width="80" />
              <el-table-column prop="status" label="状态" width="80">
                <template #default="scope">
                  <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
                    {{ scope.row.status === 'active' ? '启用' : '禁用' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template #default="scope">
                  <el-button size="small" type="primary" @click="editDictionary(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteDictionary(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <el-pagination
              class="mt-4"
              :current-page="dictionaryPagination.current"
              :page-size="dictionaryPagination.size"
              :total="dictionaryPagination.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleDictionarySizeChange"
              @current-change="handleDictionaryCurrentChange"
            />
          </el-tab-pane>
          
          <!-- 系统日志 -->
          <el-tab-pane label="系统日志" name="log">
            <div class="filter-section mb-4">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-input
                    v-model="logFilters.username"
                    placeholder="操作用户"
                    clearable
                    class="mr-2"
                  />
                </el-col>
                <el-col :span="8">
                  <el-select
                    v-model="logFilters.type"
                    placeholder="操作类型"
                    clearable
                    class="mr-2"
                  >
                    <el-option label="登录" value="login" />
                    <el-option label="操作" value="operation" />
                    <el-option label="错误" value="error" />
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-date-picker
                    v-model="logFilters.dateRange"
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
                  <el-button type="primary" @click="getLogList">查询</el-button>
                  <el-button @click="resetLogFilters">重置</el-button>
                </el-col>
              </el-row>
            </div>
            
            <el-table :data="logList" style="width: 100%">
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="username" label="操作用户" width="120" />
              <el-table-column prop="ip" label="IP地址" width="120" />
              <el-table-column prop="type" label="操作类型" width="100">
                <template #default="scope">
                  <el-tag :type="getLogTypeType(scope.row.type)">
                    {{ getLogTypeText(scope.row.type) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="content" label="操作内容" />
              <el-table-column prop="createdAt" label="操作时间" width="180" />
            </el-table>
            
            <el-pagination
              class="mt-4"
              :current-page="logPagination.current"
              :page-size="logPagination.size"
              :total="logPagination.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleLogSizeChange"
              @current-change="handleLogCurrentChange"
            />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </template>
  </Layout>
  
  <!-- 角色新增/编辑弹窗 -->
  <el-dialog
    v-model="roleDialogVisible"
    :title="roleDialogTitle"
    width="500px"
  >
    <el-form :model="roleForm" :rules="roleRules" ref="roleFormRef">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input type="textarea" v-model="roleForm.description" placeholder="请输入角色描述" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRole">保存</el-button>
      </span>
    </template>
  </el-dialog>
  
  <!-- 权限设置弹窗 -->
  <el-dialog
    v-model="permissionDialogVisible"
    title="权限设置"
    width="600px"
  >
    <el-tree
      :data="permissionTree"
      node-key="id"
      show-checkbox
      default-expand-all
      :default-checked-keys="checkedPermissions"
      @check-change="handlePermissionChange"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="permissionDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="savePermissions">保存</el-button>
      </span>
    </template>
  </el-dialog>
  
  <!-- 部门新增/编辑弹窗 -->
  <el-dialog
    v-model="departmentDialogVisible"
    :title="departmentDialogTitle"
    width="400px"
  >
    <el-form :model="departmentForm" :rules="departmentRules" ref="departmentFormRef">
      <el-form-item label="部门名称" prop="label">
        <el-input v-model="departmentForm.label" placeholder="请输入部门名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="departmentDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveDepartment">保存</el-button>
      </span>
    </template>
  </el-dialog>
  
  <!-- 成员新增/编辑弹窗 -->
  <el-dialog
    v-model="memberDialogVisible"
    :title="memberDialogTitle"
    width="500px"
  >
    <el-form :model="memberForm" :rules="memberRules" ref="memberFormRef">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="memberForm.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="memberForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input v-model="memberForm.position" placeholder="请输入职位" />
      </el-form-item>
      <el-form-item label="角色" prop="roleName">
        <el-select v-model="memberForm.roleName" placeholder="请选择角色">
          <el-option label="超级管理员" value="超级管理员" />
          <el-option label="运单管理员" value="运单管理员" />
          <el-option label="财务管理员" value="财务管理员" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="memberDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMember">保存</el-button>
      </span>
    </template>
  </el-dialog>
  
  <!-- 字典新增/编辑弹窗 -->
  <el-dialog
    v-model="dictionaryDialogVisible"
    :title="dictionaryDialogTitle"
    width="500px"
  >
    <el-form :model="dictionaryForm" :rules="dictionaryRules" ref="dictionaryFormRef">
      <el-form-item label="字典类型" prop="type">
        <el-select v-model="dictionaryForm.type" placeholder="请选择字典类型">
          <el-option label="运输方式" value="transport_type" />
          <el-option label="货物品类" value="commodity_type" />
          <el-option label="车辆类型" value="vehicle_type" />
          <el-option label="运单状态" value="order_status" />
        </el-select>
      </el-form-item>
      <el-form-item label="字典编码" prop="code">
        <el-input v-model="dictionaryForm.code" placeholder="请输入字典编码" />
      </el-form-item>
      <el-form-item label="字典值" prop="value">
        <el-input v-model="dictionaryForm.value" placeholder="请输入字典值" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.number="dictionaryForm.sort" placeholder="请输入排序" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="dictionaryForm.status" placeholder="请选择状态">
          <el-option label="启用" value="active" />
          <el-option label="禁用" value="inactive" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dictionaryDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveDictionary">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import Layout from '../../components/web/Layout.vue'

// 激活的标签页
const activeTab = ref('role')

// 角色管理相关
const roleList = ref([
  {
    id: 1,
    name: '超级管理员',
    description: '拥有系统所有权限',
    createdAt: '2024-01-01 00:00:00'
  },
  {
    id: 2,
    name: '运单管理员',
    description: '管理运单相关功能',
    createdAt: '2024-01-02 00:00:00'
  },
  {
    id: 3,
    name: '财务管理员',
    description: '管理财务相关功能',
    createdAt: '2024-01-03 00:00:00'
  }
])
const roleFilters = reactive({
  name: ''
})
const rolePagination = reactive({
  current: 1,
  size: 10,
  total: 100
})
const roleDialogVisible = ref(false)
const roleDialogTitle = ref('新增角色')
const roleForm = reactive({
  id: '',
  name: '',
  description: ''
})
const roleRules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
}
const roleFormRef = ref(null)

// 权限设置相关
const permissionDialogVisible = ref(false)
const permissionTree = ref([])
const checkedPermissions = ref([])
const currentRole = ref(null)

// 组织架构相关
const departments = ref([
  {
    id: 1,
    label: '总公司',
    children: [
      {
        id: 2,
        label: '运营部',
        children: [
          { id: 4, label: '运单组' },
          { id: 5, label: '调度组' }
        ]
      },
      {
        id: 3,
        label: '财务部',
        children: [
          { id: 6, label: '会计组' },
          { id: 7, label: '出纳组' }
        ]
      }
    ]
  }
])
const members = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    position: '经理',
    roleName: '超级管理员'
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    position: '主管',
    roleName: '运单管理员'
  },
  {
    id: 3,
    name: '王五',
    phone: '13700137000',
    position: '会计',
    roleName: '财务管理员'
  }
])
const memberPagination = reactive({
  current: 1,
  size: 10,
  total: 50
})

// 部门新增/编辑相关
const departmentDialogVisible = ref(false)
const departmentDialogTitle = ref('新增部门')
const departmentForm = reactive({
  id: null,
  label: '',
  parentId: null
})
const departmentRules = {
  label: [{ required: true, message: '请输入部门名称', trigger: 'blur' }]
}
const departmentFormRef = ref(null)
const currentParentDepartment = ref(null)

// 成员新增/编辑相关
const memberDialogVisible = ref(false)
const memberDialogTitle = ref('新增成员')
const memberForm = reactive({
  id: null,
  name: '',
  phone: '',
  position: '',
  roleName: ''
})
const memberRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  roleName: [{ required: true, message: '请选择角色', trigger: 'change' }]
}
const memberFormRef = ref(null)

// 字典管理相关
const dictionaryList = ref([
  {
    id: 1,
    type: 'transport_type',
    code: 'road',
    value: '公路运输',
    sort: 1,
    status: 'active'
  },
  {
    id: 2,
    type: 'transport_type',
    code: 'rail',
    value: '铁路运输',
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
    code: 'truck',
    value: '卡车',
    sort: 1,
    status: 'active'
  },
  {
    id: 6,
    type: 'order_status',
    code: 'pending',
    value: '待接单',
    sort: 1,
    status: 'active'
  }
])
const dictionaryFilters = reactive({
  type: ''
})
const dictionaryPagination = reactive({
  current: 1,
  size: 10,
  total: 80
})

// 字典新增/编辑相关
const dictionaryDialogVisible = ref(false)
const dictionaryDialogTitle = ref('新增字典')
const dictionaryForm = reactive({
  id: null,
  type: '',
  code: '',
  value: '',
  sort: 1,
  status: 'active'
})
const dictionaryRules = {
  type: [{ required: true, message: '请选择字典类型', trigger: 'change' }],
  code: [{ required: true, message: '请输入字典编码', trigger: 'blur' }],
  value: [{ required: true, message: '请输入字典值', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入排序', trigger: 'blur' }, { type: 'number', message: '排序必须为数字', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}
const dictionaryFormRef = ref(null)

// 系统日志相关
const logList = ref([
  {
    id: 1,
    username: 'admin',
    ip: '192.168.1.1',
    type: 'login',
    content: '用户登录系统',
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
    username: 'user',
    ip: '192.168.1.2',
    type: 'error',
    content: '权限不足',
    createdAt: '2024-01-01 11:00:00'
  }
])
const logFilters = reactive({
  username: '',
  type: '',
  dateRange: []
})
const logPagination = reactive({
  current: 1,
  size: 10,
  total: 200
})

// 生命周期
onMounted(() => {
  initPermissionTree()
})

// 获取角色列表
const fetchRoleList = () => {
  // 模拟搜索
  console.log('搜索角色:', roleFilters)
  ElMessage.success('角色列表加载成功')
}

// 角色分页处理
const handleRoleSizeChange = (size) => {
  rolePagination.size = size
  fetchRoleList()
}

const handleRoleCurrentChange = (current) => {
  rolePagination.current = current
  fetchRoleList()
}

// 新增角色
const addRole = () => {
  roleDialogTitle.value = '新增角色'
  roleForm.id = ''
  roleForm.name = ''
  roleForm.description = ''
  roleDialogVisible.value = true
}

// 编辑角色
const editRole = (row) => {
  roleDialogTitle.value = '编辑角色'
  roleForm.id = row.id
  roleForm.name = row.name
  roleForm.description = row.description
  roleDialogVisible.value = true
}

// 保存角色
const saveRole = async () => {
  if (!roleFormRef.value) return
  try {
    await roleFormRef.value.validate()
    if (roleForm.id) {
      // 编辑
      const index = roleList.value.findIndex(item => item.id === roleForm.id)
      if (index !== -1) {
        roleList.value[index] = { ...roleForm }
        ElMessage.success('角色编辑成功')
      }
    } else {
      // 新增
      const newRole = {
        ...roleForm,
        id: Date.now(),
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
      roleList.value.unshift(newRole)
      ElMessage.success('角色新增成功')
    }
    roleDialogVisible.value = false
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 删除角色
const deleteRole = (row) => {
  roleList.value = roleList.value.filter(item => item.id !== row.id)
  ElMessage.success('角色删除成功')
}

// 权限设置
const setPermissions = (row) => {
  currentRole.value = row
  // 模拟权限数据
  checkedPermissions.value = [1, 2, 3, 4]
  permissionDialogVisible.value = true
}

// 初始化权限树
const initPermissionTree = () => {
  // 模拟权限树数据
  permissionTree.value = [
    {
      id: 1,
      label: '工作台',
      children: [
        { id: 11, label: '查看工作台' },
        { id: 12, label: '操作工作台' }
      ]
    },
    {
      id: 2,
      label: '运单管理',
      children: [
        { id: 21, label: '查看运单' },
        { id: 22, label: '创建运单' },
        { id: 23, label: '编辑运单' },
        { id: 24, label: '删除运单' }
      ]
    },
    {
      id: 3,
      label: '调度管理',
      children: [
        { id: 31, label: '查看调度' },
        { id: 32, label: '分配运单' }
      ]
    },
    {
      id: 4,
      label: '车辆管理',
      children: [
        { id: 41, label: '查看车辆' },
        { id: 42, label: '新增车辆' },
        { id: 43, label: '编辑车辆' },
        { id: 44, label: '删除车辆' }
      ]
    },
    {
      id: 5,
      label: '司机管理',
      children: [
        { id: 51, label: '查看司机' },
        { id: 52, label: '新增司机' },
        { id: 53, label: '编辑司机' },
        { id: 54, label: '删除司机' }
      ]
    },
    {
      id: 6,
      label: '货主管理',
      children: [
        { id: 61, label: '查看货主' },
        { id: 62, label: '新增货主' },
        { id: 63, label: '编辑货主' },
        { id: 64, label: '删除货主' }
      ]
    },
    {
      id: 7,
      label: '财务管理',
      children: [
        { id: 71, label: '查看财务' },
        { id: 72, label: '处理财务' }
      ]
    },
    {
      id: 8,
      label: '报表中心',
      children: [
        { id: 81, label: '查看报表' },
        { id: 82, label: '导出报表' }
      ]
    },
    {
      id: 9,
      label: '系统设置',
      children: [
        { id: 91, label: '角色管理' },
        { id: 92, label: '组织管理' },
        { id: 93, label: '字典管理' },
        { id: 94, label: '日志管理' }
      ]
    }
  ]
}

// 处理权限变化
const handlePermissionChange = (data, checked, indeterminate) => {
  // 处理权限变化逻辑
}

// 保存权限
const savePermissions = () => {
  ElMessage.success('权限设置成功')
  permissionDialogVisible.value = false
}

// 处理部门点击
const handleDepartmentClick = (data) => {
  // 加载部门成员
  ElMessage.info(`加载部门 ${data.label} 的成员`)
}

// 新增部门
const addDepartment = (parent) => {
  departmentDialogTitle.value = '新增部门'
  departmentForm.id = null
  departmentForm.label = ''
  departmentForm.parentId = parent ? parent.id : null
  currentParentDepartment.value = parent
  departmentDialogVisible.value = true
}

// 编辑部门
const editDepartment = (department) => {
  departmentDialogTitle.value = '编辑部门'
  departmentForm.id = department.id
  departmentForm.label = department.label
  departmentForm.parentId = department.parentId
  currentParentDepartment.value = department.parent
  departmentDialogVisible.value = true
}

// 保存部门
const saveDepartment = async () => {
  if (!departmentFormRef.value) return
  try {
    await departmentFormRef.value.validate()
    if (departmentForm.id) {
      // 编辑
      const updateDepartment = (nodes) => {
        for (const node of nodes) {
          if (node.id === departmentForm.id) {
            node.label = departmentForm.label
            return true
          }
          if (node.children && node.children.length > 0) {
            if (updateDepartment(node.children)) {
              return true
            }
          }
        }
        return false
      }
      updateDepartment(departments.value)
      ElMessage.success('部门编辑成功')
    } else {
      // 新增
      const newDepartment = {
        id: Date.now(),
        label: departmentForm.label,
        children: []
      }
      if (currentParentDepartment.value) {
        if (!currentParentDepartment.value.children) {
          currentParentDepartment.value.children = []
        }
        currentParentDepartment.value.children.push(newDepartment)
      } else {
        departments.value.push(newDepartment)
      }
      ElMessage.success('部门新增成功')
    }
    departmentDialogVisible.value = false
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 删除部门
const deleteDepartment = (department) => {
  const removeDepartment = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === department.id) {
        nodes.splice(i, 1)
        return true
      }
      if (nodes[i].children && nodes[i].children.length > 0) {
        if (removeDepartment(nodes[i].children)) {
          return true
        }
      }
    }
    return false
  }
  if (removeDepartment(departments.value)) {
    ElMessage.success('部门删除成功')
  }
}

// 获取成员列表
const getMemberList = (departmentId) => {
  // 模拟加载成员
  console.log('加载部门成员:', departmentId)
  ElMessage.success('成员列表加载成功')
}

// 成员分页处理
const handleMemberSizeChange = (size) => {
  memberPagination.size = size
  getMemberList()
}

const handleMemberCurrentChange = (current) => {
  memberPagination.current = current
  getMemberList()
}

// 新增成员
const addMember = () => {
  memberDialogTitle.value = '新增成员'
  memberForm.id = null
  memberForm.name = ''
  memberForm.phone = ''
  memberForm.position = ''
  memberForm.roleName = ''
  memberDialogVisible.value = true
}

// 编辑成员
const editMember = (row) => {
  memberDialogTitle.value = '编辑成员'
  memberForm.id = row.id
  memberForm.name = row.name
  memberForm.phone = row.phone
  memberForm.position = row.position
  memberForm.roleName = row.roleName
  memberDialogVisible.value = true
}

// 保存成员
const saveMember = async () => {
  if (!memberFormRef.value) return
  try {
    await memberFormRef.value.validate()
    if (memberForm.id) {
      // 编辑
      const index = members.value.findIndex(item => item.id === memberForm.id)
      if (index !== -1) {
        members.value[index] = { ...memberForm }
        ElMessage.success('成员编辑成功')
      }
    } else {
      // 新增
      const newMember = {
        ...memberForm,
        id: Date.now()
      }
      members.value.unshift(newMember)
      ElMessage.success('成员新增成功')
    }
    memberDialogVisible.value = false
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 删除成员
const deleteMember = (row) => {
  members.value = members.value.filter(item => item.id !== row.id)
  ElMessage.success('成员删除成功')
}

// 获取字典列表
const fetchDictionaryList = () => {
  // 模拟搜索
  console.log('搜索字典:', dictionaryFilters)
  ElMessage.success('字典列表加载成功')
}

// 字典分页处理
const handleDictionarySizeChange = (size) => {
  dictionaryPagination.size = size
  fetchDictionaryList()
}

const handleDictionaryCurrentChange = (current) => {
  dictionaryPagination.current = current
  fetchDictionaryList()
}

// 新增字典
const addDictionary = () => {
  dictionaryDialogTitle.value = '新增字典'
  dictionaryForm.id = null
  dictionaryForm.type = ''
  dictionaryForm.code = ''
  dictionaryForm.value = ''
  dictionaryForm.sort = 1
  dictionaryForm.status = 'active'
  dictionaryDialogVisible.value = true
}

// 编辑字典
const editDictionary = (row) => {
  dictionaryDialogTitle.value = '编辑字典'
  dictionaryForm.id = row.id
  dictionaryForm.type = row.type
  dictionaryForm.code = row.code
  dictionaryForm.value = row.value
  dictionaryForm.sort = row.sort
  dictionaryForm.status = row.status
  dictionaryDialogVisible.value = true
}

// 保存字典
const saveDictionary = async () => {
  if (!dictionaryFormRef.value) return
  try {
    await dictionaryFormRef.value.validate()
    if (dictionaryForm.id) {
      // 编辑
      const index = dictionaryList.value.findIndex(item => item.id === dictionaryForm.id)
      if (index !== -1) {
        dictionaryList.value[index] = { ...dictionaryForm }
        ElMessage.success('字典编辑成功')
      }
    } else {
      // 新增
      const newDictionary = {
        ...dictionaryForm,
        id: Date.now()
      }
      dictionaryList.value.unshift(newDictionary)
      ElMessage.success('字典新增成功')
    }
    dictionaryDialogVisible.value = false
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 删除字典
const deleteDictionary = (row) => {
  dictionaryList.value = dictionaryList.value.filter(item => item.id !== row.id)
  ElMessage.success('字典删除成功')
}

// 获取日志列表
const getLogList = () => {
  // 模拟搜索
  console.log('搜索日志:', logFilters)
  ElMessage.success('日志列表加载成功')
}

// 重置日志筛选条件
const resetLogFilters = () => {
  logFilters.username = ''
  logFilters.type = ''
  logFilters.dateRange = []
  getLogList()
}

// 日志分页处理
const handleLogSizeChange = (size) => {
  logPagination.size = size
  getLogList()
}

const handleLogCurrentChange = (current) => {
  logPagination.current = current
  getLogList()
}

// 获取字典类型文本
const getDictionaryTypeText = (type) => {
  const typeMap = {
    transport_type: '运输方式',
    commodity_type: '货物品类',
    vehicle_type: '车辆类型',
    order_status: '运单状态'
  }
  return typeMap[type] || type
}

// 获取日志类型类型
const getLogTypeType = (type) => {
  const typeMap = {
    login: 'info',
    operation: 'success',
    error: 'danger'
  }
  return typeMap[type] || ''
}

// 获取日志类型文本
const getLogTypeText = (type) => {
  const textMap = {
    login: '登录',
    operation: '操作',
    error: '错误'
  }
  return textMap[type] || ''
}
</script>

<style scoped>
.system-container {
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

.text-right {
  text-align: right;
}

.organization-content {
  margin-top: 20px;
}

.department-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>