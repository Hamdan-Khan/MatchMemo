import BlogBar from "@/components/BlogBar";
import Sidebar from "@/components/Sidebar";

export default function LeagueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {children}
      <BlogBar />
    </>
  );
}
