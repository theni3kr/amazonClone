const express = require("express");
const router = new express.Router();
const products = require("../models/productsSchema");
const users = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const getauthuser = require("../middleware/getauthuser");

//get products data api
router.get("/getproducts", async (req, res) => {
  try {
    const productdata = await products.find();
    res.status(201).json(productdata);
  } catch (err) {
    res.status(404).json(err);
  }
});

// get individual product

router.get("/getproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id)

    const data = await products.findOne({ id });
    //console.log(data)

    res.status(201).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

//post user into database(sign up user)

router.post("/putuser", async (req, res) => {
  const { name, email, mobile, password, passwordagain } = req.body;

  if (!name || !email || !mobile || !password || !passwordagain) {
    res.status(422).json({ error: "enter all fields" });
    return;
  }
  try {
    const preuser = await users.findOne({ email });
    if (preuser) {
      res.status(422).json({ error: "user already exist" });
      return;
    } else if (password !== passwordagain) {
      res.status(422).json({ error: "passwords should be different" });
      return;
    } else {
      const userdata = new users({
        name,
        email,
        mobile,
        password,
        passwordagain,
      });

      const data = await userdata.save();
      res.status(201).json(data);
    }
  } catch (err) {
    res.status(422).json(err.message);
  }
});

// sign in user

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "fill all details" });
    return;
  }

  try {
    const userexist = await users.findOne({ email });

    if (userexist) {
      const passmatch = await bcrypt.compare(password, userexist.password);
      if (!passmatch) {
        res.status(422).json({ error: "fill valid details" });
      } else {
        // token genrate call func in userSchema
        const token = await userexist.getauthtoken();
        // console.log(token)
        // generate cookies and send them to frontend
        res.cookie("amazonclone", token, {
          expires: new Date(Date.now() + 2500000),
          httpOnly: true,
        });
        res.status(201).json(userexist);
      }
    } else {
      res.status(422).json({ error: "fill valid details" });
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
});

//add to cart product

router.post("/cartprod/:id", getauthuser, async (req, res) => {
  const { id } = req.params;

  /* console.log(id)
   res.status(201).json({message:`added ${id}`})*/

  try {
    const getprod = await products.findOne({ id });
    // console.log(getprod)

    const getuser = await users.findOne({ _id: req.userid });

    if (getuser) {
      await getuser.prodtocart(getprod);

      res.status(201).json(getuser);
    } else {
      res.status(422).json({ error: "invalid data" });
    }
  } catch (err) {
    res.status(401).json({ err });
  }
});

//get cart details

router.get("/cartdata", getauthuser, async (req, res) => {
  try {
    const getuser = await users.findOne({ _id: req.userid });

    res.status(201).json(getuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

//get valid user when you come to website it first check cookie
router.get("/validuser", getauthuser, async (req, res) => {
  try {
    const getuser = await users.findOne({ _id: req.userid });

    res.status(201).json(getuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

//delete product form cart

router.delete("/deleteprod/:id", getauthuser, async (req, res) => {
  try {
    const { id } = req.params;
    req.user.carts = req.user.carts.filter((curval) => curval.id != id);

    await req.user.save();
    res.status(201).json(req.user);
  } catch (error) {
    res.status(422).json(error);
  }
});


//Logout user

router.get("/logout", getauthuser, async(req,res)=>{
  try {
    req.user.tokens = req.user.tokens.filter((curval)=>(
      curval.token !== req.token
    ))
    
    res.clearCookie("amazonclone",{path:"/"})
    await req.user.save()
    res.status(201).json(req.user.tokens)
    
  } catch (error) {
    res.status(422).json(error);
  }
})

module.exports = router;
