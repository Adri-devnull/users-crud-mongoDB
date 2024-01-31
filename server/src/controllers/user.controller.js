const usersController = {};

const { v4 } = require("uuid");
const UserModel = require("../models/user.model");

usersController.getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    return res.status(200).send(allUsers);
  } catch (err) {
    return res.send({
      errors: "Fail reading users",
    });
  }
};

usersController.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    return res.status(200).send(user);
  } catch (err) {
    return res.send({
      errors: "Fail reading users",
    });
  }
};

usersController.createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).send({ err: "Bad request" });
  try {
    const newUser = new UserModel({
      _id: v4(),
      name,
      email,
    });
    await newUser.save();

    const allUsers = await UserModel.find();
    return res.status(200).send(allUsers);
  } catch (err) {
    return res.status(500).send("Error creating user");
  }
};

usersController.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) return res.status(409).send({ err: "User not exists" });
    await UserModel.updateOne({ _id: id }, { $set: { ...req.body } });
    const allUsers = await UserModel.find();
    return res.status(200).send(allUsers);
  } catch (err) {
    return res.send("We can't fin user ID");
  }
};

usersController.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) return res.status(409).send({ err: "User not exists" });
    await UserModel.deleteOne({ _id: id });
    const allUsers = await UserModel.find();
    return res.status(200).send(allUsers);
  } catch (err) {
    return res.send("User not found");
  }
};

module.exports = usersController;
