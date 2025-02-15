import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client } from "../main";
import { GET_PRODUCT_DETAILS } from "../graphql/Queries";
import {
  ProductDetails,
  ProductDetailsState,
} from "../component/interfaceTypes/interfaceTypes";

// Define async thunk for fetching product details
export const fetchProductDetails = createAsyncThunk<
  ProductDetails, // The expected return type
  { id: string }, // The argument type (params)
  { rejectValue: string } // Error type
>("product/fetchProductDetails", async ({ id }, { rejectWithValue }) => {
  const token = localStorage.getItem("token"); // Fetch token from storage

  try {
    const response = await client.query({
      query: GET_PRODUCT_DETAILS,
      variables: { id },
      context: {
        headers: {
          Authorization: token ? `${token}` : "",
        },
      },
      fetchPolicy: "network-only", // Ensure fresh data
    });

    const product = response.data?.getProductById;

    if (!product) {
      return rejectWithValue("Product not found");
    }

    return product;
  } catch (error) {
    return rejectWithValue(
      (error as Error).message || "Failed to fetch product details"
    );
  }
});

// Define the initial state
const initialState: ProductDetailsState = {
  product: null, // Change to store a single product
  loading: false,
  error: null,
};

// Create product details slice
const productDetailsSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductDetails.fulfilled,
        (state, action: PayloadAction<ProductDetails>) => {
          state.loading = false;
          state.product = action.payload;
        }
      )
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch product details";
      });
  },
});

export default productDetailsSlice.reducer;
