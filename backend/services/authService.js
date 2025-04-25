import User from "../models/User.js";
import jwt from "jsonwebtoken";

export default class AuthService {
  constructor() {}

  async register({ username, password }) {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("Username already taken");
    }

    const user = new User({ username, password });
    await user.save();
  }

  async login({ username, password }) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
    });

    return token;
  }

  async getProfile(userId) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async updateProfile(userId, { about }) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.about = about || user.about;
    await user.save();
    return { message: "Profile updated successfully" };
  }
}
