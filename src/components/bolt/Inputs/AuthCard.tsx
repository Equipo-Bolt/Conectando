"use client"

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

import LoginForm from "@/components/bolt/Inputs/LoginForm"
import OtpForm from "@/components/bolt/Inputs/OtpForm"

// React and Next.js
import Image from "next/image";
import { useState } from "react";

// Assets
import GemsoStacked from "@/../../public/Login-GEMSO.png";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

// ! For nextAuth implementation, Backend needs email related to otp
export default function AuthCard() {
    const [currentPage, setCurrentPage] = useState("otp");

    return (
    <Card className="md:w-1/3 w-1/2 flex flex-col items-center justify-center p-[2rem]">
        <CardHeader className="w-full text-center">
            <Image
                src={GemsoStacked}
                alt="Gemso Logo"
                width={200}
                className="mx-auto mb-4"
            />
            <CardDescription>Ingresa los datos solicitados <br/>para acceder a CONECTANDO+</CardDescription>
        </CardHeader>
        <CardContent className="w-full flex flex-col">
            {currentPage === "login" && (
                <LoginForm />
            )}
            {currentPage === "otp" && (
                <OtpForm />
            )}
        </CardContent>
        {currentPage === "otp" && (
            <div className="flex items-center justify-center mt-4">
                <ArrowLeftIcon className="h-5 w-5 text-gray-500 mr-2" />
                <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setCurrentPage("login")}
                >
                    Volver a inicio de sesión
                </button>
            </div>
        )}

    </Card>
    )
}