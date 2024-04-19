import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../libs/prisma.js";

class Controller {
  static async register(req, res) {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      console.log(newUser);

      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) return res.status(404).json({ message: "User not found!" });

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

      // res.setHeader("Set-Cookie", `cookieName=` + "myValue");

      const age = 1000 * 60 * 60 * 24 * 7;

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: age }
      );

      res
        .cookie("cookieName", token, {
          httpOnly: true,
          // secure: true,
          maxAge: age,
        })
        .status(200)
        .json({ message: "Login successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static logout(req, res) {
    res.clearCookie("cookieName").status(200).json({ message: "Logout successfully!" });
  }
}

export default Controller;
