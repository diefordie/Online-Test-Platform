// src/services/dashboardServices.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to get test details with access count and author details
const getTestDetailsWithAccessCountAndAuthor = async (testIds) => {
  const tests = await prisma.test.findMany({
    where: {
      id: { in: testIds },
    },
    include: {
      history: true, // Include history to get access counts
      author: {
        select: {
          name: true,
          authorPhoto: true,
        },
      },
    },
  });

  // Mapping to include access count and format author details
  const testsWithDetails = tests.map(test => ({
    ...test,
    accessCount: test.history.length, // Number of times this test has been accessed
    author: {
      name: test.author.name,
      foto: test.author.authorPhoto,
    },
  }));

  return testsWithDetails;
};

// Get 4 most popular tests based on history
export const getPopularTestsService = async () => {
  const popularTests = await prisma.history.groupBy({
    by: ['testId'],
    _count: {
      testId: true,
    },
    orderBy: {
      _count: {
        testId: 'desc',
      },
    },
    take: 4, // Adjusted to return 4 as per your original requirement
  });

  const testIds = popularTests.map((test) => test.testId);
  return await getTestDetailsWithAccessCountAndAuthor(testIds);
};

// Get 4 free tests (price 0)
export const getFreeTestsService = async () => {
  const freeTests = await prisma.history.groupBy({
    by: ['testId'],
    _count: {
      testId: true,
    },
    where: {
      test: {
        price: 0, // Only include free tests
      },
    },
    orderBy: {
      _count: {
        testId: 'desc',
      },
    },
    take: 4, // Adjusted to return 4 as per your original requirement
  });

  const testIds = freeTests.map((test) => test.testId);
  return await getTestDetailsWithAccessCountAndAuthor(testIds);
};

// Search tests by title
export const searchTestsByTitleService = async (title) => {
  const tests = await prisma.test.findMany({
    where: {
      title: { contains: title, mode: 'insensitive' },
    },
    include: {
      history: true, // Include history to get access counts
      author: {
        select: {
          name: true,
          authorPhoto: true,
        },
      },
    },
  });

  // Mapping to include access count and format author details
  const testsWithDetails = tests.map(test => ({
    ...test,
    accessCount: test.history.length, // Number of times this test has been accessed
    author: {
      name: test.author.name,
      foto: test.author.authorPhoto,
    },
  }));

  return testsWithDetails;
};

// Get tests by category
export const getTestsByCategoryService = async (category) => {
  return await prisma.test.findMany({
    where: { category },
    include: {
      history: true,
      author: {
        select: {
          name: true,
          authorPhoto: true,
        },
      },
    },
  });
};

// Get 4 most popular tests within a category
export const getPopularTestsByCategoryService = async (category) => {
  const popularTests = await prisma.history.groupBy({
    by: ['testId'],
    _count: {
      testId: true,
    },
    where: {
      test: { category: category },
    },
    orderBy: {
      _count: { testId: 'desc' },
    },
    take: 4, // Adjusted to return 4 as per your original requirement
  });

  const testIds = popularTests.map((test) => test.testId);
  return await getTestDetailsWithAccessCountAndAuthor(testIds);
};

// Get 4 free tests within a category
export const getFreeTestsByCategoryService = async (category) => {
  const freeTestAccessCount = await prisma.history.groupBy({
    by: ['testId'],
    _count: {
      testId: true,
    },
    where: {
      test: {
        category: category,
        price: 0, // Only include free tests
      },
    },
    orderBy: {
      _count: {
        testId: 'desc',
      },
    },
    take: 4, // Adjusted to return 4 as per your original requirement
  });

  const testIds = freeTestAccessCount.map((test) => test.testId);
  return await getTestDetailsWithAccessCountAndAuthor(testIds);
};
