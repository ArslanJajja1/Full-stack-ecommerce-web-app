import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/nav/Header";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCategoryCreate from "./pages/admin/subCategory/SubCategoryCreate";
import SubCategoryUpdate from "./pages/admin/subCategory/SubCategoryUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SideDrawer from "./components/drawer/SideDrawer";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
import Payment from "./pages/Payment";
import Footer from "./components/footer/Footer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token).then((res) => {
          const { name, email, role, _id } = res.data;
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name,
              email,
              role,
              _id,
              token: idTokenResult.token,
            },
          });
        });
      }
    });
    return () => unsubscribe;
  }, [dispatch]);
  return (
    <>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route
          path="/user/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        />
        <Route
          path="/user/password"
          element={
            <UserRoute>
              <Password />
            </UserRoute>
          }
        />
        <Route
          path="/user/wishlist"
          element={
            <UserRoute>
              <Wishlist />
            </UserRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <AdminRoute>
              <CategoryCreate />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/category/:slug"
          element={
            <AdminRoute>
              <CategoryUpdate />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/subcategory"
          element={
            <AdminRoute>
              <SubCategoryCreate />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/sub/:slug"
          element={
            <AdminRoute>
              <SubCategoryUpdate />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <AdminRoute>
              <ProductCreate />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AllProducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product/:slug"
          element={
            <AdminRoute>
              <ProductUpdate />
            </AdminRoute>
          }
        />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/category/:slug" element={<CategoryHome />} />
        <Route path="/subs/:slug" element={<SubHome />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <UserRoute>
              <Checkout />
            </UserRoute>
          }
        />
        <Route
          path="/admin/coupon"
          element={
            <AdminRoute>
              <CreateCouponPage />
            </AdminRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <UserRoute>
              <Payment />
            </UserRoute>
          }
        />
        <Route
          path="*"
          element={
            <div className="w-100 ml-auto my-auto">
              {" "}
              <h3 className="text-white">This page does not exist. </h3>
              <Link to="/">Back to Home</Link>
            </div>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
