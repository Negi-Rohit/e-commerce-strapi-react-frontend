import React, { Suspense } from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import GitHubIcon from '@material-ui/icons/GitHub';

import Products from "./components/products/Products";
import Navbar from "./components/UI/navbar/Navbar";
import Spinner from "./components/UI/spinner/Spinner";

const Product = React.lazy(() => {
  return import("./components/products/product/Product");
})
const Cart = React.lazy(() => {
  return import("./components/auth/cart/Cart");
})
const Login = React.lazy(() => {
  return import("./components/auth/login/Login");
})
const Success = React.lazy(() => {
  return import("./components/auth/orders/Success");
})
const Orders = React.lazy(() => {
  return import("./components/auth/orders/Orders");
})


function App() {
  return (
    <div className="app">
      <Navbar />

      <hr />


      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/user/orders" component={Orders} />
          <Route path="/success/:session_id" component={Success} />
          <Route path="/product/:id" component={Product} />
          <Route path="/products" component={Products} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Cart} />
          <Redirect to="/products" />
        </Switch>
      </Suspense>


      <hr style={{ marginTop: "50px" }} />

      <footer className="footer-class">
        
        <span>&#169; negirohit040@gmail.com</span>
        <a href="https://github.com/Negi-Rohit" target="_blank" rel="noreferrer noopener">
          <GitHubIcon className="github-icon" />
        </a>

      </footer>
    </div>
  );
}

export default App;
