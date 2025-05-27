"use client";

import { ColumnDef } from "@tanstack/react-table";

import { User } from "@/types/User";

import {ArrowRightEndOnRectangleIcon} from "@heroicons/react/24/outline";
import { setCustomCookieAction } from "@/app/actions/cookies/setCustomCookie";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user",
    header: "Usuarios",
    size: 100,
    cell: ({ row }) => {
      const userName = row.original.fullName;
      return <span>{userName}</span>;
    },
  },
  {
    accessorKey: "divisionID",
    header: "División",
    size: 100,
    cell: ({ row }) => {
      const divisionName = row.original.divisionID;
      return (
        <div className="flex items-center">
          <span className="ml-2">{divisionName}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "businessUnitID",
    header: "Unidad de Negocio",
    size: 100,
    cell: ({ row }) => {
      const businessUnitName = row.original.businessUnitID;
      return (
        <div className="flex items-center">
          <span className="ml-2">{businessUnitName}</span>
        </div>
      );
    }
  },

  {
    accessorKey: "options",
    header: "Opciones",
    cell: ({ row }) => {
      const userId = row.original.id;
      return (
        <div className="flex items-center">
          <Button variant={"link"} onClick={() => {
            setCustomCookieAction("collaboratorId", String(userId));
            setTimeout(() => {}, 15000);
          }} asChild>
            <Link href={`/misColaboradores/${userId}`}>
              <ArrowRightEndOnRectangleIcon className="w-5 h-5 text-gemso-blue" />
            </Link>
          </Button>
        </div>
      );
    },
  }
];
 