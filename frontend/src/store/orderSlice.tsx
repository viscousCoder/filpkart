import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { client } from "../main";
import { GET_USER_ORDERS } from "../graphql/Queries";
import { ADD_ORDER, UPDATE_ORDER } from "../graphql/Mutation";
import {
  //   Order,
  OrderPayload,
  // Order,
} from "../component/interfaceTypes/interfaceTypes";

import { PayloadAction } from "@reduxjs/toolkit";

// Define Subtitle interface
interface Subtitle {
  __typename: "Subtitle";
  id: string;
  text: string;
}

// Define ProductImage interface
interface ProductImage {
  __typename: "ProductImage";
  id: string;
  image: string;
}

// Define ProductDetails interface
interface ProductDetails {
  id: string;
  name: string;
  subtitles: Subtitle[];
  outer_image: string;
  images: ProductImage[];
  price: number;
  rating: number;
  overview: string;
  company_name: string;
  category: string;
  subcategory: string;
  quantity: number;
  discount: number;
}

// export interface Order {
//   id: string;
//   quantity: number;
//   status: "CART" | "ORDERED" | "WISHLIST";
//   product: ProductDetails[];
// }

export interface Order {
  id?: string;
  userId?: string;
  quantity: number;
  status: "CART" | "ORDERED" | "WISHLIST";
  product: ProductDetails;
}

// Define OrderState interface
interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  updateLoading: boolean;
}

// Initial State
const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
  updateLoading: false,
};

// ** Fetch Orders by Status **
export const fetchOrders = createAsyncThunk(
  "/order/fetch",
  async ({ status }: { status: string }, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("id");
      const { data } = await client.query({
        query: GET_USER_ORDERS,
        variables: { userId, status },
        fetchPolicy: "network-only",
      });
      return data.getUserOrders;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to fetch orders");
        return rejectWithValue(error.message || "Something went wrong");
      }
      toast.error("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// ** Add Order **
export const addOrder = createAsyncThunk(
  "/order/add",
  async (
    { userId, productId, quantity, status }: OrderPayload,
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await client.mutate({
        mutation: ADD_ORDER,
        variables: { userId, productId, quantity, status },
        context: {
          headers: {
            Authorization: token ? `${token}` : "",
          },
        },
        fetchPolicy: "network-only",
      });
      toast.success("Order added successfully");
      return data.addOrder;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to add order");
        return rejectWithValue(error.message || "Something went wrong");
      }
      toast.error("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// ** Update Order Status **

export const updateOrderStatus = createAsyncThunk(
  "/order/updateStatus",
  async (
    {
      orderId,
      orderIds,
      quantity,
      increase,
      isDelete,
      status,
    }: {
      orderId?: string;
      orderIds?: string[];
      quantity?: number;
      increase?: boolean;
      isDelete?: boolean;
      status?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await client.mutate({
        mutation: UPDATE_ORDER,
        variables: {
          orderId,
          orderIds,
          quantity,
          increase,
          delete: isDelete,
          status,
        },
        context: {
          headers: {
            Authorization: token ? `${token}` : "",
          },
        },
        fetchPolicy: "network-only",
      });

      toast.success("Order updated successfully");
      return data.updateOrder; // API returns updated order(s)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to update order status");
        return rejectWithValue(error.message || "Something went wrong");
      }
      toast.error("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// const initialState: OrderState = {
//   orders: [],
//   loading: false,
//   error: null,
// };

// ** Create Slice **
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrderCart: (state, action: PayloadAction<Order[]>) => {
      console.log(action.payload, "Dtaaaaa");
      state.orders = action.payload;
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.orders.find((order) => order.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.orders.findIndex(
        (order) => order.id === action.payload
      );
      if (itemIndex !== -1) {
        if (state.orders[itemIndex].quantity > 1) {
          state.orders[itemIndex].quantity -= 1;
        } else {
          state.orders.splice(itemIndex, 1);
        }
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // ** Fetch Orders **
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ** Add Order **
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ** Update Multiple Orders' Status **
      .addCase(updateOrderStatus.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updateLoading = false;

        if (Array.isArray(action.payload)) {
          // If multiple orders were updated
          action.payload.forEach((updatedOrder: Order) => {
            const index = state.orders.findIndex(
              (order) => order.id === updatedOrder.id
            );
            if (index !== -1) {
              state.orders[index] = updatedOrder;
            }
          });
        } else {
          // If a single order was updated
          const index = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addOrderCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = orderSlice.actions;
export default orderSlice.reducer;
