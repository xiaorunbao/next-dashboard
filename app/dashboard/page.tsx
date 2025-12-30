'use client';

import { 
  useGetInvoicesQuery, 
  useGetCustomersQuery,
  useAppSelector,
  useAppDispatch,
  setLoading,
  toggleSidebar
} from '@/app/lib/store/store';
import { useEffect } from 'react';

export default function DashboardPage() {
  // 使用RTK Query获取数据
  const { data: invoices, isLoading: invoicesLoading } = useGetInvoicesQuery();
  const { data: customers, isLoading: customersLoading } = useGetCustomersQuery();
  
  // 使用Redux状态
  const dispatch = useAppDispatch();
  const { loading, sidebarOpen } = useAppSelector((state) => state.ui);

  // 同步加载状态
  useEffect(() => {
    dispatch(setLoading(invoicesLoading || customersLoading));
  }, [invoicesLoading, customersLoading, dispatch]);

  // 计算统计数据
  const totalRevenue = invoices?.reduce((sum, invoice) => sum + invoice.amount, 0) || 0;
  const pendingInvoices = invoices?.filter(inv => inv.status === 'pending').length || 0;
  const paidInvoices = invoices?.filter(inv => inv.status === 'paid').length || 0;

  return (
    <div className="p-6">
      {/* 头部 */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">仪表板</h1>
            <p className="text-gray-600 mt-2">欢迎使用Next.js仪表板</p>
          </div>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {sidebarOpen ? '关闭侧边栏' : '打开侧边栏'}
          </button>
        </div>
      </div>

      {/* 加载状态 */}
      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">加载数据中...</span>
        </div>
      )}

      {/* 统计卡片 */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总收入</p>
                <p className="text-2xl font-bold text-gray-900">¥{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">已支付发票</p>
                <p className="text-2xl font-bold text-gray-900">{paidInvoices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">待处理发票</p>
                <p className="text-2xl font-bold text-gray-900">{pendingInvoices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">客户总数</p>
                <p className="text-2xl font-bold text-gray-900">{customers?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 状态指示器 */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Redux Toolkit 集成成功</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>✅ Redux Toolkit 已配置完成</p>
              <p>✅ RTK Query 正在获取数据</p>
              <p>✅ 状态管理正常工作</p>
              <p>✅ 侧边栏状态: {sidebarOpen ? '打开' : '关闭'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}