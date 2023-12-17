// controllers/users/users.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    try {
        const { email, name, age, batch, paymentmonth } = req.body;

        if (!email || !name || !age || !batch) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

        const checkIfUserExists = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!checkIfUserExists) {
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    age: age,
                    batch: batch,
                },
            });

            const newPayment = await prisma.payment.create({
                data: {
                  amount: 500,
                  userId: newUser.email,
                  paymentmonth: paymentmonth
                },
              });
              

            const paymentResult = {
                status: 'success',
                message: 'Payment successful',
            };

            return res
                .status(200)
                .send({ user: newUser, payment: newPayment, paymentResult });
        } else {
            const updatedUser = await prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    batch: batch,
                },
            });

            return res.status(200).send({ user: updatedUser, paymentResult: updatedUser.batch });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = createUser;
