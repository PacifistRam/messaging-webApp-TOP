const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUSerById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        name: true,
        profilePic: true,
        email: true,
      },
    });
    if (user) {
      return {
        success: true,
        user,
      };
    }
    return {
      success: false,
      message: "user not found",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "system error",
      error: error,
    };
  }
};

const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        profilePic: true,
      },
    });
    if (users) {
      return {
        success: true,
        message: users.length < 0 ? "no users found." : "Users retrieved successfully. ",
        data: users
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error.message || "error in getting users",
    };
  }
};

module.exports = {
  getUSerById,
  getAllUsers,
};
