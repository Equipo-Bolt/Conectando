"use client";
import { ClipboardDocumentIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Role } from "@/types/Role";

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
    <>
      <hr className="border-selected-blue" />
      {filteredSections.map((section) => (
        <div key={section.title}>
          <h2 className="text-white text-xl font-bold mb-[1rem] px-[0.5rem]">
            {section.title}
          </h2>
          <nav className="px-2 gap-[0.5rem] mb-[1rem]">
            {section.links.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "flex items-center text-white rounded-lg p-[0.625em]",
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
          <hr className="border-selected-blue " />
        </div>
      ))}
    </>
  );
}
