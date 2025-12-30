import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 定义客户的数据类型
export interface Customer {
  id: string;
  name: string;
  email: string;
  image_url: string;
}

// 创建 customers API slice
export const customersApi = createApi({
  reducerPath: 'customersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Customer'],
  endpoints: (builder) => ({
    // 获取所有客户
    getCustomers: builder.query<Customer[], void>({
      query: () => 'customers',
      providesTags: ['Customer'],
    }),
    
    // 根据ID获取单个客户
    getCustomerById: builder.query<Customer, string>({
      query: (id) => `customers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Customer', id }],
    }),
    
    // 创建新客户
    createCustomer: builder.mutation<Customer, Partial<Customer>>({
      query: (customer) => ({
        url: 'customers',
        method: 'POST',
        body: customer,
      }),
      invalidatesTags: ['Customer'],
    }),
    
    // 更新客户
    updateCustomer: builder.mutation<Customer, { id: string; data: Partial<Customer> }>({
      query: ({ id, data }) => ({
        url: `customers/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Customer', id }],
    }),
    
    // 删除客户
    deleteCustomer: builder.mutation<void, string>({
      query: (id) => ({
        url: `customers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Customer'],
    }),
  }),
});

// 导出自动生成的hooks
export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;