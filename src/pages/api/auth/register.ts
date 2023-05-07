import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  // Get data from your database
  switch (method) {
    case "POST":
      const { username, password } = body;
      const exists = await prisma.user.findFirst({
        where: { username: username },
      });
      if (exists) {
        res.status(400).send("User already exists");
      } else {
        const user = await prisma.user.create({
          data: {
            ...body,
            password: await hash(password, 10),
          },
        });
        res.status(200).json(user);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
