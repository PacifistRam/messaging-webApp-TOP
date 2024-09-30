const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// get user by email
const getUserByEmail = async(email) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
        })
        if(user) {
            return{
                success: true,
                data: user
            }
        }
        return {
            success: false,
            message: "User with this email not found"
        }
    } catch (error) {
        console.error("database error: ", error)
        return{
            success: false,
            message: "database error in getting user",
            error: error.message
        }
    }
}

// create new user
const createUser = async(name, profilePic, email, password,) => {
    try {
        const newUser = await prisma.user.create({
            data:{
                name: name,
                email: email,
                profilePic: profilePic,
                password: password
            }
        })
        if(newUser) {
            return{
                success: true,
                data: newUser
            }
        }
        return{
            success: false,
            message: "Error in creating new user"
        }
    } catch (error) {
        console.error("Database error: ", error.message)
        return{
            success: false,
            message: "database error while creating new user",
            error: error.message
          }
    }
}




module.exports = {
    getUserByEmail,
    createUser
}