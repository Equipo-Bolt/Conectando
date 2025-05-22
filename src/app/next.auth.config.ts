import { prisma } from "@/lib/prisma";

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { loginSchema } from "../lib/formSchemas/loginSchema";
import { sendOTP } from "../utils/sendOTP";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {

        const { email } = credentials ?? {};
        const { data, success } = loginSchema.safeParse({ email });

        if (!success) {
          throw new Error("Credenciales Invalidas");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
          select: {
            email : true
          }
        });

        if (!user || !user.email) {
          throw new Error("Data faltante para autorizar");
        }

        await sendOTP(user.email);

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
