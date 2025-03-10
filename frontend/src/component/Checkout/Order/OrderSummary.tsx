import React from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Card,
  CardHeader,
  Divider,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../../store/orderSlice";
// import { Product } from "../../interfaceTypes/interfaceTypes";
import ProductDetails from "../../ProductLanding/ProductDetails";

interface CartItem {
  product: ProductDetails;
  quantity: number;
  id: string;
  status: string;
}

interface Props {
  cart: CartItem[];
}

interface Props {
  // cart: CartItem[];
  // setCart: (cart: CartItem[]) => void;
  onContinue: () => void;
}

const seller = [
  "Mohan",
  "Agrwal",
  "Motilal",
  "Johnas",
  "Clothing Garment",
  "Bansal",
  "Gupta",
];

const OrderSummary: React.FC<Props> = ({ onContinue }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((state: RootState) => state.orders);
  // const handleQuantityChange = (id: number, delta: number) => {
  //   const updatedCart = cart.map((item) =>
  //     item.id === id
  //       ? { ...item, quantity: Math.max(1, item.quantity + delta) }
  //       : item
  //   );
  //   console.log(updatedCart);
  //   setCart(updatedCart);
  // };
  // console.log(orders, "Thsi is irder", cart);
  const handleIncrement = (id: string) => {
    dispatch(incrementQuantity(id));
  };
  const handleDecrement = (id: string) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemoveItem = (id: string) => {
    // setCart(cart.filter((item) => item.id.toString() !== id.toString()));
    dispatch(removeItem(id));
  };

  const deliveryData = [
    "Mon",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function discount(originalPrice: number, discountPercentage: number) {
    return (originalPrice - (originalPrice * discountPercentage) / 100).toFixed(
      0
    );
  }

  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <>
            <Typography variant="h6" fontWeight="bold">
              Shopping Cart ({orders?.length} items)
            </Typography>
            <Divider sx={{ my: 2 }} />
          </>
        }
      />

      <CardContent sx={{ overflow: "auto", height: "20rem" }}>
        {orders.map((item) => (
          <Box key={item.id} display="flex" alignItems="center" py={2}>
            <Box width={"30%"}>
              <CardMedia
                component="img"
                sx={{ width: "100%", borderRadius: 2 }}
                image={item?.product?.outer_image}
                alt={item.product?.name}
              />
            </Box>
            <Box ml={2} width={"100%"}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography fontWeight="bold">{item?.product?.name}</Typography>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Delivery by{" "}
                    {deliveryData[Math.floor(Math.random() * 5) + 1]}|{" "}
                    {Number(item.product?.price) > 1000 ? "Free" : "₹40"}
                  </Typography>
                </Box>
              </Box>
              <Typography
                component={"div"}
                variant="body2"
                color="text.secondary"
                sx={{ marginRight: "10px" }}
              >
                Seller: {seller[Math.floor(Math.random() * 5) + 1]}
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
                <s>₹{item?.product?.price}</s>{" "}
                <span style={{ color: "green" }}>
                  ₹
                  {discount(
                    Number(item?.product?.price),
                    Number(item?.product?.discount)
                  )}{" "}
                  ({item?.product?.discount}% Off)
                </span>
              </Typography>

              <Box display="flex" alignItems="center" mt={1}>
                <IconButton
                  // onClick={() => handleQuantityChange(item.id, -1)}
                  onClick={() => handleDecrement(item.id!)}
                  sx={{
                    border: "1px solid #aaa",
                    borderRadius: "50%",
                    p: 0.5,
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography mx={1}>{item.quantity}</Typography>
                <IconButton
                  // onClick={() => handleQuantityChange(item.id, 1)}
                  onClick={() => handleIncrement(item.id!)}
                  sx={{
                    border: "1px solid #aaa",
                    borderRadius: "50%",
                    p: 0.5,
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>

              <Box style={{ marginTop: 8 }}>
                <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                  Save for Later
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleRemoveItem(item.id!)}
                >
                  Remove
                </Button>
              </Box>
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
          onClick={onContinue}
        >
          Continue
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrderSummary;
