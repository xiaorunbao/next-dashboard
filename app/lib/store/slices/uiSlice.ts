import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义UI状态的接口
interface UIState {
  loading: boolean;
  error: string | null;
  sidebarOpen: boolean;
  searchQuery: string;
  currentPage: number;
}

// 初始状态
const initialState: UIState = {
  loading: false,
  error: null,
  sidebarOpen: false,
  searchQuery: '',
  currentPage: 1,
};

// 创建UI slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // 设置加载状态
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // 设置错误信息
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // 切换侧边栏状态
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    
    // 设置侧边栏状态
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    
    // 设置搜索查询
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    
    // 设置当前页面
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    
    // 重置UI状态
    resetUI: () => initialState,
  },
});

// 导出actions
export const {
  setLoading,
  setError,
  toggleSidebar,
  setSidebarOpen,
  setSearchQuery,
  setCurrentPage,
  resetUI,
} = uiSlice.actions;

// 导出reducer
export default uiSlice.reducer;