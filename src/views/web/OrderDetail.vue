<template>
  <div class="web-order-detail">
    <Layout>
      <template #default>
        <el-card class="mb-4">
          <template #header>
            <div class="card-header">
              <span>运单详情</span>
              <el-button type="primary" @click="navigateBack">
                <el-icon><ArrowLeft /></el-icon>
                返回
              </el-button>
            </div>
          </template>
          
          <!-- 运单基本信息 -->
          <el-tabs type="border-card">
            <el-tab-pane label="基本信息">
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">运单号：</span>
                  <span class="value">{{ order.orderNo }}</span>
                </div>
                <div class="info-item">
                  <span class="label">状态：</span>
                  <span class="value status-{{ order.status }}">{{ order.status }}</span>
                </div>
                <div class="info-item">
                  <span class="label">货物信息：</span>
                  <span class="value">{{ order.goodsName }} {{ order.weight }}</span>
                </div>
                <div class="info-item">
                  <span class="label">运输路线：</span>
                  <span class="value">{{ order.origin }} → {{ order.destination }}</span>
                </div>
                <div class="info-item">
                  <span class="label">运输方式：</span>
                  <span class="value">{{ order.transportType }}</span>
                </div>
                <div class="info-item">
                  <span class="label">创建时间：</span>
                  <span class="value">{{ order.createTime }}</span>
                </div>
                <div class="info-item">
                  <span class="label">货主：</span>
                  <span class="value">{{ order.shipper }}</span>
                </div>
                <div class="info-item">
                  <span class="label">司机：</span>
                  <span class="value">{{ order.driver }}</span>
                </div>
                <div class="info-item">
                  <span class="label">车辆：</span>
                  <span class="value">{{ order.vehicle }}</span>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="运输轨迹">
              <div class="map-container">
                <div class="map-placeholder">
                  <div class="map-marker origin">装货点</div>
                  <div class="map-line"></div>
                  <div class="map-marker destination">卸货点</div>
                  <div class="map-car" :style="{ left: '40%' }"></div>
                </div>
                <div class="location-info">
                  当前位置：{{ order.currentLocation }}
                </div>
              </div>
              <div class="timeline">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item, index) in order.timeline"
                    :key="index"
                    :timestamp="item.time"
                    :type="item.type"
                  >
                    {{ item.content }}
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="磅单/回单">
              <div class="documents">
                <el-upload
                  class="upload-demo"
                  action="#"
                  :auto-upload="false"
                  :on-change="handleFileChange"
                >
                  <el-button type="primary">
                    <el-icon><Upload /></el-icon>
                    上传文件
                  </el-button>
                </el-upload>
                <div class="file-list">
                  <el-image
                    v-for="(doc, index) in order.documents"
                    :key="index"
                    :src="doc.url"
                    fit="cover"
                    class="document-image"
                    @click="previewDocument(doc)"
                  />
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="操作日志">
              <el-table :data="order.operationLogs" style="width: 100%">
                <el-table-column prop="time" label="操作时间" />
                <el-table-column prop="operator" label="操作人" />
                <el-table-column prop="action" label="操作内容" />
                <el-table-column prop="remarks" label="备注" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
          
          <!-- 操作按钮 -->
          <div class="actions">
            <el-button type="primary" @click="dispatchOrder">
              人工调度
            </el-button>
            <el-button @click="cancelOrder">
              取消运单
            </el-button>
            <el-button @click="viewReceipt">
              查看回单
            </el-button>
            <el-button @click="handleException">
              异常处理
            </el-button>
          </div>
        </el-card>
      </template>
    </Layout>
    
    <!-- 人工调度弹窗 -->
    <el-dialog
      v-model="dispatchDialogVisible"
      title="人工调度"
      width="600px"
    >
      <el-form :model="dispatchForm" :rules="dispatchRules" ref="dispatchFormRef">
        <el-form-item label="选择司机" prop="driverId">
          <el-select v-model="dispatchForm.driverId" placeholder="请选择司机">
            <el-option
              v-for="driver in drivers"
              :key="driver.id"
              :label="driver.name"
              :value="driver.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择车辆" prop="vehicleId">
          <el-select v-model="dispatchForm.vehicleId" placeholder="请选择车辆">
            <el-option
              v-for="vehicle in vehicles"
              :key="vehicle.id"
              :label="vehicle.number"
              :value="vehicle.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="调度备注" prop="remark">
          <el-input type="textarea" v-model="dispatchForm.remark" placeholder="请输入调度备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dispatchDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmDispatch">确认调度</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 取消运单弹窗 -->
    <el-dialog
      v-model="cancelDialogVisible"
      title="取消运单"
      width="400px"
    >
      <p>确定要取消运单 <span style="color: #f56c6c">{{ order.orderNo }}</span> 吗？</p>
      <el-form :model="cancelForm" :rules="cancelRules" ref="cancelFormRef">
        <el-form-item label="取消原因" prop="reason">
          <el-input type="textarea" v-model="cancelForm.reason" placeholder="请输入取消原因" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="confirmCancel">确认取消</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 查看回单弹窗 -->
    <el-dialog
      v-model="receiptDialogVisible"
      title="查看回单"
      width="800px"
    >
      <div class="receipt-content">
        <h3>回单信息</h3>
        <div class="receipt-info">
          <div class="info-item">
            <span class="label">运单号：</span>
            <span class="value">{{ order.orderNo }}</span>
          </div>
          <div class="info-item">
            <span class="label">签收时间：</span>
            <span class="value">{{ order.receiptTime || '未签收' }}</span>
          </div>
          <div class="info-item">
            <span class="label">签收人：</span>
            <span class="value">{{ order.receiptPerson || '未签收' }}</span>
          </div>
          <div class="info-item">
            <span class="label">签收备注：</span>
            <span class="value">{{ order.receiptRemark || '无' }}</span>
          </div>
        </div>
        <h4>回单图片</h4>
        <div class="file-list">
          <el-image
            v-for="(doc, index) in order.documents"
            :key="index"
            :src="doc.url"
            fit="cover"
            class="document-image"
            @click="previewDocument(doc)"
          />
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="receiptDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 异常处理弹窗 -->
    <el-dialog
      v-model="exceptionDialogVisible"
      title="异常处理"
      width="600px"
    >
      <el-form :model="exceptionForm" :rules="exceptionRules" ref="exceptionFormRef">
        <el-form-item label="异常类型" prop="type">
          <el-select v-model="exceptionForm.type" placeholder="请选择异常类型">
            <el-option label="货物损坏" value="damage" />
            <el-option label="延期到达" value="delay" />
            <el-option label="路线变更" value="route" />
            <el-option label="其他异常" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="异常描述" prop="description">
          <el-input type="textarea" v-model="exceptionForm.description" placeholder="请详细描述异常情况" />
        </el-form-item>
        <el-form-item label="处理方案" prop="solution">
          <el-input type="textarea" v-model="exceptionForm.solution" placeholder="请输入处理方案" />
        </el-form-item>
        <el-form-item label="处理人" prop="handler">
          <el-input v-model="exceptionForm.handler" placeholder="请输入处理人" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="exceptionDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmException">确认处理</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 图片预览弹窗 -->
    <el-dialog
      v-model="previewDialogVisible"
      title="图片预览"
      width="800px"
    >
      <el-image
        :src="previewImageUrl"
        fit="contain"
        class="preview-image"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Layout from '../../components/web/Layout.vue'
