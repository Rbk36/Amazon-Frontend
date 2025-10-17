import { AiOutlineMenu } from "react-icons/ai";
import classes from "./Header.module.css";
const LowerContainer = () => {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <AiOutlineMenu />
          <span>ALL</span>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
};

export default LowerContainer;
