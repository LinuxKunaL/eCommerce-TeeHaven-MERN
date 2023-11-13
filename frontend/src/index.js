import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Signin from "./components/Signin";
import Checkout from "./components/Checkout";
import Signup from "./components/Signup";
import Forgotpass from "./components/Forgotpass";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermConditions from "./pages/TermConditions";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/user/Profile";
import Login from "./pages/Login";
import ProductOverview from "./components/ProductOverview";
import Dashboard from "./admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AdminLogin from "./admin/AdminLogin";
import { Provider } from "react-redux";
import store from "./App/redux/store";
import ScrollToTopOnMount from "./App/ScrollToTopOnMount.js";
import ProductEdit from "./admin/components/ProductEdit";
import ProductAdd from "./admin/components/ProductAdd";
import BottomBar from "./components/BottomBar";
import CartView from "./components/CartView";

import "../src/assets/styles/Main.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <CartView />
        <ScrollToTopOnMount />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />

          {/* protected route for Checkout */}
          <Route
            path="/checkout"
            element={<ProtectedRoute Component={Checkout} />}
          />
          {/* protected route for Checkout */}

          <Route
            path="/login"
            element={<ProtectedRoute Component={Login} LoginCom={true} />}
          >
            <Route path="/login/signin" element={<Signin />} />
            <Route path="/login/signup" element={<Signup />} />
            <Route path="/login/forgotpassword" element={<Forgotpass />} />
          </Route>
          {/* protected route for dashboard */}
          <Route
            path="/adminLogin"
            element={<AdminProtectedRoute Component={AdminLogin} />}
          />
          <Route
            path="/dashboard/*"
            element={<AdminProtectedRoute Component={Dashboard} />}
          >
            <Route path="products" />
            <Route path="products/:id" element={<ProductEdit />} />
            <Route path="products/add" element={<ProductAdd />} />
            <Route path="home" />
            <Route path="orders" />
            <Route path="orders/:id" />
            <Route path="users" />
          </Route>
          {/* protected route for dashboard */}
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/termConditions" element={<TermConditions />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          {/* protected route for user */}
          <Route
            exact
            path="/profile/*"
            element={<ProtectedRoute Component={Profile} />}
          >
            <Route exact path="orders">
              <Route path=":id" />
            </Route>
            <Route path="billingaddress" />
            <Route path="previousorders">
              <Route path=":id" />
            </Route>
          </Route>
          {/* protected route for user */}

          <Route path="/product/:id" element={<ProductOverview />} />
        </Routes>
        <BottomBar />
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
