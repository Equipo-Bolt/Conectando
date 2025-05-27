import { prisma } from "@/lib/prisma";

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { matchOTP } from "@/utils/OTP/matchOTP";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("Data faltante para autorizar");
        }

        const email = String(credentials.email);
        const otp = String(credentials.password);

        const userExists = await prisma.user.findUnique({
          where: {
            email: email,
          },
          select: {
            id: true,
            email: true,
            roleID: true,
          },
        });

        if (!userExists) {
          throw new Error("Usuario no registrado en Base de Datos");
        }

        const result = await matchOTP(userExists.id, otp)

        if (!result.success) {
          throw new Error(`${result.error}`);
        }

        return {
          id: String(userExists.id),
          email: userExists.email,
          role: userExists.roleID,
        };
      },
    }),
  ],
  callbacks: {
    // ! Just the set up, not final implementation
    async jwt({ token, user }) {
      // * On sign in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // * Pass token values to session
      if (token && session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
