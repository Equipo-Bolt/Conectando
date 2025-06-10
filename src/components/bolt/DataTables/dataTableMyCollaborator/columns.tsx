"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TypeMyColaborator } from "@/types/MyColaborator";

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
// import { setCustomCookieAction } from "@/app/actions/cookies/setCustomCookie";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<TypeMyColaborator>[] = [
  {
    accessorKey: "user",
    header: "Colaborador",
    size: 100,
    cell: ({ row }) => {
      const userName = row.original.user.fullName;
      if (!userName) {
        return <span className="text-gray-500">Sin Nombre</span>;
      }
      const shortenedName = userName.length > 30 ? `${userName.slice(0, 30)}...` : userName;
      return <span>{shortenedName}</span>;
    },
  },
  {
    accessorKey: "progress",
    header: "Estado de Objetivos",
    size: 100,
    cell: ({ row }) => {
      const formState = row.original.progress.title;
      return (
        <div className="flex items-center">
          <span className="ml-2">{formState}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "form",
    header: "Ir a Propuesta",
    size: 100,
    cell: ({ row }) => {
      const userId = row.original.user.id;

      return (
        <div className="flex">
          <button>
            <Link href={`/misColaboradores/${userId}`}>
              <ArrowRightEndOnRectangleIcon className="w-5 h-5 text-gemso-blue" />
            </Link>
          </button>
        </div>
      );
    },
  },
];
