const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { verifyToken } = require('../../auth/jsonwebtoken/jwt');
const editPhoneNumber = async (req, res) => {

    const email = req.body.email || req.session.user.email;
    const phone_number = req.body.phone_number;
    try {

        if (!email && !token) {
            res.status(401).send({
                success: false,
                message: "Token Expired try logging in"
            });
            return;
        }

        const user = await prisma.lu_user.update({
            where: {
                email: email
            },
            data: {
                phone_number: phone_number
            }
        });

        res.status(200).send({
            success: true,
            message: "Phone Number added/ updated Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal error ",
            data: error,
        });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = editPhoneNumber;
