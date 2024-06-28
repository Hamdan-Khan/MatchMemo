import Sidebar from "@/components/Sidebar";

export default function LeagueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="flex-grow">{children}</div>
    </>
  );
}
