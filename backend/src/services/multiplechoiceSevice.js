import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createMultipleChoiceService = async (testId, questions) => {
    console.log("testId:", testId);
    console.log("questions:", questions);
    
    const multipleChoices = await Promise.all(
        questions.map(async (question) => {
            const multiplechoice = await prisma.multiplechoice.create({
                data: {
                    testId: testId,
                    question: question.question,
                    number: question.number,
                    questionPhoto: question.questionPhoto || null,  // Bisa opsional
                    weight: question.weight,
                    discussion: question.discussion || "",  // Bisa opsional
                    option: {
                        create: question.options.map((option) => ({
                            optionDescription: option.optionDescription,
                            isCorrect: option.isCorrect,
                        })),
                    },
                },
                include: {
                    option: true, // Include related options in the result
                },
            });
            return multiplechoice;
        })
    );

    return multipleChoices;
};

export { createMultipleChoiceService }; 

const updateMultipleChoiceService = async (questionId, updatedData) => {
    const { question, number, questionPhoto, weight, discussion, options } = updatedData;

    const updateMultipleChoice = await prisma.multiplechoice.update({
        where: {id: questionId},
        data: {
            question,
            number,
            questionPhoto,
            weight,
            discussion,
        },
    });

    if (options && options.length > 0) {
        await Promise.all(
            options.map(async (option) => {
                if (option.id) {
                    await prisma.option.update({
                        where: { id: option.id },
                        data: {
                            optionDescription: option.optionDescription,
                            isCorrect: option.isCorrect,
                        },
                    });
                } else {
                    await prisma.option.create({
                        data: {
                            multiplechoiceId: questionId,
                            optionDescription: option.optionDescription,
                            isCorrect: option.isCorrect,
                        },
                    });
                }
            })
        );
    }

    return updateMultipleChoice;
};

export { updateMultipleChoiceService };

const getMultipleChoiceService = async (testId) => {
    const multipleChoices = await prisma.multiplechoice.findMany({
        where: {
            testId: testId,
        },
        include: {
            option: true, 
        },
    });
    
    return multipleChoices;
};

export { getMultipleChoiceService };

const getMultipleChoiceByIdService = async (number) => {
    const multipleChoice = await prisma.multiplechoice.findUnique({
        where: {
            number: number,  
        },
        include: {
            option: true,  // Sertakan opsi jawaban
        },
    });
    
    return multipleChoice;
};

export { getMultipleChoiceByIdService };

const deleteMultipleChoiceService = async (multiplechoiceId) => {
    const deletedQuestion = await prisma.multiplechoice.delete({
        where: {
            id: multiplechoiceId, 
        },
    });
    return deletedQuestion;
};

export { deleteMultipleChoiceService };