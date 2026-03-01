import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import ky from 'ky';
import type { Product } from '../../types/Product';

type ProductsState = {
  items: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const url = 'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';
      const products = await ky.get(url).json<Product[]>();
      return products;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки товаров');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  },
});

export default productsSlice.reducer;