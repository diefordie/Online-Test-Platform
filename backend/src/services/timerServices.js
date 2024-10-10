import prisma from '../../prisma/prismaClient.js'; // Prisma client

export async function getWorktimeByTestId(testId) {
  const test = await prisma.test.findUnique({
    where: {
      id: testId,
    },
    select: {
      worktime: true,
    },
  });

  if (!test) {
    throw new Error('Test not found');
  }

  // Menghitung waktu akhir berdasarkan waktu kerja
  const worktimeInSeconds = test.worktime; // Ini diasumsikan dalam detik
  const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
  const endTimeInSeconds = currentTimeInSeconds + worktimeInSeconds; // Waktu akhir

  // Hitung waktu yang tersisa
  const remainingTimeInSeconds = endTimeInSeconds - currentTimeInSeconds;

  if (remainingTimeInSeconds < 0) {
    // Jika waktu telah habis
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  // Menghitung jam, menit, dan detik
  const seconds = Math.floor(remainingTimeInSeconds / 3600);
  const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
  const hours = remainingTimeInSeconds % 60;

  return { hours, minutes, seconds };
}
