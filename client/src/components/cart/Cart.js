import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
//import { products } from "../home/productdata";
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const month = new Date().getMonth();

  const navigate = useNavigate();

  const { id } = useParams();

  const { account, setAccount } = useContext(LoginContext);

  const [ekprod, setEkprod] = useState([]);

  const oneproduct = async () => {
    const res = await fetch(`/getproduct/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status !== 201) {
      console.log("failed");
    } else {
      setEkprod(data);
    }
  };

  useEffect(() => {
    oneproduct();
  }, [id]);

  // add to cart
  const addtocart = async (id) => {
    const res = await fetch(`/cartprod/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ekprod,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (res.status !== 201) {
      
      navigate("/signin")
    } else {
      navigate("/buynow");
      setAccount(data);
    }
  };

  return (
    <div className="cart_section">
      {ekprod && Object.keys(ekprod).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={ekprod.detailUrl} alt="cart" />
            <div className="cart_btn">
              <button
                className="cart_btn1" /*onClick={() => addtocart(ekprod.id)}*/
                onClick={() => addtocart(ekprod.id)}
              >
                Add to Cart
              </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{ekprod.title.shortTitle}</h3>
            <h4>{ekprod.title.longTitle}</h4>
            <Divider />
            <p className="mrp">
              M.R.P. : <del>₹{ekprod.price.mrp}</del>
            </p>
            <p>
              Deal of the Day :{" "}
              <span style={{ color: "#B12704" }}>₹{ekprod.price.cost}.00</span>
            </p>
            <p>
              You save :{" "}
              <span style={{ color: "#B12704" }}>
                {" "}
                ₹{ekprod.price.mrp - ekprod.price.cost} ({ekprod.price.discount}
                ){" "}
              </span>
            </p>

            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{ekprod.discount}</span>{" "}
              </h5>
              <h4>
                FREE Delivery :{" "}
                <span style={{ color: "#111", fontWeight: "600" }}>
                  {month}
                </span>{" "}
                Details
              </h4>
              <p style={{ color: "#111" }}>
                Fastest delivery:{" "}
                <span style={{ color: "#111", fontWeight: "600" }}>
                  {" "}
                  Tomorrow 9AM
                </span>
              </p>
            </div>
            <p className="description">
              About the Iteam :{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.4px",
                }}
              >
                {ekprod.description}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
