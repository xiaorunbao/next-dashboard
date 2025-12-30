import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import uiReducer from './slices/uiSlice';
import { invoicesApi } from './slices/invoicesApi';
import { customersApi } from './slices/customersApi';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [invoicesApi.reducerPath]: invoicesApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
  },
  // 添加中间件和其他配置
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略next.js的序列化检查
        ignoredActions: ['persist/PERSIST'],
      },
    })
    .concat(invoicesApi.middleware)
    .concat(customersApi.middleware),
});

// 设置监听器
setupListeners(store.dispatch);

// 导出RootState和AppDispatch类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;