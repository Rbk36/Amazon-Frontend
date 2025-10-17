import classes from "./category.module.css";
import { Link } from "react-router";
const CategoryCard = ({ data }) => {
  console.log(CategoryCard);
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img
          src={data?.imgLink}
          alt=""
          className="rounded mx-auto d-block"
          height="260"
        />
        <p>Shop now</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
