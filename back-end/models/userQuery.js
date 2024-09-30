const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUSerById = async(id) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: +id
            },
            select:{
                id:true,
                name: true,
                profilePic: true,
                email: true,
            }
        })
        if(user) {
            return{
                success: true,
                user
            }
        }
        return{
            success: false,
            message: "user not found"
        }
    } catch (error) {
        console.error(error)
        return{
            success: false,
            message: "system error",
            error: error
        }
    }
}



module.exports = {
    getUSerById
}