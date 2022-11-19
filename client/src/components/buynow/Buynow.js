import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./buynow.css";
//import { products } from "../home/productdata";
import Option from "./Option";
import Subtotal from "./Subtotal";
import Right from "./Right";
import Empty from "./Empty";

const Buynow = () => {
  const [cart, setCart] = useState("");
  // console.log(cart);

  const cartdata = async () => {
    const res = await fetch("/cartdata", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();

    if (res.status !== 201) {
      console.log("error");
    } else {
      setCart(data.carts);
    }
  };

  useEffect(() => {
    cartdata();
  }, []);

  return (
    <>
      {cart.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all items</p>
              <span className="leftbuyprice">Price</span>
              <Divider />

              {cart.map((item, i) => (
                <>
                  <div className="item_container">
                    <img src={item.detailUrl} alt="prodimg" />
                    <div className="item_details">
                      <h3>{item.title.longTitle}</h3>
                      <h3>{item.title.shortTitle}</h3>
                      <h3 className="diffrentprice">₹{item.price.mrp}</h3>
                      <p className="unusuall">Usually dispatched in 8 days.</p>
                      <p>Eligible for FREE Shipping</p>
                      <img
                        src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                        alt="logo"
                      />
                      <Option deleteprod={item.id} updatecart={cartdata}/>
                    </div>
                    <h3 className="item_price">₹{item.price.cost}</h3>
                  </div>
                  <Divider />
                </>
              ))}

             
              <Subtotal item ={cart}/>
            </div>
            <Right item ={cart}/>
          </div>
        </div>
      ) : (
        <Empty/>
      )}
    </>
  );
};

export default Buynow;
