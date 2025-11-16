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


