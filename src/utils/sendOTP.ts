"use server";

import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "@getbrevo/brevo";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

import { GenerateOTP } from "@/utils/generateOTP";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * createOTP creates a cookie that saves userId, used in development
 * @param userEmail<sting> Email of the user to receive OTP for authentification
 * @returns @see ServerActionResponse
 */
export async function sendOTP(
  userEmail: string
): Promise<ServerActionResponse> {
  try {
    const apiInstance = new TransactionalEmailsApi();
    apiInstance.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY as string
    );

    const otp = GenerateOTP();
    const duration = 3;
    const sendSmtpEmail = new SendSmtpEmail();

    sendSmtpEmail.subject = "Tu código OTP ha sido recibido";
    sendSmtpEmail.to = [{ email: userEmail, name: "RECEIVER" }];

    sendSmtpEmail.htmlContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <title></title>
            </head>
            <body aria-disabled="false">

                <h1 data-olk-copy-source="MessageBody" style="font-size: 1.5rem; color: rgb(36, 36, 36); font-family: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;" id="isPasted">Utiliza el código para verificarte en <span style="color: rgb(2, 59, 114);">Conectando+</span><span style="border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-weight: 400; font-stretch: inherit; font-size: 15px; line-height: inherit; font-family: &quot;Segoe UI&quot;, &quot;Segoe UI Web (West European)&quot;, -apple-system, BlinkMacSystemFont, Roboto, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-size-adjust: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; margin: 0px; padding: 0px; vertical-align: baseline; color: rgb(36, 36, 36); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></span></h1>

                <h1 data-olk-copy-source="MessageBody" style="font-size: 1.5rem; color: rgb(36, 36, 36); font-family: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-weight: 400; font-stretch: inherit; font-size: 15px; line-height: inherit; font-family: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif; font-optical-sizing: inherit; font-size-adjust: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; margin: 0px; padding: 0px; vertical-align: baseline; color: rgb(36, 36, 36); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Este código expirará en ${duration} minutos</span><span style="color: rgb(36, 36, 36); font-family: &quot;Segoe UI&quot;, &quot;Segoe UI Web (West European)&quot;, -apple-system, BlinkMacSystemFont, Roboto, &quot;Helvetica Neue&quot;, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"></span></h1>

                <p style="font-size: 1.2rem; color: rgb(36, 36, 36); font-family: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 24px;">Tu código OTP es:&nbsp;</span><span class="x_otp" style="border: 0px; font: inherit; margin: 0px; padding: 0px; vertical-align: baseline; color: rgb(234, 160, 1);"><strong><span style="font-size: 24px;">${otp}</span></strong></span></p>

                <p style="font-size: 1.2rem; color: rgb(36, 36, 36); font-family: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
                    <br>
                </p>

                <p>
                    <img src="https://img.mailinblue.com/8322763/images/content_library/original/682bfcd6116e5de95930437d.png" alt="Content Library Image" style="width: 477px; display: block; vertical-align: top; margin: 5px auto; max-width: calc(100% - 10px); text-align: center;"></p>

                <p>
                    <br>
                </p>
            </body>
        </html>
    `;

    //#region Sender Name
    sendSmtpEmail.sender = {
      email: process.env.SENDER_EMAIL as string,
      name: "SISTEMA DE VERIFICACIÓN DE CONECTANDO+",
    };
    //#endregion

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    const hashedOTP = await bcrypt.hash(String(otp), 10);

    // ! Delete all past otps
    await prisma.userOtp.deleteMany({
      where: {
        user: {
          email: userEmail,
        },
      },
    });

    await prisma.userOtp.create({
      data: {
        user: {
          connect: {
            email: userEmail,
          },
        },
        otp: hashedOTP,
        expiresAt: new Date(Date.now() + duration * 60 * 1000),
      },
    });

    return { success: true, message: "OTP Enviado exitosamente" };
  } catch (error) {
    console.log(`Error when sending OTP: ${(error as Error).message}`);
    return { success: false, error: `${(error as Error).message}` };
  }
}
