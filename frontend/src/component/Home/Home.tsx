import { Box, Typography, Container, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import CategoryHeader from "./CategoryHeader";
import ProductCarousel from "./CarouselProduct/ProductCarousel";
import { JSX } from "react/jsx-runtime";
import Banner from "./CarouselProduct/Banner";
import DatBanner from "./Banner";
import MixImage from "./CarouselProduct/MixIMage";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchKidsProducts,
  fetchMenProducts,
  fetchWomensProducts,
} from "../../store/productSlice";
import Loading from "../Loading/Loading";

export interface Product {
  length: number;
  map(arg0: (item: any, index: any) => JSX.Element): import("react").ReactNode;
  id: number;
  img: string;
  title: string;
  offer: string;
}
export interface item {
  length: number;
  map(arg0: (item: any, index: any) => JSX.Element): import("react").ReactNode;
  items: [Product];
}

const banners = [
  "https://rukminim2.flixcart.com/fk-p-flap/2020/340/image/df71df999c4d6023.jpg?q=60",
  "https://rukminim2.flixcart.com/fk-p-flap/2020/340/image/c1b4233fed04eacb.jpg?q=60",
  "https://rukminim2.flixcart.com/fk-p-flap/2020/340/image/3f976ca32ddc651e.jpg?q=60",
  "https://rukminim2.flixcart.com/fk-p-flap/2020/340/image/c928b14a5cddaf18.jpg?q=60",
];

const items = [
  {
    id: 1,
    outer_image:
      "https://rukminim2.flixcart.com/image/680/680/xif0q/backpack/v/k/u/13-three-compartment-premium-quality-with-usb-port-as-rain-cover-original-imagvq8fsk7zyavm.jpeg?q=60",
    name: "Best of Action Toys",
    price: "Up to 70% Off",
    company_name: "Puma",
  },
  {
    id: 2,
    outer_image:
      "https://rukminim2.flixcart.com/image/680/680/xif0q/watch/x/2/4/-original-imagrk9rg2zqkpg6.jpeg?q=60",
    name: "Gym Essentials",
    price: "From ₹139",
    comapny_name: "Adidas",
  },
  {
    id: 3,
    outer_image:
      "https://rukminim2.flixcart.com/image/2000/2000/xif0q/shoe/s/6/p/6-tarzan-03-6-asian-black-light-grey-original-imah3vfs4rfhaypm.jpeg?q=70&crop=false",
    name: "Top Selling Stationery",
    price: "From ₹49",
    company_name: "Levis",
  },
  {
    id: 4,
    outer_image:
      "https://rukminim2.flixcart.com/image/680/680/xif0q/backpack/v/k/u/13-three-compartment-premium-quality-with-usb-port-as-rain-cover-original-imagvq8fsk7zyavm.jpeg?q=60",
    name: "Best of Action Toys",
    price: "Up to 70% Off",
    company_name: "Peter-England",
  },
  {
    id: 5,
    outer_image:
      "https://rukminim2.flixcart.com/image/680/680/xif0q/watch/x/2/4/-original-imagrk9rg2zqkpg6.jpeg?q=60",
    name: "Gym Essentials",
    price: "From ₹139",
    company_name: "Roadster",
  },
  {
    id: 6,
    outer_image:
      "https://rukminim2.flixcart.com/image/2000/2000/xif0q/shoe/s/6/p/6-tarzan-03-6-asian-black-light-grey-original-imah3vfs4rfhaypm.jpeg?q=70&crop=false",
    name: "Top Selling Stationery",
    price: "From ₹49",
    company_name: "Zudio",
  },
  {
    id: 7,
    outer_image:
      "https://rukminim2.flixcart.com/image/680/680/xif0q/backpack/v/k/u/13-three-compartment-premium-quality-with-usb-port-as-rain-cover-original-imagvq8fsk7zyavm.jpeg?q=60",
    name: "Best of Action Toys",
    price: "Up to 70% Off",
    company_name: "Nike",
  },
  {
    id: 8,
    outer_image:
      "https://rukminim2.flixcart.com/image/680/680/xif0q/watch/x/2/4/-original-imagrk9rg2zqkpg6.jpeg?q=60",
    name: "Gym Essentials",
    price: "From ₹139",
    company_name: "Jordan",
  },
  {
    id: 9,
    outer_image:
      "https://rukminim2.flixcart.com/image/2000/2000/xif0q/shoe/s/6/p/6-tarzan-03-6-asian-black-light-grey-original-imah3vfs4rfhaypm.jpeg?q=70&crop=false",
    name: "Top Selling Stationery",
    price: "From ₹49",
    company_name: "Raymond",
  },
];

const Homepage = () => {
  const { mensLoading, mensProducts } = useSelector(
    (state: RootState) => state.products
  );
  const { womensLoading, womensProducts } = useSelector(
    (state: RootState) => state.products
  );
  const { kisdsLoading, kidsProducts } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMenProducts({ subcategory: "Men" }));
    dispatch(fetchWomensProducts({ subcategory: "Women" }));
    dispatch(fetchKidsProducts({ subcategory: "Kids" }));
  }, []);
  return (
    <Fragment>
      {mensLoading || womensLoading || kisdsLoading ? (
        <Loading />
      ) : (
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          {/* Categories Section */}

          <CategoryHeader />

          {/* Banner Section */}
          <Box sx={{ margin: "10px 0px", background: "white" }}>
            <Carousel>
              {banners.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Banner ${index + 1}`}
                  width="100%"
                />
              ))}
            </Carousel>
          </Box>

          {/* Top Offers Section */}
          {/* <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Top Offers
        </Typography>
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  padding: 2,
                  textAlign: "center",
                }}
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt="Offer"
                  width="100%"
                />
                <Typography>Min. 70% Off</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box> */}

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                p: 0,
                m: 0,
                overflow: { sx: "hidden", md: "auto" },
                width: { xs: "90%", md: "84%" },
              }}
            >
              <ProductCarousel title="List of top brands" items={items} />
            </Box>
            <Banner image="https://rukminim2.flixcart.com/fk-p-flap/530/810/image/1efc9a44637d8dc8.jpeg?q=20" />
          </Box>

          {/* <ProductCarousel title="Trending Products" items={data} /> */}
          <ProductCarousel
            title="Mens Products"
            items={mensProducts}
            isCompany={false}
          />

          <Box>
            <DatBanner />
          </Box>
          <ProductCarousel
            title="Kids Products"
            items={kidsProducts}
            isCompany={false}
          />
          <ProductCarousel
            title="Women Products"
            items={womensProducts}
            isCompany={false}
          />
        </Container>
      )}
    </Fragment>
  );
};

export default Homepage;
