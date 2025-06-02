import SideNav from "@/components/bolt/Sidebars/sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-[3rem] overflow-y-auto h-screen">{children}</div>
    </div>
  );
}
