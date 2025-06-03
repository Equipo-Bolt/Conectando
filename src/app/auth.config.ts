import { DefaultSession, type NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { matchOTP } from "@/utils/OTP/matchOTP";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roleID: number;
    } & DefaultSession["user"];
  }


  interface User {
    id: string;
    email: string;
    roleID: number;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    email: string;
    roleID: number;
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
            deactivated: false
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
          roleID: userExists.roleID,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roleID = user.roleID;
      }
      return token;
    },
    async session({ session, token }) {
  
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.roleID = token.roleID as number;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
