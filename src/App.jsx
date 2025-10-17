import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RouterPath from "./RouterPath";
import { DataContext } from "./components/DataProvider/DataProvider";
import { auth } from "./utils/firebase";
import { useEffect, useContext } from "react";
import { Type } from "./utils/action.type";
function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return <RouterPath />;
}

export default App;
