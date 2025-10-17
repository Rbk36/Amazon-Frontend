import { useState } from "react";
import classes from "./product.module.css";
import { useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loader from "../../components/Loader/Loader";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        console.log(res);
        setProducts(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.product_container}>
          {products?.map((item, index) => (
            <ProductCard key={index} singleproduct={item} renderAdd={true} />
          ))}
        </div>
      )}
    </>
  );
};

export default Product;
