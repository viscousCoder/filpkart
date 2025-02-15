// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { gql } from "@apollo/client";
// import { client } from "../main";

// // Define GraphQL Mutation
// const UPLOAD_FILE = gql`
//   mutation uploadFile($file: Upload!) {
//     uploadFile(file: $file) {
//       url
//     }
//   }
// `;

// // Async thunk for uploading file
// export const uploadFile = createAsyncThunk(
//   "fileUpload/uploadFile",
//   async (file, { rejectWithValue }) => {
//     try {
//       const { data } = await client.mutate({
//         mutation: UPLOAD_FILE,
//         variables: { file },
//       });
//       return data.uploadFile.url;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const fileUploadSlice = createSlice({
//   name: "fileUpload",
//   initialState: {
//     fileUrl: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadFile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(uploadFile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.fileUrl = action.payload;
//       })
//       .addCase(uploadFile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default fileUploadSlice.reducer;
