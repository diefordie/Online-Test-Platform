import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Ambil author yang sudah ada dari database
  const author1 = await prisma.author.findFirst({
    where: { name: 'Abellia' },
  });

  const author2 = await prisma.author.findFirst({
    where: { name: 'Ardhi' },
  });

  const user1 = await prisma.user.findFirst({
    where: { name: 'John Doe' },
  });

  // Tambahkan 10 data test dengan berbagai kategori
  const tests = await prisma.test.createMany({
    data: [
      {
        authorId: author1.id,
        userId: user1.id,
        category: 'CPNS',
        title: 'CPNS Test 2',
        testDescription: 'Latihan soal CPNS terbaru',
        price: 120.0,
        similarity: 0.85,
        worktime: 120,
        review: 'Soal yang lengkap dan sesuai kisi-kisi',
      },
      {
        authorId: author1.id,
        userId: user1.id,
        category: 'Pemrograman',
        title: 'Pemrograman Test 2',
        testDescription: 'Soal pemrograman tingkat lanjut',
        price: 200.0,
        similarity: 0.9,
        worktime: 90,
        review: 'Tantangan yang seru untuk programmer berpengalaman',
      },
      {
        authorId: author1.id,
        userId: user1.id,
        category: 'Psikotes',
        title: 'Psikotes Test 2',
        testDescription: 'Tes psikologi untuk karir',
        price: 100.0,
        similarity: 0.75,
        worktime: 70,
        review: 'Membantu memahami diri sendiri lebih dalam',
      },
      {
        authorId: author2.id,
        userId: user1.id,
        category: 'Bahasa Inggris',
        title: 'Bahasa Inggris Test 1',
        testDescription: 'Soal bahasa Inggris untuk pemula',
        price: 50.0,
        similarity: 0.7,
        worktime: 60,
        review: 'Latihan yang bagus untuk pemula',
      },
      {
        authorId: author2.id,
        userId: user1.id,
        category: 'Bahasa Inggris',
        title: 'Bahasa Inggris Test 2',
        testDescription: 'Latihan soal intermediate bahasa Inggris',
        price: 80.0,
        similarity: 0.8,
        worktime: 75,
        review: 'Tingkat menengah, cocok untuk mereka yang ingin menguji skill',
      },
      {
        authorId: author2.id,
        userId: user1.id,
        category: 'Matematika',
        title: 'Matematika Test 1',
        testDescription: 'Soal matematika dasar',
        price: 100.0,
        similarity: 0.9,
        worktime: 90,
        review: 'Latihan yang cocok untuk siswa sekolah menengah',
      },
      {
        authorId: author2.id,
        userId: user1.id,
        category: 'Matematika',
        title: 'Matematika Test 2',
        testDescription: 'Soal matematika lanjutan',
        price: 150.0,
        similarity: 0.85,
        worktime: 100,
        review: 'Bagus untuk persiapan ujian universitas',
      },
      {
        authorId: author2.id,
        userId: user1.id,
        category: 'Biologi',
        title: 'Biologi Test 1',
        testDescription: 'Tes biologi dasar',
        price: 70.0,
        similarity: 0.75,
        worktime: 60,
        review: 'Mudah dipahami dan cocok untuk siswa sekolah',
      },
      {
        authorId: author1.id,
        userId: user1.id,
        category: 'Fisika',
        title: 'Fisika Test 1',
        testDescription: 'Soal fisika tingkat dasar',
        price: 90.0,
        similarity: 0.8,
        worktime: 80,
        review: 'Membantu memahami konsep-konsep dasar fisika',
      },
      {
        authorId: author1.id,
        userId: user1.id,
        category: 'Kimia',
        title: 'Kimia Test 1',
        testDescription: 'Soal kimia untuk pemula',
        price: 85.0,
        similarity: 0.7,
        worktime: 85,
        review: 'Sesuai untuk latihan sebelum ujian',
      },
    ],
  });

  console.log('10 data test baru berhasil ditambahkan!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
