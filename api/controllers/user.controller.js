import prisma from "../libs/prisma.js";
import bcrypt from "bcrypt";

class Controller {
  static async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany();

      res.status(200).json(users);

      //   console.log(users, "<---usercontroller");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      res.status(200).json(user);

      //   console.log(user, "<---usercontroller");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const tokenUserId = req.userId;
    const { username, email, password, avatar } = req.body;

    if (id !== tokenUserId) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    let updatePassword = null;

    try {
      if (password) {
        updatePassword = await bcrypt.hash(password, 10);
      }

      const updateUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          username,
          email,
          ...(updatePassword && { password: updatePassword }),
          ...(avatar && { avatar }),
        },
      });

      const { password: userPassword, ...userInfo } = updateUser;

      res.status(200).json(userInfo);

      console.log(userInfo, "<---usercontroller");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    const tokenUserId = req.userId;

    if (id !== tokenUserId) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });

      res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async savePost(req, res) {
    const { postId } = req.body;
    const tokenUserId = req.userId;

    try {
      const savedPost = await prisma.savedPost.findUnique({
        where: {
          userId_postId: {
            userId: tokenUserId,
            postId,
          },
        },
      });

      if (savedPost) {
        await prisma.savedPost.delete({
          where: {
            id: savedPost.id,
          },
        });
        res.status(200).json({ message: "Post removed from saved list" });
      } else {
        await prisma.savedPost.create({
          data: {
            userId: tokenUserId,
            postId,
          },
        });
        res.status(200).json({ message: "Post saved" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfilePosts(req, res) {
    const tokenUserId = req.userId;

    try {
      const userPosts = await prisma.post.findMany({
        where: {
          userId: tokenUserId,
        },
      });

      const savePost = await prisma.savedPost.findMany({
        where: {
          userId: tokenUserId,
        },
        include: {
          post: true,
        },
      });

      const savedPosts = savePost.map((post) => post.post);

      res.status(200).json({ userPosts, savedPosts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getNotifications(req, res) {
    const tokenUserId = req.userId;
    try {
      const number = await prisma.chat.count({
        where: {
          userIDs: {
            hasSome: [tokenUserId],
          },
          NOT: {
            seenBy: {
              hasSome: [tokenUserId],
            },
          },
        },
      });

      res.status(200).json(number);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default Controller;
