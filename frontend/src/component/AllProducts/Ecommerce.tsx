import React from "react";
import { Container, Grid } from "@mui/material";
import FilterSidebar from "./FilterSidebar";
import BreadcrumbsNav from "./Breadcrumbs";
import ProductSection from "./ProductSection";

const Eccomerce: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Left Sidebar (Filters) */}
        <Grid item xs={12} md={3}>
          <FilterSidebar />
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={9}>
          <BreadcrumbsNav />
          <p style={{ color: "#888", margin: "10px 0" }}>
            You can spruce up your style with the right bottomwear. Flipkart is
            home to some of the best bottomwear for men, for kids, and for
            women. Brands such as Wrangler, Levi’s, Lee, W, Peter England, and
            U.S. Polo Assn have a wide selection of chinos, jeans, shorts, and
            more. So, depending on your preferred style you are definitely going
            to find something that will find its worthy place in your wardrobe.
            Some of the bottom wear for women that you can shop for include
            shorts, plaited skirts, pencil skirts, ripped jeans, and cargo
            pants. Some of the bottomwear for men that you should keep an eye
            out for include striped chinos, formal trousers, knee-length jeans,
            and ripped shorts. Be sure to keep a good balance of colours in your
            selection. Besides the mandatory black and beige pants, you can also
            opt for trousers that come in colours such as olive green, brown,
            yellow, grey, and white. With these clothing items, we are sure that
            you will be the centre of attention, wherever you go, thanks to your
            impeccable sense of dressing. Oh, and feel free to enhance your look
            with some accessories. Even wearing a simple watch can go a long way
            in redefining your look.
          </p>
          <ProductSection />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Eccomerce;
