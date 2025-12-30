# Redux Toolkit 和 RTK Query 集成指南

这个项目已经成功集成了 Redux Toolkit 和 RTK Query，为 Next.js 应用提供了强大的状态管理解决方案。

## 🚀 功能特性

- ✅ **Redux Toolkit** - 现代化的 Redux 开发工具包
- ✅ **RTK Query** - 内置的数据获取和缓存解决方案
- ✅ **TypeScript 支持** - 完整的类型安全
- ✅ **Next.js 集成** - 专为 Next.js 优化
- ✅ **自定义 Hooks** - 类型安全的 Redux hooks

## 📁 项目结构

```
app/
├── lib/
│   └── store/
│       ├── index.ts          # Store 配置
│       ├── hooks.ts          # 类型安全的 hooks
│       ├── store.ts          # 统一导出文件
│       └── slices/
│           ├── uiSlice.ts    # UI 状态管理
│           ├── invoicesApi.ts # 发票 API slice
│           └── customersApi.ts # 客户 API slice
├── components/
│   └── providers/
│       └── ReduxProvider.tsx # Redux Provider 组件
├── api/
│   ├── invoices/             # 发票 API 路由
│   └── customers/            # 客户 API 路由
└── dashboard/
    ├── page.tsx              # 仪表板页面（演示 Redux 使用）
    └── invoices/
        └── page.tsx          # 发票管理页面
```

## 🛠 安装和使用

### 1. 安装依赖

项目已经配置好所有必要的依赖：

```bash
pnpm add @reduxjs/toolkit react-redux
```

### 2. 基本使用

#### 在组件中使用 RTK Query

```tsx
"use client";

import { useGetInvoicesQuery } from "@/app/lib/store/store";

export default function MyComponent() {
  const { data: invoices, error, isLoading } = useGetInvoicesQuery();

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.toString()}</div>;

  return (
    <div>
      {invoices?.map((invoice) => (
        <div key={invoice.id}>{invoice.id}</div>
      ))}
    </div>
  );
}
```

#### 使用 Redux 状态

```tsx
"use client";

import {
  useAppSelector,
  useAppDispatch,
  setSearchQuery,
} from "@/app/lib/store/store";

export default function SearchComponent() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.ui);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  return (
    <input
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="搜索..."
    />
  );
}
```

## 📊 API 端点

### 发票管理

- `GET /api/invoices` - 获取所有发票
- `POST /api/invoices` - 创建新发票

### 客户管理

- `GET /api/customers` - 获取所有客户
- `POST /api/customers` - 创建新客户

## 🔧 可用的 Hooks

### RTK Query Hooks

- `useGetInvoicesQuery` - 获取发票列表
- `useGetInvoiceByIdQuery` - 获取单个发票
- `useCreateInvoiceMutation` - 创建发票
- `useUpdateInvoiceMutation` - 更新发票
- `useDeleteInvoiceMutation` - 删除发票

- `useGetCustomersQuery` - 获取客户列表
- `useGetCustomerByIdQuery` - 获取单个客户
- `useCreateCustomerMutation` - 创建客户
- `useUpdateCustomerMutation` - 更新客户
- `useDeleteCustomerMutation` - 删除客户

### UI 状态 Hooks

- `useAppSelector` - 选择 Redux 状态
- `useAppDispatch` - 分发 actions
- `setLoading` - 设置加载状态
- `setError` - 设置错误信息
- `toggleSidebar` - 切换侧边栏
- `setSearchQuery` - 设置搜索查询
- `setCurrentPage` - 设置当前页面

## 🎯 最佳实践

1. **总是使用类型安全的 hooks** - 使用 `useAppSelector` 和 `useAppDispatch` 而不是原始的 Redux hooks
2. **合理使用 RTK Query** - 对于数据获取，优先使用 RTK Query 而不是手动管理状态
3. **保持 slices 小而专注** - 每个 slice 应该管理一个特定的功能域
4. **使用 TypeScript** - 充分利用类型安全的好处

## 🔍 调试

Redux Toolkit 集成了 Redux DevTools 扩展，你可以在浏览器中安装 Redux DevTools 来调试应用的状态变化。

## 📚 学习资源

- [Redux Toolkit 官方文档](https://redux-toolkit.js.org/)
- [RTK Query 官方文档](https://redux-toolkit.js.org/rtk-query/overview)
- [Next.js 官方文档](https://nextjs.org/docs)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！
