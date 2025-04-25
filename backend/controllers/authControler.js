import AuthService from "../services/authService.js";

export default class AuthController {
  constructor() {
    this.authService = new AuthService();
    console.log("AuthController initialized", this.authService);
  }

  async register(req, res) {
    try {
      await this.authService.register(req.body);
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      if (error.message === "Username already taken") {
        return res.status(400).json({ message: "Username already taken" });
      }
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
      const token = await this.authService.login({ username, password }, res);
      console.log("Login successful, token:", token);
      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      if (error.message === "User not found") {
        return res.status(400).json({ message: "User not found" });
      }
      if (error.message === "Invalid password") {
        return res.status(401).json({ message: "Invalid password" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getProfile(req, res) {
    try {
      const user = await this.authService.getProfile(req.user.id);
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateProfile(req, res) {
    try {
      const { about } = req.body;
      const response = await this.authService.updateProfile(req.user.id, { about });
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

