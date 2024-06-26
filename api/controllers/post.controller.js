import prisma from "../libs/prisma.js";
import jwt from "jsonwebtoken";

class Controller {
  static async getPosts(req, res) {
    const query = req.query;
    console.log(query, "<---digetpostss");

    try {
      const posts = await prisma.post.findMany({
        where: {
          city: query.city || undefined,
          type: query.type || undefined,
          property: query.property || undefined,
          price: {
            gte: parseInt(query.minPrice) || 0,
            lte: parseInt(query.maxPrice) || 10000000,
          },
          bedroom: parseInt(query.bedroom) || undefined,
        },
      });

      // setTimeout(() => {
      //   res.status(200).json(posts);
      // }, 5000);

      res.status(200).json(posts);

      // console.log(posts, "<---postcontroller");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getPostById(req, res) {
    const id = req.params.id;

    try {
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          postDetail: true,
          user: {
            select: {
              username: true,
              avatar: true,
            },
          },
        },
      });

      const token = req.cookies?.myCookie;

      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
          if (!err) {
            const saved = await prisma.savedPost.findUnique({
              where: {
                userId_postId: {
                  postId: id,
                  userId: payload.id,
                },
              },
            });
            res.status(200).json({ ...post, isSaved: saved ? true : false });
          } else {
            res.status(500).json({ message: "Internal server error" });
          }
        });
      } else {
        res.status(200).json({ ...post, isSaved: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async addPost(req, res) {
    const body = req.body;
    const tokenUserId = req.userId;

    try {
      const newPost = await prisma.post.create({
        data: {
          ...body.postData,
          userId: tokenUserId,
          postDetail: {
            create: body.postDetail,
          },
        },
      });

      res.status(200).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updatePost(req, res) {
    try {
      const posts = await prisma.post.findMany();

      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deletePost(req, res) {
    const { id } = req.params;
    const tokenUserId = req.userId;

    try {
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });

      if (post.userId !== tokenUserId) {
        return res.status(403).json({ message: "Unauthorized!" });
      }

      await prisma.post.delete({
        where: {
          id,
        },
      });

      res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default Controller;
