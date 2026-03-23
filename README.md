# 大宗物流TMS管理系统

## 项目简介

大宗物流TMS管理系统是一个综合性的物流运输管理平台，包含货主端、司机端小程序和运营管理后台三个主要模块。系统提供了完整的运单管理、司机管理、车辆管理、货主管理、财务管理、报表中心和系统设置等功能，旨在提高物流运输的效率和管理水平。

## 技术栈

- **前端框架**：Vue 3 + Composition API
- **UI库**：Element Plus（后台）、Vant（移动端）
- **状态管理**：Pinia
- **路由**：Vue Router
- **网络请求**：Axios
- **数据可视化**：ECharts
- **构建工具**：Vite

## 系统架构

系统采用前后端分离架构，前端使用Vue 3框架构建，后端API通过Axios进行调用。系统分为三个主要模块：

1. **货主端**：供货主用户使用，包含运单创建、查询、地址管理等功能
2. **司机端**：供司机用户使用，包含运单接收、运输状态更新、回单上传等功能
3. **运营管理后台**：供系统管理员使用，包含运单管理、司机管理、车辆管理、货主管理、财务管理、报表中心和系统设置等功能

## 核心功能

### 运单管理
- 新增运单
- 编辑运单
- 删除运单
- 运单详情查看
- 人工调度
- 取消订单
- 查看回单
- 异常处理

### 司机管理
- 新增司机
- 编辑司机信息
- 删除司机
- 查看司机档案

### 车辆管理
- 编辑车辆信息
- 查看车辆档案
- 删除车辆

### 货主管理
- 新增货主
- 编辑货主信息
- 重置货主密码
- 删除货主

### 财务管理
- 财务数据查看

### 报表中心
- 生成报表
- 导出报表

### 系统设置
- 组织架构管理
- 字典管理
- 系统日志管理

## 项目结构

```
transportation-management-system-tms/
├── src/
│   ├── api/             # API接口定义
│   ├── components/      # 公共组件
│   │   ├── mobile/      # 移动端组件
│   │   └── web/         # 后台组件
│   ├── router/          # 路由配置
│   ├── stores/          # 状态管理
│   ├── utils/           # 工具函数
│   ├── views/           # 页面组件
│   │   ├── driver/      # 司机端页面
│   │   ├── entry/       # 登录和入口页面
│   │   ├── shipper/     # 货主端页面
│   │   └── web/         # 后台管理页面
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── docs/                # 项目文档
│   └── comprehensive-improvement/  # 综合改进文档
├── dist/                # 构建输出
├── package.json         # 项目配置
├── vite.config.js       # Vite配置
└── README.md            # 项目说明
```

## 安装和运行

### 环境要求
- Node.js >= 16
- npm >= 7

### 安装依赖
```bash
npm install
```

### 开发模式运行
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 开发规范

项目遵循以下开发规范：

1. **代码规范**：使用Vue 3 Composition API，保持代码风格一致
2. **命名规范**：组件和文件使用 PascalCase 命名，变量和函数使用 camelCase 命名
3. **文档规范**：按照项目规则创建和更新文档
4. **提交规范**：使用清晰的提交信息，格式为 `[模块名] 简要描述修改内容 - 关联任务/需求编号`

## 文档结构

项目文档按照6A工作流程组织，存放在 `docs/comprehensive-improvement/` 目录下：

- `DOCUMENT_REVIEW_comprehensive-improvement.md` - 文档读取记录
- `ALIGNMENT_comprehensive-improvement.md` - 需求对齐文档
- `CONSENSUS_comprehensive-improvement.md` - 需求共识文档
- `DESIGN_comprehensive-improvement.md` - 架构设计文档
- `product/PRD_comprehensive-improvement.md` - 产品需求文档
- `design/UI_SPEC_comprehensive-improvement.md` - UI设计规范
- `TASK_comprehensive-improvement.md` - 原子任务文档
- `test/TEST_CASE_comprehensive-improvement.md` - 测试用例文档
- `ACCEPTANCE_comprehensive-improvement.md` - 验收记录文档
- `FINAL_comprehensive-improvement.md` - 最终交付报告

## 版本历史

### v0.1.0
- 初始化项目
- 实现货主端、司机端和运营管理后台的基础功能
- 完成综合改进，包括运单管理、司机管理、车辆管理、货主管理、财务管理、报表中心和系统设置的功能完善

## 贡献指南

1. 克隆项目
2. 创建功能分支
3. 实现功能
4. 编写测试
5. 提交代码
6. 创建Pull Request

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系项目维护人员。