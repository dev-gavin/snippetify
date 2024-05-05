import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    async function seedUsers(userCount) {
        const users = [];
        for (let i = 0; i < userCount; i++) {
            const username = `user${i + 1}`;
            const password = `password${i + 1}`;

            users.push({ username, password });
        }

        try {
            await prisma.user.createMany({
                data: users,
            });
            console.log(`${userCount} users created successfully!`);
        } catch (error) {
            console.error("Error seeding users:", error);
        }
    }

    seedUsers(50).catch((error) => {
        console.error("Unhandled error in seeding:", error);
        process.exit(1); // Exit process with an error code if seeding fails
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
