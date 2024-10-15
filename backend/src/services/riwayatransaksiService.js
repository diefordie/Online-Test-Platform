import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const prismaClient = new PrismaClient();
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export const getTransactions = async (userId) => {
  return await prisma.transaction.findMany({
    where: { test: { authorId: userId } },
    include: {
      test: {
        select: {
          title: true,
          price: true,
          similarity: true,
          author: {
            select: {
              name: true 
            }
          }
        }
      }
    }
  });
};