const User = require("../models/User");
const jwt = require("jsonwebtoken");

class AuthController {
  async register(req, res) {
    const { username, password } = req.body;

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }

      const user = new User({ username, password });
      await user.save();

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id).select("-password"); 
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new AuthController();
