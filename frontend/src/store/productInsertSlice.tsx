import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

export interface Product {
  all_images?: string[];
  subtitle?: string[];
  id?: string;
  name: string;
  outer_image?: string;
  outer_image_id?: string;
  price: string;
  rating: string;
  overview: string;
  company_name: string;
  category: string;
  subcategory: string;
  quantity: string;
  discount: string;
  createdAt?: string;
  updatedAt?: string;
  subtitles?: Subtitle[];
  images?: Image[];
}

interface Subtitle {
  id: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Image {
  id: string;
  image: string;
  image_id: string;
  createdAt?: string;
  updatedAt?: string;
}

interface State {
  data: Product | null;
  loading: boolean;
  error: string;
}

const initialState: State = {
  data: null,
  loading: false,
  error: "",
};
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (
    { productData, navigate }: { productData: Product; navigate: any },
    { rejectWithValue }
  ) => {
    // Convert Blob URLs to Files
    const convertBlobUrlsToFiles = async () => {
      const convertBlob = async (blobUrl: string) => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], "image.jpg", { type: blob.type });
      };

      const outerImageFile = productData?.outer_image
        ? await convertBlob(productData?.outer_image)
        : "";
      // const allImagesFiles = await Promise.all(
      //   productData.all_images.map((imageUrl: string) => convertBlob(imageUrl))
      // );
      const allImagesFiles = productData.all_images
        ? await Promise.all(
            productData.all_images.map((imageUrl) => convertBlob(imageUrl))
          )
        : [];

      //   console.log("Converted files:", outerImageFile, allImagesFiles);

      return { outerImage: outerImageFile, allImages: allImagesFiles };
    };

    const { outerImage, allImages } = await convertBlobUrlsToFiles();
    // console.log("Converted files:", outerImage, allImages, "Thissss");

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("subtitle", JSON.stringify(productData.subtitle));
    formData.append("outer_image", outerImage); // The outer image file
    formData.append("price", productData.price.toString());
    formData.append("rating", productData.rating.toString());
    formData.append("overview", productData.overview);
    formData.append("company_name", productData.company_name);
    formData.append("category", productData.category);
    formData.append("subcategory", productData.subcategory);
    formData.append("quantity", productData.quantity.toString());
    formData.append("discount", productData.discount.toString());

    allImages.forEach((image: string | Blob) => {
      formData.append("all_images", image); // Append files under the same key
    });

    // Prepare the product data to send to the server
    try {
      console.log("data inside the slice", productData);

      // const { data } = await client.mutate({
      //   mutation: ADD_PRODUCT,
      //   variables: { productData },
      //   // variables: {
      //   //   formData: formData,
      //   // },
      // });
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:1212/admin/create-product",
        formData,
        {
          headers: {
            " x-auth-token": `${token}` || "",
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        toast.success("Product added successfully!");
        navigate("/product"); // Redirect to the products page
      }

      // return data.addProductDetails;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(
          error.message || "An error occurred while adding the product"
        );
        return rejectWithValue(error.message || "Something went wrong");
      }
      toast.error("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const productInsertSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productInsertSlice.reducer;
