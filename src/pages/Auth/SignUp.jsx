import classes from "./SignUp.module.css";
import { Link, useNavigate, useLocation } from "react-router";
import { auth } from "../../utils/firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState, useContext } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider.jsx";
import { Type } from "../../utils/action.type.js";
import { ClipLoader } from "react-spinners";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const navStateData = useLocation();
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const [{ user }, dispatch] = useContext(DataContext);
  console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    const action = e.target.name;

    try {
      if (action === "signin") {
        setLoading((prev) => ({ ...prev, signIn: true }));
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        navigate("/");
      } else if (action === "signup") {
        setLoading((prev) => ({ ...prev, signUp: true }));
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        navigate(navStateData?.state?.redirect || "/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading((prev) => ({
        ...prev,
        signIn: false,
        signUp: false,
      }));
    }
  };

  console.log(user);
  return (
    <div className={classes.login}>
      <Link to="/">
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.Amtad6cu5WsYrZ3gC2IgGgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
          width="100px"
          alt=""
          color="black"
        />
      </Link>
      <div className={classes.loginContainer}>
        <h1>SignIn</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              color: "red",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        {/* form */}
        <form action="">
          <div>
            <label htmlFor="email" id="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div>
            <label htmlFor="password" id="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.login_signinBtn}
          >
            {loading.signIn ? <ClipLoader color="#333" /> : "Signin"}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing in you agree to the terms and condtions of the project
          amazon. Please check our privacy , cookies notice for further use
        </p>
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.login_registerBtn}
        >
          {loading.signUp ? (
            <ClipLoader color="#333" />
          ) : (
            " Create Amazon account"
          )}
        </button>
        {error && (
          <small style={{ padding: "20px", color: "red" }}>{error}</small>
        )}
      </div>
    </div>
  );
};

export default SignUp;
