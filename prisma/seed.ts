import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: { name: "admin" },
    create: { name: "admin" },
  });

  const studentRole = await prisma.role.upsert({
    where: { name: "student" },
    update: { name: "student" },
    create: { name: "student" },
  });

  const teacherRole = await prisma.role.upsert({
    where: { name: "teacher" },
    update: { name: "teacher" },
    create: { name: "teacher" },
  });

  const adminProfile = await prisma.profile.upsert({
    where: {
      email: "root.eureka@gmail.com",
    },
    update: {
      name: "Bean Noodle",
      email: "root.eureka@gmail.com",
      phone: "09250967085",
      updated_at: new Date(),
    },
    create: {
      name: "Bean Noodle",
      email: "root.eureka@gmail.com",
      phone: "09250967085",
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { id: 1 },
    update: {
      username: "admin",
      password: await hash("nilar", 10),
      role_id: adminRole.id,
      profile_id: adminProfile.id,
    },
    create: {
      username: "admin",
      password: await hash("nilar", 10),
      role_id: adminRole.id,
      profile_id: adminProfile.id,
    },
  });

  console.log({
    adminRole,
    studentRole,
    teacherRole,
    adminUser,
    adminProfile,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
