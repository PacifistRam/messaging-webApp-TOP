const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// get user by email
const getAllUserDetails = async () => {
  try {
    const users = await prisma.user.findMany({});
    if (users.length > 0) {
      return {
        success: true,
        data: users,
      };
    }
    return {
      success: false,
      message: "no users found",
    };
  } catch (error) {
    console.error("database error: ", error);
    return {
      success: false,
      message: "database error in getting user",
      error: error.message,
    };
  }
};

const getAllUserDetailsAndMsgs = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        messagesSent: true,
        messagesReceived: true,
      },
    });
    if (users.length > 0) {
      return {
        success: true,
        data: users,
      };
    }
    return {
      success: false,
      message: "no users found",
    };
  } catch (error) {
    console.error("database error: ", error);
    return {
      success: false,
      message: "database error in getting user",
      error: error.message,
    };
  }
};

const msgsBetweenUsers = async (senderId, receiverId) => {
  try {
    const conversation = await prisma.message.findMany({
      orderBy: {
        timeStamp: "desc",
      },
      where: {
        OR: [
          {
            AND: [{ senderId: +senderId }, { receiverId: +receiverId }],
          },
          {
            AND: [{ senderId: +receiverId }, { receiverId: +senderId }],
          },
        ],
      },
    });
    if (conversation.length > 0) {
      return {
        success: true,
        data: conversation,
      };
    } else if (conversation.length === 0)
      return {
        success: true,
        data: conversation,
        message: "no conversation found",
      };
  } catch (error) {
    console.error("database error: ", error);
    return {
      success: false,
      message: "database error in getting user",
      error: error.message,
    };
  }
};

// get all messages sent or received by user
const getAllMsgsByUserId = async (userId) => {
  try {
    const msgsForUser = await prisma.message.findMany({
      orderBy: {
        timeStamp: "desc",
      },
      where: {
        OR: [{ senderId: +userId }, { receiverId: +userId }],
      },
      select: {
        id: true,
        content: true,
        receiver: {
          select: {
            id: true,
            name: true,
          },
        },
        sender: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (msgsForUser.length < 0) {
      return {
        success: true,
        data: msgsForUser,
      };
    }
    return {
      success: true,
      status: "no messages",
      data: msgsForUser,
    };
  } catch (error) {
    console.error(error.message);
    return {
      success: false,
      message: "database error",
      error: error.message,
    };
  }
};

// get all users whome current current user has sent or received message

const getUsersConversedByUserId = async (userId) => {
  try {
    const users = await prisma.user.findMany({
      // orderBy:{
      // messagesSent:{
      //   timeStamp: true
      // }
      // },
      where: {
        OR: [
          {
            messagesSent: {
              some: {
                receiverId: +userId,
              },
            },
            messagesReceived: {
              some: {
                senderId: +userId,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        profilePic: true,
      },
      orderBy:{
        name: 'asc'
      }
    });
    if (users.length > 0) {
      return {
        success: true,
        data: users,
      };
    }
    return {
      success: true,
      data: users,
      status: "No conversed user found",
    };
  } catch (error) {
    console.error(error.message);
    return {
      success: false,
      message: "database error",
      error: error.message,
    };
  }
};

module.exports = {
  getAllUserDetails,
  getAllUserDetailsAndMsgs,
  msgsBetweenUsers,
  getAllMsgsByUserId,
  getUsersConversedByUserId,
};
