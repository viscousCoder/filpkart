import { Box, Grid } from "@mui/material";
import ProductCarousel from "./ProductCarousel";
import ProductDetails from "./ProductDetails";
import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchProductDetails } from "../../store/productDetailsSlice";
import CategoryWithoutImage from "../Home/CategoryWithoutImage";

const ProductLanding = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Correctly typed selector
  const { loading, product } = useSelector(
    (state: RootState) => state.productDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails({ id }));
    }
  }, [id, dispatch]);

  console.log("Loading:", loading, "Product:", product);

  return (
    <Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ) : product ? (
        <Fragment>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CategoryWithoutImage />
            <Grid container sx={{ p: { xs: 2, md: 5 } }}>
              <Grid
                item
                xs={12}
                md={5}
                sx={{ height: { xs: "21%", md: "22%" } }}
              >
                <ProductCarousel product={product} />
              </Grid>
              <Grid item xs={12} md={7} marginBottom={2}>
                <ProductDetails product={product} />
              </Grid>
            </Grid>
          </Box>
        </Fragment>
      ) : (
        <h1>No Product Found</h1>
      )}
    </Fragment>
  );
};

export default ProductLanding;
