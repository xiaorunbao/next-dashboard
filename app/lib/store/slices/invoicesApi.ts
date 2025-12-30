import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 定义发票的数据类型
export interface Invoice {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string;
}

// 创建 invoices API slice
export const invoicesApi = createApi({
  reducerPath: 'invoicesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Invoice'],
  endpoints: (builder) => ({
    // 获取所有发票
    getInvoices: builder.query<Invoice[], void>({
      query: () => 'invoices',
      providesTags: ['Invoice'],
    }),
    
    // 根据ID获取单个发票
    getInvoiceById: builder.query<Invoice, string>({
      query: (id) => `invoices/${id}`,
      providesTags: (result, error, id) => [{ type: 'Invoice', id }],
    }),
    
    // 创建新发票
    createInvoice: builder.mutation<Invoice, Partial<Invoice>>({
      query: (invoice) => ({
        url: 'invoices',
        method: 'POST',
        body: invoice,
      }),
      invalidatesTags: ['Invoice'],
    }),
    
    // 更新发票
    updateInvoice: builder.mutation<Invoice, { id: string; data: Partial<Invoice> }>({
      query: ({ id, data }) => ({
        url: `invoices/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Invoice', id }],
    }),
    
    // 删除发票
    deleteInvoice: builder.mutation<void, string>({
      query: (id) => ({
        url: `invoices/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Invoice'],
    }),
  }),
});

// 导出自动生成的hooks
export const {
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoicesApi;