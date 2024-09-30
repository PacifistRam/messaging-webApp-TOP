const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// create message between user

const createMessage = async(content, senderId, receiverId, ) => {
    try {
        const newMessage = await prisma.message.create({
            data: {
                content:content,
                sender: {
                    connect: { id: senderId }
                },
                receiver: {
                    connect: { id: receiverId }
                }
            }
        })
        if(newMessage){
            return{
                success: true,
                message: newMessage
            }
        }
        return{
            success: false,
            message: "message not sent"
        }
    } catch (error) {
        console.error(error.message)
        return{
            success: false,
            message: "system Error",
            error: error
        }
    }
}


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
  
  // conversation between two user's
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
  

//   get message by id
  const getMessageById = async (msgId) =>{
    try {
        const messageFound = await prisma.message.findUnique({
            where: {
                id: +msgId
            }
        }) 
        if(messageFound){
            return{
                success: true,
                data: messageFound 
            }
        }
        return{
            success: false,
            message: "no message found"
        }
    } catch (error) {
        console.error("database error: ", error);
      return {
        success: false,
        message: "database error in getting user",
        error: error.message,
      };
    }
  }
  //   delete message by msgId

const deleteMsgByMsgId = async (msgId) => {
    try {
        const deleteMsg = await prisma.message.delete({
            where:{
                id: +msgId
            }
        })
        if(deleteMsg){
            return{
                success: true,
                data: deleteMsg
            }
        }
        return {
            success: false,
            message: "error deleting message"
        }
    } catch (error) {   
        console.error(error.message)
        return{
            success: false,
            message: "System error please try again later",
            error: error.message
        }
    }
} 

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










module.exports ={
    createMessage,
    msgsBetweenUsers,
    getUsersConversedByUserId
}