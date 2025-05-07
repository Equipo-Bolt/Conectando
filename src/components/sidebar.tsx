import Link from "next/link";
import Image from "next/image";
import { ClipboardDocumentIcon, UsersIcon } from "@heroicons/react/24/outline";
import GemsoBlanco from "../../public/GemsoBlanco.png";

export default function SideNav() {
  return (
    <aside className="bg-gemso-dark-blue flex h-full flex-col p-4 md:w-64">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <Image
          src={GemsoBlanco}
          alt="Gemso Blanco Logo"
          width={160}
          height={50}
        />
      </div>

      {/* Primera línea divisoria */}
      <hr className="border-blue-400/70 my-4" />

      {/* Título */}
      <h2 className="text-white text-xl font-bold mb-3 px-2">
        Creación de Metas
      </h2>

      {/* Navegación */}
      <nav className="px-2 space-y-2">
        {/* Mis Objetivos */}
        <Link
          href="/misObjetivos"
          className="flex items-center bg-gemso-blue-button hover:bg-gemso-blue-button-dark text-white rounded-lg py-2 px-3"
        >
          <ClipboardDocumentIcon className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Mis Objetivos</span>
        </Link>

        {/* Mis Colaboradores */}
        <Link
          href="/misColaboradores"
          className="flex items-center bg-gemso-blue-button hover:bg-gemso-blue-button-dark text-white rounded-lg py-2 px-3"
        >
          <UsersIcon className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Mis Colaboradores</span>
        </Link>
      </nav>

      {/* Segunda línea divisoria */}
      <hr className="border-blue-400/70 my-4" />

      {/* Espacio vacío al final */}
      <div className="flex-grow" />
    </aside>
  );
}
