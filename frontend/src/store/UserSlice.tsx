import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../main";
import { USER_REGISTER } from "../graphql/Mutation";
import { toast } from "react-toastify";
import { GET_CURRUSER, GET_USER } from "../graphql/Queries";
import {
  AuthState,
  User,
  UserLogin,
} from "../component/interfaceTypes/interfaceTypes";

export const createNewUser = createAsyncThunk(
  "/user/register",
  async ({ userData }: { userData: User }, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: USER_REGISTER,
        variables: userData,
      });
      toast.success(data.createUser.message);
      // navigate("/");
      return data.createUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred during login");
        return rejectWithValue(error.message || "Something went wrong");
      }
      toast.error("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const userLogin = createAsyncThunk(
  "/user/login",
  async (
    { userData, navigate }: { userData: UserLogin; navigate: any },
    { rejectWithValue }
  ) => {
    try {
      console.log("iser", userData);
      const { data } = await client.query({
        query: GET_USER,
        variables: userData,
      });
      toast.success("Login successful");
      navigate("/");
      localStorage.setItem("token", data.loginUser.token);
      localStorage.setItem("role", data.loginUser.user.role);
      console.log(data);
      return data.loginUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred during login");
        return rejectWithValue(error.message || "Something went wrong");
      }
      toast.error("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const userLoginAddress = createAsyncThunk(
  "/user/login",
  async ({ userData }: { userData: UserLogin }, { rejectWithValue }) => {
    try {
      console.log("iser", userData);
      const { data } = await client.query({
        query: GET_USER,
        variables: userData,
      });
      toast.success("Login successful");
      localStorage.setItem("token", data.loginUser.token);
      localStorage.setItem("role", data.loginUser.user.role);
      console.log(data);
      return data.loginUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred during login");
        return rejectWithValue(error.message || "Something went wrong");
      }
      toast.error("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const getCurrUser = createAsyncThunk("/user/currentuser", async () => {
  // console.log("hellos s");

  try {
    const token = localStorage.getItem("token");
    // console.log(token);
    const { data } = await client.query({
      query: GET_CURRUSER,
      context: {
        headers: {
          Authorization: `${token}`,
        },
      },
      fetchPolicy: "no-cache",
    });
    if (!data || !data.getUser) {
      throw new Error("User data is null");
    }
    localStorage.setItem("token", data.getUser.token);
    localStorage.setItem("role", data.getUser.userData.role);
    localStorage.setItem("id", data.getUser.userData.id);
    console.log(data);
    return data.getUser;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error("An error occurred during login");
      console.log("error", error);
    }
    // toast.error("An unexpected error occurred");
  }
});

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// ** Create Slice **
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      toast.success("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCurrUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.userData;
        state.token = action.payload.token;
      })
      .addCase(getCurrUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
