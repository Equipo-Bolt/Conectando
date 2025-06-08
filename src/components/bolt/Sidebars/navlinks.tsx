"use client";
import { ClipboardDocumentIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Role } from "@/types/Role";
import LogOutButton from "@/components/bolt/Buttons/LogOutButton";
import MyInfoButton from "@/components/bolt/Buttons/MyInfoButton";

const sections = [
  {
    roles: [1, 4, 5, 7],
    title: "Creación de Metas",
    links: [
      { name: "Mis Objetivos", href: "/misObjetivos", icon: ClipboardDocumentIcon },
    ],
  },
  {
    roles: [2, 4, 6, 7],
    title: "Evaluación",
    links: [
      { name: "Mis Colaboradores", href: "/misColaboradores", icon: UsersIcon },
    ],
  },
  {
    roles: [3, 5, 6, 7],
    title: "Administración",
    links: [
      { name: "Usuarios", href: "/usuarios", icon: UsersIcon },
      { name: "Catalogos", href: "/catalogos", icon: ClipboardDocumentIcon },
    ],
  },
];

interface NavLinkProps {
  userRole: Role;
}

export default function NavLinks({ userRole }: NavLinkProps) {
  const pathname = usePathname();
  if (!pathname) return null;

  const filteredSections = sections.filter((section) =>
    section.roles.includes(userRole.id)
  );

  return (
    <div className="flex flex-col h-full">
      <hr className="border-selected-blue mb-[0.5rem]" />
      {filteredSections.map((section) => (
        <div key={section.title}>
          <h2 className="text-white text-xl font-bold mb-[1rem] px-[0.5rem]">
            {section.title}
          </h2>
          <nav className="px-[0.5rem] gap-[0.5rem] mb-[1rem]">
            {section.links.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "flex items-center text-white rounded-lg p-[0.625em] h-[3rem]",
                    isActive
                      ? "bg-selected-blue"
                      : "hover:bg-gemso-blue"
                  )}
                >
                  <link.icon className="w-[1.5rem] h-[1.5rem] mr-[0.5rem]" />
                  <span className="text-sm font-medium">{link.name}</span>
                </Link>
              );
            })}
          </nav>
          <hr className="border-selected-blue mb-[0.5rem]" />
        </div>
      ))}
      <div className="mt-auto px-[0.5rem] py-[0.625rem]">
        <MyInfoButton />
        <div className="h-[1rem]" />
        <LogOutButton />
      </div>
    </div>
  );
}
