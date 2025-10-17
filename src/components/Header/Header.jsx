import { FaLocationDot } from "react-icons/fa6";
import classes from "./Header.module.css";
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import LowerContainer from "./LowerContainer";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../utils/firebase";
const Header = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);
  console.log(basket);

  return (
    <>
      <section className={classes.fixed}>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                width="100px"
                alt=""
              />
            </Link>
            <span>
              <FaLocationDot className={classes.location_icon} />
            </span>
          </div>
          <div className={classes.delivery}>
            <p>Delivered to</p>
            <span>Ethiopia</span>
          </div>

          <div className={classes.search}>
            <select name="" id="">
              <option value=""> ALL</option>
            </select>
            <input type="text" />
            <span className={classes.search_icon}>
              <FaSearch />
            </span>
          </div>

          <div className={classes.flag}>
            <Link to="" className={classes.language}>
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/532/212/original/vector-united-states-of-america-flag-usa-flag-america-flag-background.jpg"
                width="50px"
                alt=""
              />
              <select>
                <option value="">EN</option>
              </select>
            </Link>

            <Link to={!user && "/auth"} className={classes.signin}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign out</span>
                  </>
                ) : (
                  <>
                    <p>Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>

            <Link to="/orders" className={classes.orders}>
              <p>returns</p>
              <span>&Orders</span>
            </Link>
          </div>
          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} color="white" />

            <span>{totalItem}</span>
          </Link>
        </div>
      </section>
      <LowerContainer />
    </>
  );
};

export default Header;
