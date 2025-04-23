const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async register(req, res) {
    const { username, password } = req.body;
  
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }
  
    const user = new User({ username, password });
    await user.save();
  
    res.status(201).json({ message: "User registered" });
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
  
      
  
      const valid = password === user.password;  
    
      if (!valid) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
  async getProfile(req, res) {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  }
}

module.exports = new AuthController();
