import { Route, Routes } from "react-router";
import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/Auth/SignUp";
import Payments from "./pages/Payments/Payments";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51SASAdCSEOcemnB56EOfI3aTJGmSM1bB0X2Uc2ckrPOx97ApKYQjCRY0UlRuhAEJV4B7kZf4eK2rsVC004GdUT8P00bDAiKULq"
);

const RouterPath = () => {
  return (
    <>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/auth" element={<SignUp />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"You must login to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payments />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must login to access your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </>
  );
};

export default RouterPath;