import {
  ArrowLeft,
  Upload
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const orderId = route.params.id

// 模拟运单数据
const order = ref({
  id: orderId,
  orderNo: 'ORD20240102002',
  status: '运输中',
  goodsName: '钢材',
  weight: '30吨',
  origin: '上海',
  destination: '杭州',
  transportType: '整车',
  createTime: '2024-01-02 14:30:00',
  shipper: '货主企业',
  driver: '李四',
  vehicle: '京A12345',
  currentLocation: '上海市嘉定区安亭镇',
  receiptTime: '2024-01-03 10:00:00',
  receiptPerson: '王五',
  receiptRemark: '货物完好',
  timeline: [
    {
      time: '2024-01-02 14:30:00',
      type: 'primary',
      content: '下单'
    },
    {
      time: '2024-01-02 15:00:00',
      type: 'success',
      content: '派车'
    },
    {
      time: '2024-01-02 16:00:00',
      type: 'warning',
      content: '装货'
    },
    {
      time: '2024-01-02 17:00:00',
      type: 'info',
      content: '运输中'
    }
  ],
  documents: [
    {
      url: 'https://via.placeholder.com/150'
    },
    {
      url: 'https://via.placeholder.com/150'
    }
  ],
  operationLogs: [
    {
      time: '2024-01-02 14:30:00',
      operator: '张三',
      action: '创建运单',
      remarks: '新订单'
    },
    {
      time: '2024-01-02 15:00:00',
      operator: '系统',
      action: '自动派车',
      remarks: '分配给司机李四'
    }
  ]
})

// 模拟司机数据
const drivers = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
])

// 模拟车辆数据
const vehicles = ref([
  { id: 1, number: '京A12345' },
  { id: 2, number: '沪B67890' },
  { id: 3, number: '粤C13579' }
])

// 人工调度
const dispatchDialogVisible = ref(false)
const dispatchForm = ref({
  driverId: '',
  vehicleId: '',
  remark: ''
})
const dispatchRules = {
  driverId: [{ required: true, message: '请选择司机', trigger: 'change' }],
  vehicleId: [{ required: true, message: '请选择车辆', trigger: 'change' }]
}
const dispatchFormRef = ref(null)

// 取消运单
const cancelDialogVisible = ref(false)
const cancelForm = ref({
  reason: ''
})
const cancelRules = {
  reason: [{ required: true, message: '请输入取消原因', trigger: 'blur' }]
}
const cancelFormRef = ref(null)

