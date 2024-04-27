import prisma from "../libs/prisma.js";

class Controller {
  static async addMessage(req, res) {
    const tokenUserId = req.userId;
    const { chatId } = req.params;
    const { text } = req.body;

    try {
      const chat = await prisma.chat.findUnique({
        where: {
          id: chatId,
          userIDs: {
            hasSome: [tokenUserId],
          },
        },
      });

      if (!chat) return res.status(404).json({ message: "Chat not found" });

      const message = await prisma.message.create({
        data: {
          text,
          chatId,
          userId: tokenUserId,
        },
      });

      await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          seenBy: [tokenUserId],
          lastMessage: text,
        },
      });

      res.status(200).json(message);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default Controller;
