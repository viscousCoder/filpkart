import { Fragment, useEffect } from "react";
import Eccomerce from "../../component/AllProducts/Ecommerce";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchSeachProductDetails } from "../../store/productSlice";

const SearchProducts = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const query = localStorage.getItem("query");
    if (query) dispatch(fetchSeachProductDetails({ searchQuery: query }));
  }, []);
  return (
    <Fragment>
      <Eccomerce />
    </Fragment>
  );
};

export default SearchProducts;
