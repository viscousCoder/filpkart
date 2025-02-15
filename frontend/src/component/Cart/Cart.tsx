import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import ShoppingCart from "./ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchOrders } from "../../store/orderSlice";
import EmptyCart from "./EmptyCart";
import Loading from "../Loading/Loading";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [toggle, setToggle] = useState(false);

  const { loading, updateLoading, orders } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrders({ status: "CART" }));

    console.log("hee");
  }, [dispatch, toggle]);

  return (
    <Container sx={{ mt: 4 }}>
      {loading || updateLoading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <EmptyCart />
      ) : (
        <ShoppingCart carts={orders} setToggle={setToggle} />
      )}
    </Container>
  );
};

export default Cart;
