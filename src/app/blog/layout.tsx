import BlogBar from "@/components/BlogBar";
import Sidebar from "@/components/Sidebar";

export const revalidate = 60;

export default function LeagueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="flex-grow">{children}</div>
      <BlogBar />
    </>
  );
}
