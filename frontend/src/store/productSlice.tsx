import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../component/interfaceTypes/interfaceTypes";
import { GET_PRODUCTS, GET_QUERY_PRODUCT_DETAILS } from "../graphql/Queries";
import { client } from "../main";

// Define async thunk for fetching products
export const fetchProducts = createAsyncThunk<
  Product[],
  {
    company_name?: string;
    category?: string;
    subcategory?: string;
  },
  { rejectValue: string }
>(
  "products/fetchProducts",
  async ({ company_name, category, subcategory }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    console.log(company_name, category, subcategory, "Therehere");
    try {
      const response = await client.query({
        query: GET_PRODUCTS,
        variables: { company_name, category, subcategory },
        context: {
          headers: {
            Authorization: `${token}`,
          },
        },
      });

      return response.data.getProducts;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchSeachProductDetails = createAsyncThunk<
  Product[],
  {
    searchQuery: string;
  },
  { rejectValue: string }
>(
  "products/fetchSeachProductDetails",
  async ({ searchQuery }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await client.query({
        query: GET_QUERY_PRODUCT_DETAILS,
        variables: { searchQuery },
        context: {
          headers: {
            Authorization: `${token}`,
          },
        },
      });

      return response.data.getSearchProducts;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

//mensProduct fetching
export const fetchMenProducts = createAsyncThunk<
  Product[],
  {
    subcategory?: string;
  },
  { rejectValue: string }
>(
  "products/fetchMensProducts",
  async ({ subcategory }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      console.log("hii", "Everyone");
      const response = await client.query({
        query: GET_PRODUCTS,
        variables: { subcategory },
        context: {
          headers: {
            Authorization: `${token}`,
          },
        },
      });

      return response.data.getProducts;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

//womensProduct
export const fetchWomensProducts = createAsyncThunk<
  Product[],
  {
    subcategory?: string;
  },
  { rejectValue: string }
>(
  "products/fetchWomensProducts",
  async ({ subcategory }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await client.query({
        query: GET_PRODUCTS,
        variables: { subcategory },
        context: {
          headers: {
            Authorization: `${token}`,
          },
        },
      });

      return response.data.getProducts;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

//kid
export const fetchKidsProducts = createAsyncThunk<
  Product[],
  {
    subcategory?: string;
  },
  { rejectValue: string }
>(
  "products/fetchkidsProducts",
  async ({ subcategory }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await client.query({
        query: GET_PRODUCTS,
        variables: { subcategory },
        context: {
          headers: {
            Authorization: `${token}`,
          },
        },
      });

      return response.data.getProducts;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface State {
  products: Product[];
  loading: boolean;
  error: string;
  mensProducts: Product[];
  mensLoading: boolean;
  mensError: string;
  womensProducts: Product[];
  womensLoading: boolean;
  womensError: string;
  kidsLoading: boolean;
  kidsProducts: Product[];
  kidsError: string;
}

// Initial state
const initialState: State = {
  products: [],
  loading: false,
  error: "",
  mensProducts: [],
  mensLoading: false,
  mensError: "",
  womensProducts: [],
  womensLoading: false,
  womensError: "",
  kidsLoading: false,
  kidsProducts: [],
  kidsError: "",
};

// Create product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch products";
      })
      .addCase(fetchSeachProductDetails.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        fetchSeachProductDetails.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchSeachProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch products";
      })
      .addCase(fetchMenProducts.pending, (state) => {
        state.mensLoading = true;
        state.mensError = "";
      })
      .addCase(
        fetchMenProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.mensLoading = false;
          state.mensProducts = action.payload;
        }
      )
      .addCase(fetchMenProducts.rejected, (state, action) => {
        state.mensLoading = false;
        state.mensError = action.payload ?? "Failed to fetch products";
      })
      .addCase(fetchWomensProducts.pending, (state) => {
        state.womensLoading = true;
        state.womensError = "";
      })
      .addCase(
        fetchWomensProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.womensLoading = false;
          state.womensProducts = action.payload;
        }
      )
      .addCase(fetchWomensProducts.rejected, (state, action) => {
        state.womensLoading = false;
        state.womensError = action.payload ?? "Failed to fetch products";
      })
      .addCase(fetchKidsProducts.pending, (state) => {
        state.kidsLoading = true;
        state.kidsError = "";
      })
      .addCase(
        fetchKidsProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.kidsLoading = false;
          state.kidsProducts = action.payload;
        }
      )
      .addCase(fetchKidsProducts.rejected, (state, action) => {
        state.kidsLoading = false;
        state.kidsError = action.payload ?? "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;
