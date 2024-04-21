import prisma from "../libs/prisma.js";

class Controller {
  static async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany();

      res.status(200).json(users);

      console.log(users, "<---usercontroller");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default Controller;
