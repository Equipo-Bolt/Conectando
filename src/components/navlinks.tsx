"use client";
import { ClipboardDocumentIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
const links = [
  { name: "Mis Objetivos", href: "/misObjetivos", icon: UsersIcon },
  {
    name: "Mis Colaboradores",
    href: "/misColaboradores",
    icon: ClipboardDocumentIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  // Renderizado condicional para evitar que el componente se renderice hasta que usePathname haya terminado de cargar
  if (!pathname) return null;

  return (
    <>
      {links.map(({ name, href, icon }) => {
        const LinkIcon = icon;
        return (
          <Link
            key={name}
            href={href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3",
              pathname.startsWith(href)
                ? "bg-selected-blue text-white"
                : "bg-gemso-blue text-white hover:bg-sky-100 hover:text-blue-600"
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{name}</p>
          </Link>
        );
      })}
    </>
  );
}
