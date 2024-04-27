import prisma from "../libs/prisma.js";

class Controller {
  static async getChats(req, res) {
    const tokenUsrId = req.userId;

    try {
      const chats = await prisma.chat.findMany({
        where: {
          userIDs: {
            hasSome: [tokenUsrId],
          },
        },
      });

      res.status(200).json(chats);

      console.log(chats, "<----dichatcontroller");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getChatById(req, res) {
    const tokenUsrId = req.userId;
    const { id } = req.params;

    try {
      const chat = await prisma.chat.findUnique({
        where: {
          id,
          userIDs: {
            hasSome: [tokenUsrId],
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      await prisma.chat.update({
        where: { id },
        data: {
          seenBy: {
            push: [tokenUsrId],
          },
        },
      });
      res.status(200).json(chat);

      console.log(chat, "<----dichatcontroller");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async addChat(req, res) {
    const tokenUsrId = req.userId;

    try {
      const newChat = await prisma.chat.create({
        data: {
          userIDs: [tokenUsrId, req.body.receiverId],
        },
      });

      res.status(200).json(newChat);

      console.log(newChat, "<----dichatcontroller");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async readChat(req, res) {
    const { id } = req.params;
    const tokenUsrId = req.userId;

    try {
      const chat = await prisma.chat.update({
        where: {
          id,
        },
        data: {
          seenBy: {
            set: [tokenUsrId],
          },
        },
      });

      res.status(200).json(chat);

      console.log(newChat, "<----dichatcontroller");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default Controller;
