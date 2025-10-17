import CarouselEffect from "../../components/Carousel/CarouselEffect";
import Category from "../../components/Category/Category";
import LayOut from "../../components/LayOut/LayOut";
import Product from "../../components/Product/Product";

const Landing = () => {
  return (
    <LayOut>
      <CarouselEffect />
      <Category />
      <Product />
    </LayOut>
  );
};

export default Landing;
