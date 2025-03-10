import React, { Fragment } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
// import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const OrderSuccessComp: React.FC = () => {
  const { orders: carts } = useSelector((state: RootState) => state.orders);

  const navigate = useNavigate();
  // const [address, setAddress] = useState("Gurgaon, 122001");

  function discount(originalPrice: number, discountPercentage: number) {
    return parseFloat(
      (originalPrice - (originalPrice * discountPercentage) / 100).toFixed(0)
    );
  }

  const totalPrice = carts.reduce(
    (acc, item) =>
      acc +
      discount(Number(item.product?.price), Number(item.product?.discount)) *
        item.quantity,
    0
  );
  const totalDiscount = carts.reduce(
    (acc, item) =>
      acc +
      (Number(item.product?.price) -
        discount(Number(item.product?.price), Number(item.product?.discount))) *
        item.quantity,
    0
  );

  const handleOrdered = async () => {
    navigate("/");
  };
  console.log(carts, "successdata");
  return (
    <Fragment>
      <Box p={3}>
        <Grid container spacing={2}>
          {/* Left Side: Cart Items */}
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 1 }}>
              {/* <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  Deliver to: <strong>Aman Bisht, 244715</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  98, Basai perrumadara ramnagar nainital, Ramnagar
                </Typography>
              </CardContent> */}
            </Card>
            <Card variant="outlined">
              <CardHeader
                title={
                  <>
                    <Typography variant="h6" fontWeight="bold">
                      Ordered Items ({carts.length} items)
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                  </>
                }
              />

              <CardContent sx={{ overflow: "auto", height: "30rem" }}>
                {carts.map((item) => (
                  <Box key={item.id} display="flex" alignItems="center" py={2}>
                    <Box width={"30%"}>
                      <CardMedia
                        component="img"
                        sx={{ width: "100%", borderRadius: 2 }}
                        image={item.product?.outer_image}
                        alt={item.product?.name}
                      />
                    </Box>
                    <Box ml={2} width={"100%"}>
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography fontWeight="bold">
                          {item.product?.name}
                        </Typography>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Delivery by Tommorow |{" "}
                            {Number(item.product?.price) > 1000
                              ? "Free"
                              : "₹40"}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        component={"div"}
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginRight: "10px" }}
                      >
                        Seller: SuperComNet
                        <Typography
                          sx={{ display: "inline-block", marginLeft: "10px" }}
                        >
                          <img
                            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_9e47c1.png"
                            alt="Assured"
                            width="50"
                          />
                        </Typography>
                      </Typography>

                      <Typography variant="body2">
                        <s>₹{item.product?.price}</s>{" "}
                        <span style={{ color: "green" }}>
                          ₹
                          {discount(
                            Number(item?.product?.price),
                            Number(item.product?.discount)
                          )}{" "}
                          ({item.product?.discount}% Off)
                        </span>
                      </Typography>

                      <Box display="flex" alignItems="center" mt={1}>
                        <IconButton
                          disabled={true}
                          sx={{
                            border: "1px solid #aaa",
                            borderRadius: "50%",
                            p: 0.5,
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography mx={1}>{item?.quantity}</Typography>
                        <IconButton
                          disabled={true}
                          sx={{
                            border: "1px solid #aaa",
                            borderRadius: "50%",
                            p: 0.5,
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>

                      {/* <Box style={{ marginTop: 8 }}>
                        <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                          Save for Later
                        </Button>
                        <Button variant="outlined" size="small" color="error">
                          Remove
                        </Button>
                      </Box> */}
                    </Box>
                  </Box>
                ))}
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#FF9F00",
                    "&:hover": { backgroundColor: "#e68900" },
                    width: "auto",
                  }}
                  onClick={handleOrdered}
                >
                  Home Page
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Right Side: Price Summary */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  PRICE DETAILS
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography>Price ({carts.length} items)</Typography>
                  <Typography>₹{totalPrice + totalDiscount}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Discount</Typography>
                  <Typography color="green">-₹{totalDiscount}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="green">Coupons Applied</Typography>
                  <Typography color="green">-₹50</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Platform Fee</Typography>
                  <Typography>₹3</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography>Delivery Charges</Typography>
                  <Typography color="green">Free</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontWeight="bold"
                >
                  <Typography>Total Amount Paid</Typography>
                  <Typography>₹{totalPrice + 3 - 50}</Typography>
                </Box>
                <Typography color="green">
                  You will save ₹{totalDiscount + 50} on this order
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 2,
                    color: "gray",
                  }}
                >
                  <InfoIcon sx={{ marginRight: 1 }} />
                  <Typography variant="body2">
                    Safe and Secure Payments. Easy Returns. 100% Authentic
                    products.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default OrderSuccessComp;
