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
    const [currentPage, setCurrentPage] = useState("login");
    const [email, setEmail] = useState("");

    return (
    <Card className="md:w-1/3 w-2/3 flex flex-col items-center justify-center p-[2rem]">        
        {currentPage === "otp" && (
            <div className="flex flex-row items-center justify-start w-full ">
                <button
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => setCurrentPage("login")}
                >                
                    <ArrowLeftIcon className="h-5 w-5 text-gray-500 mr-2" />
                </button>
            </div>
        )}
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
                <LoginForm
                    onValueChange={(email: string) => {
                        setEmail(email);
                        setCurrentPage("otp");
                    }}
                />
            )}
            {currentPage === "otp" && (
                <OtpForm propEmail={email}/>
            )}
            {(currentPage !== "otp" && currentPage !== "login") && (
                <div className="flex items-center justify-center mt-4">
                    error
                </div>
            )}
        </CardContent>
    </Card>
    )
}