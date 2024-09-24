const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper function to get test details with access count and author details
const getTestDetailsWithAccessCountAndAuthor = async (testIds) => {
  return await prisma.test.findMany({
    where: {
      id: { in: testIds },
    },
    include: {
      history: true, // Include history to get access counts
      author: {
        select: {
          nama: true,
          authorPhoto: true,
        },
      },
    },
  });
};

// Get 5 most popular tests based on history
const getPopularTests = async () => {
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
    take: 5,
  });

  const testIds = popularTests.map((test) => test.testId);
  return await getTestDetailsWithAccessCountAndAuthor(testIds);
};

// Get 5 free tests (price 0)
const getFreeTests = async () => {
  return await prisma.test.findMany({
    where: { price: 0 },
    include: {
      history: true,
      author: {
        select: {
          nama: true,
          authorPhoto: true,
        },
      },
    },
    take: 5,
  });
};

// Search tests by title
const searchTestsByTitle = async (title) => {
  return await prisma.test.findMany({
    where: {
      title: { contains: title, mode: 'insensitive' },
    },
    include: {
      history: true,
      author: {
        select: {
          nama: true,
          authorPhoto: true,
        },
      },
    },
  });
};

// Get tests by category
const getTestsByCategory = async (category) => {
  return await prisma.test.findMany({
    where: { category },
    include: {
      history: true,
      author: {
        select: {
          nama: true,
          authorPhoto: true,
        },
      },
    },
  });
};

// Get 5 most popular tests within a category
const getPopularTestsByCategory = async (category) => {
  const popularTests = await prisma.history.groupBy({
    by: ['testId'],
    _count: {
      testId: true,
    },
    where: {
      test: { category },
    },
    orderBy: {
      _count: { testId: 'desc' },
    },
    take: 5,
  });

  const testIds = popularTests.map((test) => test.testId);
  return await getTestDetailsWithAccessCountAndAuthor(testIds);
};

// Get 5 free tests within a category
const getFreeTestsByCategory = async (category) => {
  return await prisma.test.findMany({
    where: { category, price: 0 },
    include: {
      history: true,
      author: {
        select: {
          nama: true,
          authorPhoto: true,
        },
      },
    },
    take: 5,
  });
};

module.exports = {
  getPopularTests,
  getFreeTests,
  searchTestsByTitle,
  getTestsByCategory,
  getPopularTestsByCategory,
  getFreeTestsByCategory,
};
