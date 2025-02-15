import { Fragment, useEffect } from "react";
import Eccomerce from "../../component/AllProducts/Ecommerce";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchProducts } from "../../store/productSlice";

const ProductCategory = () => {
  const { category } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : "";
  // console.log("Ca", category);
  useEffect(() => {
    dispatch(fetchProducts({ category: formattedCategory }));
  }, [formattedCategory]);
  return (
    <Fragment>
      <Eccomerce />
    </Fragment>
  );
};

export default ProductCategory;
