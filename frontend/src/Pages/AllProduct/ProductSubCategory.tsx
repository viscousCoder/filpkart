import { Fragment, useEffect } from "react";
import Eccomerce from "../../component/AllProducts/Ecommerce";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchProducts } from "../../store/productSlice";

const ProductSubCategory = () => {
  const { subcategory } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const formattedCategory = subcategory
    ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1).toLowerCase()
    : "";
  // console.log("Ca", subcategory);
  useEffect(() => {
    dispatch(fetchProducts({ subcategory: formattedCategory }));
  }, [formattedCategory]);
  return (
    <Fragment>
      <Eccomerce />
    </Fragment>
  );
};

export default ProductSubCategory;
