import "./App.css";
import Navbar from "./components/header/Navbar";
import Main from "./components/home/Main";
import Newnav from "./components/newnav/Newnav";
import Footer from "./components/footer/Footer";
import Signin from "./components/signup_in/Signin";
import Signup from "./components/signup_in/Signup";
import { Routes, Route } from "react-router-dom";
import Buynow from "./components/buynow/Buynow";
import Cart from "./components/cart/Cart";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 1000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Navbar />
          <Newnav />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route exact path="/cartprod/:id" element={<Cart />} />
            <Route exact path="/buynow" element={<Buynow />} />
          </Routes>

          <Footer />
        </>
      ) : (
        <div className="progress">
          <Box sx={{ width: "20%" }}>
            <LinearProgress />
          </Box>
        </div>
      )}
    </>
  );
}

export default App;
