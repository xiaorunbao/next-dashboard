'use client';

import { 
  useGetInvoicesQuery, 
  useGetCustomersQuery,
  useAppSelector,
  useAppDispatch,
  setLoading,
  setSearchQuery,
  setCurrentPage
} from '@/app/lib/store/store';
import { useEffect } from 'react';

export default function InvoicesPage() {
  // 使用RTK Query获取数据
  const { data: invoices, error: invoicesError, isLoading: invoicesLoading } = useGetInvoicesQuery();
  const { data: customers, error: customersError, isLoading: customersLoading } = useGetCustomersQuery();
  
  // 使用Redux状态
  const dispatch = useAppDispatch();
  const { loading, searchQuery, currentPage } = useAppSelector((state) => state.ui);

  // 同步RTK Query的加载状态到UI状态
  useEffect(() => {
    dispatch(setLoading(invoicesLoading || customersLoading));
  }, [invoicesLoading, customersLoading, dispatch]);

  // 处理搜索
  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  // 处理分页
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // 过滤发票数据
  const filteredInvoices = invoices?.filter(invoice => 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (invoicesError || customersError) {
    return (
      <div className="p-6">
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-red-800">
            加载数据时出错: {(invoicesError || customersError)?.toString()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">发票管理</h1>
        
        {/* 搜索栏 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="搜索发票..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">加载中...</span>
          </div>
        )}
      </div>

      {/* 数据展示 */}
      {!loading && (
        <div className="grid gap-6">
          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">总发票数</h3>
              <p className="text-3xl font-bold text-blue-600">{filteredInvoices.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">客户数量</h3>
              <p className="text-3xl font-bold text-green-600">{customers?.length || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">待处理发票</h3>
              <p className="text-3xl font-bold text-orange-600">
                {filteredInvoices.filter(inv => inv.status === 'pending').length}
              </p>
            </div>
          </div>

          {/* 发票列表 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">发票列表</h3>
              {filteredInvoices.length === 0 ? (
                <p className="text-gray-500 text-center py-8">暂无发票数据</p>
              ) : (
                <div className="space-y-4">
                  {filteredInvoices.map((invoice) => (
                    <div key={invoice.id} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">发票 #{invoice.id}</p>
                          <p className="text-sm text-gray-500">客户ID: {invoice.customer_id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">¥{invoice.amount}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            invoice.status === 'paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {invoice.status === 'paid' ? '已支付' : '待处理'}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">日期: {invoice.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 分页 */}
          {filteredInvoices.length > 0 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              <span className="px-3 py-2 text-sm text-gray-700">
                第 {currentPage} 页
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                下一页
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}