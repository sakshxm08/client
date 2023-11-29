import React, { useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  Navigate,
} from "react-router-dom";
import { Cart } from "./pages/Cart";
import { Products } from "./pages/Products";
import { NotFound } from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import { Stash } from "./pages/Stash";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Reset } from "./pages/Reset";
import Product from "./pages/Product";
import Seller from "./pages/seller/Seller";
import AddItem from "./pages/seller/AddItem";
import { AnimatePresence } from "framer-motion";
import { logo } from "./assets";
import { useAuthContext } from "./hooks/useAuthContext";
import { useDispatch } from "react-redux";
import { setCartRedux } from "./features/cart/cartSlice";
import { setStashRedux } from "./features/stash/stashSlice";
import { SearchItems } from "./pages/SearchItems";

const Layout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      document.getElementById("loader").style.animation =
        "loader 3s cubic-bezier(0.785, 0.135, 0.15, 0.86)";

      document.body.style.overflow = "hidden";
      setTimeout(() => {
        setLoading(false);

        document.body.style.overflow = "scroll";
      }, 3000);
    }
  }, [loading]);
  return (
    <>
      {loading && (
        <div id="loader">
          <img src={logo} alt="" />
        </div>
      )}
      <Header />
      <ScrollRestoration />
      <AnimatePresence>
        <Outlet />
      </AnimatePresence>
      <Footer />
    </>
  );
};

function App() {
  const { user } = useAuthContext();

  const dispatch = useDispatch();

  useEffect(() => {
    const getCart = async () => {
      if (user) {
        const response = await fetch(
          "https://wearworx-server.onrender.com/api/cart",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();

        if (json.length > 0) {
          dispatch(setCartRedux(json[0].cart));
        }
      }
    };
    getCart();
  }, [user, dispatch]);
  useEffect(() => {
    const getStash = async () => {
      if (user) {
        const response = await fetch(
          "https://wearworx-server.onrender.com/api/stash",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();

        if (json.length > 0) {
          dispatch(setStashRedux(json[0].stash));
        }
      }
    };
    getStash();
  }, [user, dispatch]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        { path: "/cart", element: <Cart /> },
        { path: "/stash", element: <Stash /> },
        { path: "/products/:category", element: <Products /> },
        { path: "/products/:category/:id", element: <Product /> },
        { path: "/seller", element: <Seller /> },
        { path: "/seller/additem", element: <AddItem /> },
        { path: "/login", element: user ? <Navigate to="/" /> : <Login /> },
        { path: "/signup", element: user ? <Navigate to="/" /> : <Signup /> },
        { path: "/reset", element: user ? <Navigate to="/" /> : <Reset /> },
        { path: "/men", element: <Home /> },
        { path: "/women", element: <Home /> },
        { path: "/kids", element: <Home /> },
        { path: "/beauty", element: <Home /> },
        { path: "/searchitems", element: <SearchItems /> },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <div className="font-bodyFont">
        <RouterProvider router={router} />
      </div>

      <ToastContainer style={{ top: "100px" }} />
    </>
  );
}

export default App;
