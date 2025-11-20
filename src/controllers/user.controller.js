import User from "../models/user.model.js";
import { success, error } from "../utils/response.js";

export const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return error(res, "Email alreadt exusts", 400, "EMAIL_DUPLICATE");
    }
    const user = await User.create(req.body);
    success(res, "User created successfully", user);
  } catch (err) {
    error(res, err.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const findUser = await User.findById(_id);
    if (!findUser) {
      return error(res, "User not found", 400, "USER_NOT_FOUND");
    }
    const user = await User.findByIdAndUpdate(_id, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    success(res, "User updated successfully", user);
  } catch (err) {
    error(res, err.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const findUser = await User.findById(_id);
    if (!findUser) {
      return error(res, "User not found", 400, "USER_NOT_FOUND");
    }
    const user = await User.findByIdAndDelete(_id);
    success(res, "User deleted successfully", user);
  } catch (err) {
    error(res, err.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    success(res, "User fetched successfully", user);
  } catch (err) {
    error(res, err.message);
  }
};
