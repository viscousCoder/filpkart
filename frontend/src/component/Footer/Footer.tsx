import React from "react";
import { Box, Grid, Typography, Link, Divider } from "@mui/material";
import {
  Facebook,
  Twitter,
  YouTube,
  Storefront,
  CardGiftcard,
  HelpOutline,
  Campaign,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (item: string) => {
    console.log(item);
    if (item === "About Us") {
      navigate("/about");
    } else if (item === "Contact Us") {
      navigate("/contact");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#222", color: "white", p: 4, mt: 4 }}>
      <Grid container spacing={4}>
        {/* About Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" gutterBottom>
            ABOUT
          </Typography>
          {[
            "Contact Us",
            "About Us",
            "Careers",
            "Flipkart Stories",
            "Press",
            "Corporate Information",
          ].map((text) => (
            <Typography key={text} variant="body2">
              <Link
                color="inherit"
                underline="none"
                onClick={() => handleClick(text)}
                sx={{ cursor: "pointer" }}
              >
                {text}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Group Companies */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" gutterBottom>
            GROUP COMPANIES
          </Typography>
          {["Myntra", "Cleartrip", "Shopsy"].map((text) => (
            <Typography key={text} variant="body2">
              <Link href="#" color="inherit" underline="none">
                {text}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Help Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" gutterBottom>
            HELP
          </Typography>
          {["Payments", "Shipping", "Cancellation & Returns", "FAQ"].map(
            (text) => (
              <Typography key={text} variant="body2">
                <Link href="#" color="inherit" underline="none">
                  {text}
                </Link>
              </Typography>
            )
          )}
        </Grid>

        {/* Consumer Policy */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" gutterBottom>
            CONSUMER POLICY
          </Typography>
          {[
            "Cancellation & Returns",
            "Terms Of Use",
            "Security",
            "Privacy",
            "Sitemap",
            "Grievance Redressal",
            "EPR Compliance",
          ].map((text) => (
            <Typography key={text} variant="body2">
              <Link href="#" color="inherit" underline="none">
                {text}
              </Link>
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="body2">
            <strong>Mail Us:</strong>
            <br />
            Flipkart Internet Private Limited,
            <br />
            Buildings Alyssa, Begonia & Clove Embassy Tech Village,
            <br />
            Outer Ring Road, Devarabeesanahalli Village,
            <br />
            Bengaluru, 560103,
            <br />
            Karnataka, India
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              <Facebook />
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              <Twitter />
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              <YouTube />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="body2">
            <strong>Registered Office Address:</strong>
            <br />
            Flipkart Internet Private Limited,
            <br />
            Buildings Alyssa, Begonia & Clove Embassy Tech Village,
            <br />
            Outer Ring Road, Devarabeesanahalli Village,
            <br />
            Bengaluru, 560103,
            <br />
            Karnataka, India
            <br />
            CIN: U51109KA2012PTC066107
            <br />
            Telephone:{" "}
            <Link href="tel:044-45614700" color="inherit">
              044-45614700
            </Link>{" "}
            /{" "}
            <Link href="tel:044-67415800" color="inherit">
              044-67415800
            </Link>
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ backgroundColor: "#444", my: 4 }} />

      {/* Copyright */}

      {/* Additional Links */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
      >
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: { xs: "left", md: "center" },
            gap: 2,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {[
            { icon: <Storefront />, text: "Become a Seller" },
            { icon: <Campaign />, text: "Advertise" },
            { icon: <CardGiftcard />, text: "Gift Cards" },
            { icon: <HelpOutline />, text: "Help Center" },
          ].map((item, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              {item.icon}
              <Typography variant="body2" sx={{ ml: 1 }}>
                <Link href="#" color="inherit" underline="none">
                  {item.text}
                </Link>
              </Typography>
            </Box>
          ))}
        </Grid>

        <Grid item>
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Typography variant="body2">© 2007-2025 Flipkart.com</Typography>
          </Box>
        </Grid>

        {/* Payment Icons */}
        <Grid item>
          <Box sx={{ display: "flex", gap: 1 }}>
            <img
              src="https://banner2.cleanpng.com/20180920/zxf/kisspng-wikipedia-logo-visa-vector-graphics-credit-card-african-savannah-holidays-for-best-safari-and-be-1713938280102.webp"
              alt="Visa"
              height="20"
            />
            <img
              src="https://banner2.cleanpng.com/lnd/20241123/ry/85dda930e3465f586e2b20700028d0.webp"
              alt="Mastercard"
              height="20"
            />
            <img
              src="https://banner2.cleanpng.com/20180615/guz/aa7x0jdlh.webp"
              alt="PayPal"
              height="20"
            />
            <img
              src="https://banner2.cleanpng.com/20180606/vxk/aa845einx.webp"
              alt="Discover"
              height="20"
            />
            <img
              src="https://banner2.cleanpng.com/20180713/buj/aawxrua72.webp"
              alt="Rupay"
              height="20"
            />
            <img
              src="https://banner2.cleanpng.com/lnd/20250110/oc/5515f6a04a78f503b468579be923b6.webp"
              alt="American express"
              height="20"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
