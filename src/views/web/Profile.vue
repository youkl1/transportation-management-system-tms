<template>
  <div class="profile-container">
    <el-card class="mb-4">
      <template #header>
        <div class="card-header">
          <span>个人中心</span>
        </div>
      </template>
      
      <el-tabs v-model="activeTab">
        <!-- 个人信息 -->
        <el-tab-pane label="个人信息" name="info">
          <el-form :model="userForm" :rules="userRules" ref="userFormRef" label-width="120px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" disabled />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="userForm.name" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userForm.phone" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email" />
            </el-form-item>
            <el-form-item label="所属部门" prop="department">
              <el-input v-model="userForm.department" disabled />
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-input v-model="userForm.role" disabled />
            </el-form-item>
            <el-form-item label="最后登录时间" prop="lastLogin">
              <el-input v-model="userForm.lastLogin" disabled />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveUserInfo">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <!-- 修改密码 -->
        <el-tab-pane label="修改密码" name="password">
          <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="120px">
            <el-form-item label="原密码" prop="oldPassword">
              <el-input type="password" v-model="passwordForm.oldPassword" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input type="password" v-model="passwordForm.newPassword" />
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPassword">
              <el-input type="password" v-model="passwordForm.confirmPassword" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changePassword">修改密码</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <!-- 安全设置 -->
        <el-tab-pane label="安全设置" name="security">
          <el-table :data="securityLogs" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="type" label="操作类型" width="120">
              <template #default="scope">
                <el-tag :type="getSecurityLogTypeType(scope.row.type)">
                  {{ getSecurityLogTypeText(scope.row.type) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="操作内容" />
            <el-table-column prop="ip" label="IP地址" width="120" />
            <el-table-column prop="createdAt" label="操作时间" width="180" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

// 激活的标签页
const activeTab = ref('info')

// 用户信息表单
const userForm = reactive({
  username: '',
  name: '',
  phone: '',
  email: '',
  department: '',
  role: '',
  lastLogin: ''
})

const userRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

const userFormRef = ref(null)

// 密码修改表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordRules = {
  oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const passwordFormRef = ref(null)

// 安全日志
const securityLogs = ref([])

// 用户Store
const userStore = useUserStore()

// 生命周期
onMounted(() => {
  loadUserInfo()
  loadSecurityLogs()
})

// 加载用户信息
const loadUserInfo = () => {
  // 模拟用户信息
  userForm.username = 'admin'
  userForm.name = '管理员'
  userForm.phone = '13800138000'
  userForm.email = 'admin@example.com'
  userForm.department = '技术部'
  userForm.role = '超级管理员'
  userForm.lastLogin = '2024-01-01 12:00:00'
}

// 加载安全日志
const loadSecurityLogs = () => {
  // 模拟安全日志
  securityLogs.value = [
    { id: 1, type: 'login', content: '登录系统', ip: '192.168.1.1', createdAt: '2024-01-01 12:00:00' },
    { id: 2, type: 'password', content: '修改密码', ip: '192.168.1.1', createdAt: '2024-01-02 10:00:00' },
    { id: 3, type: 'login', content: '登录系统', ip: '192.168.1.2', createdAt: '2024-01-03 09:00:00' },
    { id: 4, type: 'operation', content: '操作运单', ip: '192.168.1.1', createdAt: '2024-01-03 11:00:00' }
  ]
}

// 保存用户信息
const saveUserInfo = async () => {
  if (!userFormRef.value) return
  await userFormRef.value.validate(async (valid) => {
    if (valid) {
      // 模拟保存
      ElMessage.success('保存成功')
    }
  })
}

// 修改密码
const changePassword = async () => {
  if (!passwordFormRef.value) return
  await passwordFormRef.value.validate(async (valid) => {
    if (valid) {
      // 模拟修改
      ElMessage.success('密码修改成功')
      passwordForm.oldPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    }
  })
}

// 获取安全日志类型类型
const getSecurityLogTypeType = (type) => {
  const typeMap = {
    login: 'info',
    password: 'warning',
    operation: 'success',
    error: 'danger'
  }
  return typeMap[type] || ''
}

// 获取安全日志类型文本
const getSecurityLogTypeText = (type) => {
  const textMap = {
    login: '登录',
    password: '密码修改',
    operation: '操作',
    error: '错误'
  }
  return textMap[type] || ''
}
</script>

<style scoped>
.profile-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mb-4 {
  margin-bottom: 20px;
}
</style>