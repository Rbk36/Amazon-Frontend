import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import LayOut from "../../components/LayOut/LayOut";
import classes from "./payments.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { ClipLoader } from "react-spinners";
import { axiosInstance } from "../../utils/axios";
import { Type } from "../../utils/action.type";
import { db } from "../../utils/firebase";
const Payments = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  // console.log(user);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket?.reduce((amount, item) => {
    return amount + item.price * item.amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100} `,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });
      // console.log(paymentIntent);

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      dispatch({ type: Type.EMPTY_USER });
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>Checkout({totalItem}) items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123, Gullele street</div>
            <div>Addis Ababa</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <div key={item.id ?? index}>
                <ProductCard
                  singleproduct={item}
                  renderDesc={false}
                  renderAdd={false}
                  flex={true}
                />
              </div>
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form action="" onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payments;
