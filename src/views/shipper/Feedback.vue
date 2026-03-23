<template>
  <div class="shipper-feedback">
    <div class="header">
      <div class="back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <h1>意见反馈</h1>
      <div class="placeholder"></div>
    </div>
    
    <div class="feedback-card">
      <van-form @submit="submitFeedback">
        <van-field
          v-model="form.type"
          name="type"
          label="反馈类型"
          placeholder="请选择反馈类型"
          :rules="[{ required: true, message: '请选择反馈类型' }]"
        >
          <template #input>
            <van-picker
              v-model="form.type"
              :columns="feedbackTypes"
              @confirm="onTypeConfirm"
              show-toolbar
              title="选择反馈类型"
            />
          </template>
        </van-field>
        <van-field
          v-model="form.content"
          name="content"
          label="反馈内容"
          placeholder="请详细描述您的问题或建议"
          type="textarea"
          :rows="5"
          :rules="[{ required: true, message: '请输入反馈内容' }]"
        />
        <van-field
          v-model="form.contact"
          name="contact"
          label="联系方式"
          placeholder="请留下您的联系方式，便于我们回复"
        />
        <van-button type="primary" size="large" native-type="submit" class="submit-button">
          提交反馈
        </van-button>
      </van-form>
    </div>
    
    <ShipperTabbar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import ShipperTabbar from '../../components/mobile/ShipperTabbar.vue'

const router = useRouter()

// 反馈类型
const feedbackTypes = ['功能建议', 'bug反馈', '体验问题', '其他']

// 表单数据
const form = ref({
  type: '',
  content: '',
  contact: ''
})

// 返回上一页
const goBack = () => {
  router.back()
}

// 选择反馈类型
const onTypeConfirm = (value) => {
  form.value.type = value
}

// 提交反馈
const submitFeedback = () => {
  // 模拟提交反馈
  showToast('反馈提交成功，感谢您的建议！')
  setTimeout(() => {
    router.back()
  }, 1500)
}
</script>

<style scoped>
.shipper-feedback {
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
}

.header {
  background-color: #1989fa;
  color: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.header h1 {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.placeholder {
  width: 40px;
}

.feedback-card {
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.submit-button {
  margin-top: 20px;
}
</style>