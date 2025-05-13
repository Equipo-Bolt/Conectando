"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TypeMyColaborator } from "@/types/TypeMyColaborator";

import {ArrowRightEndOnRectangleIcon} from "@heroicons/react/24/outline";
import { setCustomCookieAction } from "@/app/actions/cookies/setCustomCookie";

export const columns: ColumnDef<TypeMyColaborator>[] = [
  {
    accessorKey: "user",
    header: "Colaborador",
    size: 100,
    cell: ({ row }) => {
      const userName = row.original.user.fullName;
      return <span>{userName}</span>;
    },
  },
  {
    accessorKey: "progress",
    header: "Estado",
    size: 100,
    cell: ({ row }) => {
      const formState = row.original.progress.title;
      return (
        <div className="flex items-center">
          <span className="ml-2">{formState}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "form",
    header: "Ir a Propuesta",
    size: 100,
    cell: ({ row }) => {
      const userId = row.original.user.id;

      return (
        <div className="flex items-center">
          <a href={`/misColaboradores/${userId}`}>
            <ArrowRightEndOnRectangleIcon onClick={() => { setTimeout(() => setCustomCookieAction("collaboratorId", String(userId)), 3000); }} className="w-5 h-5 text-gemso-blue" />
          </a>
        </div>
      );
    },
  }
];