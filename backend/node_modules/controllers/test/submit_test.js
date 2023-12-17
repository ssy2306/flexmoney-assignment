const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const test1 = async (req, res) => {
    const user_id = req.body.user_id;
    const test_id = req.body.test_id;
    const question_id = req.body.question_id;
    const answer_id = req.body.answer_id;

    //display function declared
    async function display() {
        const display = await prisma.question.findMany({
            where: {
                fk_test_id: test_id,
                pk_question_id: { in: question_id },
            },
            include: {
                answer: true
            },
        })

        display.forEach((question) => {
            console.log('Question:', question.question);
            console.log('Answers:');
            question.answer.forEach((answer) => {
                console.log('- ', answer.answer);
            });
            console.log('-----------------');
        });
    }

    try {
        if (!(await prisma.user_score.findFirst({
            where: { fk_user_id: user_id, test_id: test_id }
        }))) {

            //for displaying the question into the terminal file
            display();

            question_id.forEach(async (questionId, index) => {
                var submit = await prisma.test_response.create({
                    data: {
                        fk_question_id: questionId,
                        fk_user_id: user_id,
                        user_answer_id: answer_id[index]
                    }
                    
                });
                console.log(submit);
            });
            // after submission now checking it with the answer key table i.e map_question_answer
            
            let counter = 0;

            for (let i = 0; i < question_id.length; i++) {
              const questionId = question_id[i];
              const answerId = answer_id[i];
              console.log(questionId, answerId);
            
              const check_answer = await prisma.map_question_answer.findFirst({
                where: {
                  fk_question_id: questionId,
                  fk_answer_id: answerId
                }
              });
            
              if (check_answer) {
                counter++;
              }
            }
            console.log('Counter:', counter);
            
// now storing this into the score table
            let score = (counter/2)*100;
            await prisma.user_score.create({
                data: {
                    fk_user_id: user_id,
                    score: score,
                    test_id: test_id
                }
            });

            //for result score card display
            const result_user_id = await prisma.user_score.findFirst({
                where:{
                    fk_user_id: user_id
                },
                select:{
                    fk_user_id: true
                }
            })
            const result = await prisma.user_score.findMany({
                where:{
                    fk_user_id: user_id
                }, select: {
                    score:true,
                    test_id: true
                }
            })
            res.status(200)
            .send({success: true, message: "Test Submitted", user_id: result_user_id, Test_Result : result});

        } else {
            res
                .status(200)
                .send({ success: false, message: "You cannot appear this test again" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Couln't submit error ocurred",
            data: err,
        });

    } finally {
        await prisma.$disconnect();
    }
}

module.exports = test1;