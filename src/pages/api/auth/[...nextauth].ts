import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcrypt";
import prisma from "@/lib/prisma";

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
        const user = await prisma.user.findFirst({
          where: { username },
          select: {
            id: true,
            username: true,
            password: true,
            profile: true,
            role: true,
            profile_id: false,
            role_id: false,
          },
        });

        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }

        const { role, profile } = user;
        return {
          username,
          role,
          profile,
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
