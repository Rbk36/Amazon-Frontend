import CategoryCard from "./CategoryCard";
import categoryInfo from "./categoryData";
import classes from "./category.module.css";
const Category = () => {
  return (
    <section className={classes.categoryContainer}>
      {categoryInfo?.map((info) => (
        <CategoryCard data={info} key={info.id} />
      ))}
    </section>
  );
};

export default Category;
