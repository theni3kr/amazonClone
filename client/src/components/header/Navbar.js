import { React, useContext, useEffect, useState } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Rightheader from "./Rightheader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);

  // console.log(account)

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState("");
  // console.log(text);

  const { products } = useSelector((state) => state.getproductsdata);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [liopen, setLiopen] = useState(true);

  const [togl, settogl] = useState(false);

  const validuser = async () => {
    const res = await fetch("/validuser", {
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
      setAccount(data);
    }
  };

  const toggle = () => {
    settogl((prv) => !prv);
  };

  const logout = async () => {
    const res = await fetch("/logout", {
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
      setAccount(false);
      navigate("/");
    }
  };

  const getText = (text) => {
    setText(text);
    setLiopen(false);
  };

  const onclick = ()=>{
    handleClose()
    logout()
  }

  useEffect(() => {
    validuser();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={toggle}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          <Drawer open={togl} onClick={toggle}>
            <Rightheader userlogout={logout} />
          </Drawer>

          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbar">
            <input
              type="text"
              name=""
              onChange={(e) => getText(e.target.value)}
              placeholder="Search your products"
              id=""
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <NavLink
                        to={`/cartprod/${product.id}`}
                        onClick={() => setLiopen(true)}
                      >
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>

        <div className="right">
          {account ? (
            <>
              <NavLink to="/buynow">
                <div className="cart_btn">
                  <Badge badgeContent={account.carts.length} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                  <p>cart</p>
                </div>
              </NavLink>
              <Avatar
                className="avatar2"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {account.name[0].toUpperCase()}
              </Avatar>
            </>
          ) : (
            <>
              <div className="nav_btn">
                <NavLink to="/signin">signin</NavLink>
              </div>

              <div className="cart_btn">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
                <p>cart</p>
              </div>

              <Avatar />
            </>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {account ? (
              <MenuItem onClick={onclick} /* onClick={handleClose}  onClick={logout} */>
                <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />
                Logout
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
