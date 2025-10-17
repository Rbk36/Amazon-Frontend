import { Carousel } from "react-responsive-carousel";
import { img } from "../../assets/img/data";
import classes from "../Carousel/carousel.module.css";
const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoplay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        {img.map((image, index) => {
          return <img key={index} src={image} alt="images" />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
};

export default CarouselEffect;
