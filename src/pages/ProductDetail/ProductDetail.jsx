import classes from "./productDetail.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { axiosInstance } from "../../utils/axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";
import { myUrl } from "../../Api/endPoint";
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`${myUrl}/products/${productId}`);
        setProduct(res.data);
        setIsLoading(false);
        console.log(res.data);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    })();
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.product_container}>
          <ProductCard singleproduct={product} />
        </div>
      )}
    </LayOut>
  );
};
export default ProductDetail;
