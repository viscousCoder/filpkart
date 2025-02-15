import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "./adminSlice.tsx";
// import fileUploadReducer from "./fileUploadSlice.tsx";
import productReducer from "./productSlice.tsx";
import userReducer from "./UserSlice.tsx";
import productDetailReducer from "./productDetailsSlice.tsx";
import orderSliceReducer from "./orderSlice.tsx";
import addressSliceReducer from "./addressSlice.tsx";
export const store = configureStore({
  reducer: {
    admin: AdminReducer,
    user: userReducer,
    // fileUpload: fileUploadReducer,
    products: productReducer,
    productDetail: productDetailReducer,
    orders: orderSliceReducer,
    address: addressSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
