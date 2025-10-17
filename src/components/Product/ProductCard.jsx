import React, { useContext } from "react";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import Rating from "@mui/material/Rating";
import { Link } from "react-router";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../utils/action.type";
const ProductCard = ({ singleproduct, flex, renderDesc, renderAdd }) => {
  const { image, title, rating = {}, price, id, description } = singleproduct;
  const [state, dispatch] = useContext(DataContext);
  console.log(singleproduct);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      payload: singleproduct,
    });
  };
  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="images" />
      </Link>
      <div>
        <h3 className={classes.title}>{title}</h3>
        {renderDesc && (
          <div>
            <p style={{ padding: "10px 0", maxWidth: "750px" }}>
              {description}
            </p>
          </div>
        )}
        <div className={classes.rating}>
          {/*
        rating
        */}
          <Rating Value={rating?.rate || 0} precision={0.1} />

          {/*
    counter
    */}
          <small>{rating?.count || 0}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
