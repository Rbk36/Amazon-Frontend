import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import ProductCard from "../../components/Product/ProductCard";
import LayOut from "../../components/LayOut/LayOut";
const Test = () => {
  const { id } = useParams();
  const [iphoneProducts, setIphoneProducts] = useState(null);
  useEffect(() => {
    const getProduct = async () => {
      const response = await axiosInstance(`products/${id}`);
      setIphoneProducts(response.data);
    };
    getProduct();
  }, []);
  if (iphoneProducts) {
    return (
      <LayOut>
        <ProductCard singleproduct={iphoneProducts} />
      </LayOut>
    );
  }
};
export default Test;
