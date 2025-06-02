import AuthCard from "@/components/bolt/Inputs/AuthCard"

export default function LoginPage() {
  return (
    <div>
      <div className="flex h-screen w-full items-center justify-center z-10 relative">
        <AuthCard />
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[url(/Molinos-GEMSO.jpg)] bg-cover bg-center opacity-50" />
    </div>
  )
}
