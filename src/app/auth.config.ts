import { DefaultSession, type NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { matchOTP } from "@/utils/OTP/matchOTP";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roleId: number;
    } & DefaultSession["user"];
  }


  interface User {
    id: string;
    email: string;
    roleId: number;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    email: string;
    roleId: number;
  }
}


export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const email = String(credentials?.email);
        const otp = String(credentials?.password);

        if (!email || !otp) {
          throw new Error("Existen datos faltantes para autorizar.");
        }

        const userExists = await prisma.user.findUnique({
          where: {
            email: email,
            deactived: false
          },
          select: {
            id: true,
            email: true,
            roleID: true,
          },
        });

        if (!userExists) {
          throw new Error("Usuario no encontrado en la base de datos.");
        }

        if (!userExists.email) {
          throw new Error("Usuario no tiene correo.")
        }

        if (!userExists.roleID) {
          throw new Error("Usuario no tiene rol.")
        }

        const result = await matchOTP(userExists.id, otp)

        if (!result.success) {
          throw new Error(`${result.error}`);
        }

        return {
          id: String(userExists.id),
          email: userExists.email,
          roleId: userExists.roleID,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roleId = user.roleId;
      }
      return token;
    },
    async session({ session, token }) {
  
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.roleId = token.roleId as number;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
