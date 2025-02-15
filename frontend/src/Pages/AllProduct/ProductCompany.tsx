import { useParams } from "react-router-dom";
import Eccomerce from "../../component/AllProducts/Ecommerce";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Fragment, useEffect } from "react";
import { fetchProducts } from "../../store/productSlice";

const ProductCompany = () => {
  const { company } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const formattedCategory = company
    ? company.charAt(0).toUpperCase() + company.slice(1).toLowerCase()
    : "";
  // console.log("Ca", company);
  useEffect(() => {
    dispatch(fetchProducts({ company_name: formattedCategory }));
  }, [formattedCategory]);
  return (
    <Fragment>
      <Eccomerce />
    </Fragment>
  );
};

export default ProductCompany;
