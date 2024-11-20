import { AdminInfo } from "@/components/AdminInfo";
import { AdminSidebar } from "@/components/AdminSidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <>
        <nav className="flex flex-col gap-4">
          <AdminSidebar />
          <AdminInfo />
        </nav>
        <div className="flex-grow">{children}</div>
      </>
    );
  }
  if (!session) {
    return (
      <div className="p-4 px-8 bg-slate-700 rounded-lg flex flex-col justify-center items-center max-h-max mx-auto mt-10">
        <h1 className="text-3xl font-semibold mb-1">Restricted Resources</h1>
        <p className="text-slate-300">Authorize yourself to access</p>
        <Link href="/api/auth/signin">
          <button className="bg-slate-600 px-5 font-semibold py-2 rounded-md mt-5">
            Login
          </button>
        </Link>
      </div>
    );
  }
}
