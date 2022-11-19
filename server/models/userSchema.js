const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretkey = process.env.KEY;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is wrong");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  passwordagain: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: Array,
});
//password hashing bfr save
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordagain = await bcrypt.hash(this.passwordagain, 12);
  }
  next();
});


//token generate funct bfr sign in call it
userSchema.methods.getauthtoken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, secretkey);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

// putting product to cart

userSchema.methods.prodtocart = async function(product){
  try {
    this.carts = this.carts.concat(product)
    await this.save()
    
  } catch (error) {
    console.log("error")
  }
}





const users = new mongoose.model("users", userSchema);

module.exports = users;
