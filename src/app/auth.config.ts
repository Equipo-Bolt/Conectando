import { prisma } from "@/lib/prisma";

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
       credentials: {
        email: {},
        password: {}, //! tried to declare otp as credential. did not work
      },
      authorize: async (credentials) => {

        const email = String(credentials?.email);
        const otp = Number(credentials?.password);

        const user = await prisma.user.findUnique({
          where: {
            email: String(email),
          },
          select: {
            email : true,
            roleID: true
          }
        });

        if (!user || !user.email || !otp) {
          throw new Error("Data faltante para aaautorizar");
        }

        //TODO change for real logic
        // Replace this with your actual OTP validation logic
        if (otp !== 111111) {
          throw new Error("Credenciales inválidas")
        }
        
        //! Mandatory, NextAuth must return either null or an user object
        return { id: user.email, email: user.email, role: user.roleID };
      },
    }),
  ],
} satisfies NextAuthConfig;