// 查看回单
const receiptDialogVisible = ref(false)

// 异常处理
const exceptionDialogVisible = ref(false)
const exceptionForm = ref({
  type: '',
  description: '',
  solution: '',
  handler: ''
})
const exceptionRules = {
  type: [{ required: true, message: '请选择异常类型', trigger: 'change' }],
  description: [{ required: true, message: '请详细描述异常情况', trigger: 'blur' }],
  solution: [{ required: true, message: '请输入处理方案', trigger: 'blur' }],
  handler: [{ required: true, message: '请输入处理人', trigger: 'blur' }]
}
const exceptionFormRef = ref(null)

// 图片预览
const previewDialogVisible = ref(false)
const previewImageUrl = ref('')

// 处理文件上传
const handleFileChange = (file) => {
  console.log('文件上传:', file)
  ElMessage.success('文件上传成功')
}

// 预览文档
const previewDocument = (doc) => {
  previewImageUrl.value = doc.url
  previewDialogVisible.value = true
}

// 人工调度
const dispatchOrder = () => {
  dispatchDialogVisible.value = true
}

// 确认调度
const confirmDispatch = async () => {
  if (!dispatchFormRef.value) return
  await dispatchFormRef.value.validate(async (valid) => {
    if (valid) {
      // 模拟调度
      const driver = drivers.value.find(d => d.id === dispatchForm.value.driverId)
      const vehicle = vehicles.value.find(v => v.id === dispatchForm.value.vehicleId)
      
      order.value.driver = driver.name
      order.value.vehicle = vehicle.number
      
      // 添加操作日志
      order.value.operationLogs.push({
        time: new Date().toLocaleString('zh-CN'),
        operator: '管理员',
        action: '人工调度',
        remarks: `分配给司机 ${driver.name}，车辆 ${vehicle.number}`
      })
      
      ElMessage.success('调度成功')
      dispatchDialogVisible.value = false
    }
  })
}

// 取消运单
const cancelOrder = () => {
  cancelDialogVisible.value = true
}

// 确认取消
const confirmCancel = async () => {
  if (!cancelFormRef.value) return
  await cancelFormRef.value.validate(async (valid) => {
    if (valid) {
      // 模拟取消
      order.value.status = '已取消'
      
      // 添加操作日志
      order.value.operationLogs.push({
        time: new Date().toLocaleString('zh-CN'),
        operator: '管理员',
        action: '取消运单',
        remarks: cancelForm.value.reason
      })
      
      ElMessage.success('运单已取消')
      cancelDialogVisible.value = false
    }
  })
}

// 查看回单
const viewReceipt = () => {
  receiptDialogVisible.value = true
}

// 异常处理
const handleException = () => {
  exceptionDialogVisible.value = true
}

// 确认异常处理
const confirmException = async () => {
  if (!exceptionFormRef.value) return
  await exceptionFormRef.value.validate(async (valid) => {
    if (valid) {
      // 模拟异常处理
      // 添加操作日志
      order.value.operationLogs.push({
        time: new Date().toLocaleString('zh-CN'),
        operator: '管理员',
        action: '异常处理',
        remarks: `类型：${exceptionForm.value.type}，描述：${exceptionForm.value.description}`
      })
      
      ElMessage.success('异常处理成功')
      exceptionDialogVisible.value = false
    }
  })
}

// 返回
const navigateBack = () => {
  router.back()
}
</script>

<style scoped>
.web-order-detail {
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

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: center;
}

.label {
  width: 100px;
  color: #666;
  flex-shrink: 0;
}

.value {
  flex: 1;
  color: #333;
}

.status-待调度 {
  color: #666;
}

.status-运输中 {
  color: #409eff;
}

.status-已签收 {
  color: #52c41a;
}

.status-已取消 {
  color: #f56c6c;
}

.map-container {
  position: relative;
  height: 300px;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.map-placeholder {
  position: relative;
  height: 100%;
  padding: 20px;
}

.map-marker {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 4px 8px;
  background-color: white;
  border-radius: 4px;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.map-marker.origin {
  left: 20px;
}

.map-marker.destination {
  right: 20px;
}

.map-line {
  position: absolute;
  top: 50%;
  left: 100px;
  right: 100px;
  height: 2px;
  background-color: #1989fa;
  transform: translateY(-50%);
}

.map-car {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: #1989fa;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.location-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
}

.timeline {
  margin-top: 20px;
}

.documents {
  margin-top: 20px;
}

.file-list {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.document-image {
  width: 150px;
  height: 150px;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s;
}

.document-image:hover {
  transform: scale(1.05);
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.receipt-content {
  margin-top: 20px;
}

.receipt-content h3 {
  margin-bottom: 16px;
  color: #333;
}

.receipt-content h4 {
  margin-top: 24px;
  margin-bottom: 16px;
  color: #666;
}

.receipt-info {
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.receipt-info .info-item {
  margin-bottom: 8px;
}

.preview-image {
  width: 100%;
  height: 500px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>