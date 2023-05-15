import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcrypt";
import prisma from "@/lib/prisma";
import clientPromise from "@/lib/mongodb";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials, _) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        if (!username || !password) {
          throw new Error("Missing username or password");
        }

        const client = await clientPromise;
        const col = client.db("eureka-school").collection("users");
        const user = (
          await col
            .aggregate([
              {
                $match: { username },
              },
              {
                $lookup: {
                  from: "roles",
                  localField: "roleId",
                  foreignField: "_id",
                  as: "role",
                },
              },
              {
                $addFields: {
                  role: {
                    $arrayElemAt: ["$role", 0],
                  },
                },
              },
              {
                $project: {
                  username: 1,
                  password: 1,
                  role: 1,
                },
              },
              { $limit: 1 },
            ])
            .toArray()
        )[0];

        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }

        const { role } = user;

        return {
          username,
          role,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      return { ...session, user: token.user } as Session;
    },
  },
});
