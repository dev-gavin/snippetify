import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.createMany({
    data: [
      { username: "Gavin", password: "98787" },
      { username: "Jaons", password: "9872vdsdf" },
      { username: "Kenna", password: "87987" },
    ],
  });
}

try {
  await seed();
  prisma.$disconnect();
} catch (e) {
  console.log(e);
  await prisma.$disconnect();
  process.exit(1);
}
