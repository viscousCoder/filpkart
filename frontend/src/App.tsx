import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterForm from "./component/Register/Register.tsx";
import Rootfile from "./component/Rootfile/Rootfile.tsx";

import LoginForm from "./component/Register/Login.tsx";
// import FileUploadForm from "./component/Create_Product/CreateProduct.tsx";

import Cart from "./component/Cart/Cart.tsx";
import Checkout from "./component/Checkout/Checkout.tsx";

import ProductLanding from "./component/ProductLanding/ProductLanding.tsx";

import AccountLayout from "./component/Profile/AccountLayout.tsx";
import ProfileInfo from "./component/Profile/InnerComponent/ProfileInfo.tsx";
import Payments from "./component/Profile/InnerComponent/Payments.tsx";
import OrdersHistory from "./component/Profile/InnerComponent/OrdersHistory.tsx";
import Address from "./component/Profile/InnerComponent/Address.tsx";
import HomePage from "./Pages/HomePage.tsx";

import ProductCategory from "./Pages/AllProduct/ProductCategory.tsx";
import ProductSubCategory from "./Pages/AllProduct/ProductSubCategory.tsx";
import ProductCompany from "./Pages/AllProduct/ProductCompany.tsx";
import { checkAuthLoader } from "./utils/auth.ts";

import SearchProducts from "./Pages/SearchProducts/SearchProducts.tsx";
import NotFound from "./Pages/NotFound/NotFound.tsx";
import ProductForm from "./component/Create_Product/ProductForm.tsx";
import About from "./Pages/AboutUsPage/AboutUs.tsx";
import ConatctPage from "./Pages/ContactUsPage.tsx/ConatctPage.tsx";
import OrderSuccess from "./Pages/OrderSuccess/OrderSuccess.tsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/admin/register",
      element: <RegisterForm />,
    },
    {
      path: "/admin/login",
      element: <LoginForm />,
    },
    {
      path: "/",
      element: <Rootfile />,
      // loader: checkAuthLoader,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/categories/:category",
          element: <ProductCategory />,
        },
        {
          path: "/categories/:category/:subcategory",
          element: <ProductSubCategory />,
        },
        {
          path: "/top-product/:company",
          element: <ProductCompany />,
        },
        {
          path: "/product/:id",
          element: <ProductLanding />,
        },
        {
          path: "/cart",
          element: <Cart />,
          loader: checkAuthLoader,
        },
        {
          path: "/checkout",
          element: <Checkout />,
          loader: checkAuthLoader,
        },
        {
          path: "/create_product",
          element: <ProductForm />,
          loader: checkAuthLoader,
        },
        {
          path: "/userprofile",
          element: <AccountLayout />,
          loader: checkAuthLoader,
          children: [
            { index: true, element: <ProfileInfo /> },
            {
              path: "payment",
              element: <Payments />,
            },
            {
              path: "orders",
              element: <OrdersHistory />,
            },
            {
              path: "address",
              element: <Address />,
            },
          ],
        },
        {
          path: "/order/success",
          element: <OrderSuccess />,
        },
        {
          path: "/search",
          element: <SearchProducts />,
        },
        {
          path: "/*",
          element: <NotFound />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <ConatctPage />,
        },
        // till here correct

        // {
        //   path: "/file",
        //   element: <FileUploadForm />,
        // },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
