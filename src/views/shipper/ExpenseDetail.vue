<template>
  <div class="shipper-expense-detail">
    <div class="header">
      <div class="back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <h1>费用明细</h1>
      <div class="placeholder"></div>
    </div>
    
    <!-- 费用统计 -->
    <div class="expense-summary">
      <div class="summary-item">
        <div class="summary-label">本月支出</div>
        <div class="summary-value">¥{{ summary.monthlyExpense }}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">年度支出</div>
        <div class="summary-value">¥{{ summary.yearlyExpense }}</div>
      </div>
    </div>
    
    <!-- 费用列表 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMore"
    >
      <van-cell 
        v-for="expense in expenses" 
        :key="expense.id"
        :title="expense.title"
        :value="`¥${expense.amount}`"
      >
        <template #default>
          <div class="expense-info">
            <div>{{ expense.orderNo }}</div>
            <div class="expense-date">{{ expense.date }}</div>
          </div>
        </template>
      </van-cell>
    </van-list>
    
    <ShipperTabbar />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ShipperTabbar from '../../components/mobile/ShipperTabbar.vue'

const router = useRouter()

const loading = ref(false)
const finished = ref(false)

// 费用统计
const summary = ref({
  monthlyExpense: '12,580.00',
  yearlyExpense: '156,320.00'
})

// 费用数据
const expenses = ref([
  {
    id: 1,
    title: '运输费用',
    amount: '3,200.00',
    orderNo: 'ORD20260320001',
    date: '2026-03-20'
  },
  {
    id: 2,
    title: '燃油费用',
    amount: '1,500.00',
    orderNo: 'ORD20260318002',
    date: '2026-03-18'
  },
  {
    id: 3,
    title: '过路费',
    amount: '850.00',
    orderNo: 'ORD20260315003',
    date: '2026-03-15'
  },
  {
    id: 4,
    title: '运输费用',
    amount: '4,200.00',
    orderNo: 'ORD20260310004',
    date: '2026-03-10'
  },
  {
    id: 5,
    title: '燃油费用',
    amount: '1,830.00',
    orderNo: 'ORD20260305005',
    date: '2026-03-05'
  }
])

// 返回上一页
const goBack = () => {
  router.back()
}

// 加载更多
const loadMore = () => {
  // 模拟加载更多数据
  setTimeout(() => {
    loading.value = false
    finished.value = true
  }, 1000)
}
</script>

<style scoped>
.shipper-expense-detail {
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

.expense-summary {
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.summary-item {
  flex: 1;
}

.summary-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.summary-value {
  font-size: 20px;
  font-weight: bold;
  color: #1989fa;
}

.expense-info {
  flex: 1;
}

.expense-date {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>