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
    accessorKey: "division",
    header: "División",
    size: 100,
    cell: ({ row }) => {
      const divisionName = row.original.businessUnitID.;
      return (
        <div className="flex items-center">
          <span className="ml-2">{formState}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "businessUnit",
    header: "Unidad de Negocio",
    size: 100,
    cell: ({ row }) => {
      const userId = row.original.user.id;

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
 