<template>
  <div class="driver-income-records">
    <div class="header">
      <div class="nav-bar">
        <div class="nav-left" @click="navigateBack">
          ← 返回
        </div>
        <div class="nav-title">收入记录</div>
        <div class="nav-right"></div>
      </div>
    </div>
    
    <div class="card">
      <div class="income-summary">
        <div class="summary-item">
          <span class="summary-label">今日收入</span>
          <span class="summary-value">3000元</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">本月收入</span>
          <span class="summary-value">75000元</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">总收入</span>
          <span class="summary-value">850000元</span>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-title">收入明细</div>
      <div class="record-list">
        <div v-for="record in incomeRecords" :key="record.id" class="record-item">
          <div class="record-header">
            <div class="record-date">{{ record.date }}</div>
            <div class="record-amount">+{{ record.amount }}</div>
          </div>
          <div class="record-detail">
            <div class="record-order">运单号：{{ record.orderNo }}</div>
            <div class="record-goods">{{ record.goodsName }} {{ record.weight }}</div>
            <div class="record-route">{{ record.origin }} → {{ record.destination }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟收入记录数据
const incomeRecords = ref([
  {
    id: 1,
    date: '2026-03-23',
    amount: '3000元',
    orderNo: 'ORD20260323001',
    goodsName: '钢材',
    weight: '30吨',
    origin: '上海',
    destination: '杭州'
  },
  {
    id: 2,
    date: '2026-03-22',
    amount: '2500元',
    orderNo: 'ORD20260322001',
    goodsName: '煤炭',
    weight: '25吨',
    origin: '山西大同',
    destination: '河北唐山'
  },
  {
    id: 3,
    date: '2026-03-21',
    amount: '3500元',
    orderNo: 'ORD20260321001',
    goodsName: '粮食',
    weight: '40吨',
    origin: '黑龙江',
    destination: '北京'
  }
])

// 返回
const navigateBack = () => {
  router.back()
}
</script>

<style scoped>
.driver-income-records {
  width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1989fa;
  color: white;
  padding: 12px 16px;
  height: 44px;
}

.nav-left {
  font-size: 14px;
  cursor: pointer;
}

.nav-title {
  font-size: 16px;
  font-weight: bold;
  flex: 1;
  text-align: center;
}

.nav-right {
  width: 50px;
}

.card {
  background-color: white;
  margin: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.income-summary {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.summary-item {
  flex: 1;
}

.summary-label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.summary-value {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #52c41a;
}

.record-list {
  padding: 0;
}

.record-item {
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 0;
}

.record-item:last-child {
  border-bottom: none;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.record-date {
  font-size: 14px;
  color: #666;
}

.record-amount {
  font-size: 16px;
  font-weight: bold;
  color: #52c41a;
}

.record-detail {
  font-size: 12px;
  color: #999;
}

.record-order {
  margin-bottom: 4px;
}

.record-goods {
  margin-bottom: 4px;
}

.record-route {
  margin-bottom: 4px;
}
</style>