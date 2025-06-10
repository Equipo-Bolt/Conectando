"use client";

import { ColumnDef } from "@tanstack/react-table";

import { User } from "@/types/User";

import {ArrowRightEndOnRectangleIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

import { DeleteButton } from "@/components/bolt/Buttons/DeleteButton";
import { disableUser } from "@/app/actions/user/disableUser";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user",
    header: "Usuario",
    size: 100,
    cell: ({ row }) => {
      const userName = row.original.fullName;
      if (!userName) {
        return <span className="text-gray-500">Sin Nombre</span>;
      }
      const shortenedName = userName.length > 30 ? `${userName.slice(0, 30)}...` : userName;
      return <span>{shortenedName}</span>;
    },
  },
  {
    accessorKey: "roleID",
    header: "Roles",
    size: 100,
    cell: ({ row }) => {
      const roleName = row.original.roleID;
      return (
        <div className="flex items-center">
          <span className="ml-2">{roleName}</span>
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
        <div className="flex gap-[1rem]">
          <button>
            <Link href={`/usuarios/detalles/${userId}`}>
              <ArrowRightEndOnRectangleIcon className="text-gemso-blue w-5 h-5" />
            </Link>
          </button>
          
          <DeleteButton
            id={userId}
            title="Eliminar Usuario"
            description="¿Desea eliminar este usuario? Esta acción no se puede deshacer."
            handleConfirm={async (id) => {
              await disableUser(id);
              window.location.reload();
            }}
          />
        </div>
      );
    },
  }
];
 