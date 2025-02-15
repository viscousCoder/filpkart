import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Checkbox,
  FormGroup,
  FormControlLabel,
  List,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchOrders } from "../../../store/orderSlice";
import Loading from "../../Loading/Loading";

const deliveryData = [
  "Mon",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
  "Sunday",
];
const OrdersHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, orders } = useSelector((state: RootState) => state.orders);
  const [search, setSearch] = useState("");
  const hasMounted = useRef(false);

  const filteredOrders = orders?.filter((item) =>
    item?.product?.name.toLowerCase().includes(search.toLowerCase())
  );

  function discount(originalPrice: number, discountPercentage: number) {
    return Number(
      (originalPrice - (originalPrice * discountPercentage) / 100).toFixed(0)
    );
  }

  useEffect(() => {
    console.log("Component Mounted: Fetching 'ORDERED' orders");
    dispatch(fetchOrders({ status: "ORDERED" }));

    if (hasMounted.current) {
      return () => {
        console.log("Component Unmounted: Fetching 'CART' orders");
        dispatch(fetchOrders({ status: "CART" }));
      };
    } else {
      hasMounted.current = true;
    }
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          p={2}
          gap={3}
        >
          {/* Sidebar Filters */}
          <Box
            sx={{
              minWidth: { xs: "100%", md: "250px" },
              bgcolor: "white",
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Filters
            </Typography>

            {/* Order Status */}
            <Typography variant="subtitle1" mt={2} fontWeight="bold">
              ORDER STATUS
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="On the way" />
              <FormControlLabel control={<Checkbox />} label="Delivered" />
              <FormControlLabel control={<Checkbox />} label="Cancelled" />
              <FormControlLabel control={<Checkbox />} label="Returned" />
            </FormGroup>

            {/* Order Time */}
            <Typography variant="subtitle1" mt={2} fontWeight="bold">
              ORDER TIME
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Last 30 days" />
              <FormControlLabel control={<Checkbox />} label="2023" />
              <FormControlLabel control={<Checkbox />} label="2022" />
              <FormControlLabel control={<Checkbox />} label="2021" />
              <FormControlLabel control={<Checkbox />} label="Older" />
            </FormGroup>
          </Box>

          {/* Main Content */}
          <Box flex={1}>
            {/* Search Bar */}
            <Box
              display="flex"
              gap={1}
              mb={2}
              sx={{ flexDirection: { xs: "column", md: "row" } }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search your orders here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" sx={{ textTransform: "none" }}>
                Search Orders
              </Button>
            </Box>

            {/* Orders List */}
            <List>
              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    {/* Product Image */}
                    <Box
                      component="img"
                      src={order?.product?.outer_image}
                      alt={order?.product?.name}
                      sx={{ width: 60, height: 60 }}
                    />

                    {/* Order Details */}
                    <Box flex={1}>
                      <Typography fontWeight="bold">
                        {order?.product?.name}
                      </Typography>
                      <Typography component={"span"} sx={{ color: "#888" }}>
                        {order?.product?.overview.length > 100
                          ? order?.product?.overview.slice(0, 90) + "..."
                          : order?.product?.overview}
                      </Typography>
                      <Typography variant="body2">
                        {order?.quantity} Item
                      </Typography>
                      <Typography variant="body2">
                        <s>₹{order.product?.price}</s>{" "}
                        <span style={{ color: "success" }}>
                          ₹
                          {discount(
                            order.product?.price,
                            order.product?.discount
                          )}{" "}
                          ({order.product?.discount}% Off)
                        </span>
                      </Typography>

                      {/* Status Message */}
                      <Typography color={"success"} fontWeight="bold" mt={1}>
                        delivered{" "}
                        {order.id && (
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            (Exchange ID: {order.id})
                          </Typography>
                        )}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Deliveried on{" "}
                        {deliveryData[Math.floor(Math.random() * 5) + 1]}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default OrdersHistory;
