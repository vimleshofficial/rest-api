import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import { registreValodation, loginValodation } from "./validation.js";
import bcrypt from "bcryptjs";

//Get User
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).send("User Not Exist");
    res.status(200).send({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).send(error);
  }
};

//Submit New User
const newUser = async (req, res) => {
  //Validate user data
  const { error } = registreValodation(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hasPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hasPassword,
  });

  try {
    //Checking User exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(401).send("Email already exist");

    const saveUser = await user.save();
    if (!saveUser) return res.status(401).send("User not save");
    const token = jwt.sign({ id: saveUser._id }, process.env.TOKEN_SECRET);

    res.header("auth-token", token).send({
      token,
      user: { id: saveUser._id, name: saveUser.name, email: saveUser.email },
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

//Login user
const loginUser = async (req, res) => {
  //Validate user data
  const { error } = loginValodation(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  try {
    //Checking User exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("Email or password is wrong.");

    //Password is currect
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(401).send("Email or password is wrong");
    //Create and assing a token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

    res.header("auth-token", token).send({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    //console.log(err);
    res.status(400).send({ msg: err });
  }
};

export { newUser, loginUser, getUser };
