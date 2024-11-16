import Link from "next/link";
import { getServerSession } from "next-auth";
import { Newspaper, Star, ArrowRight } from "lucide-react";

export default async function Admin() {
  const session = await getServerSession();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-secondary rounded-lg p-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome back, {session.user.name?.split(" ")[0] || "Admin"}
              </h1>
              <p className="text-gray-400">
                Manage your football content and ratings from here
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/admin/manage/blogs" className="group">
            <div className="bg-secondary rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <Newspaper className="h-8 w-8 text-blue-500" />
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Blog Management
              </h2>
              <p className="text-gray-400">
                Create, edit, and manage your football blog posts. Share your
                insights and updates with your readers.
              </p>
              <div className="mt-4 flex items-center text-blue-500 text-sm font-medium">
                Manage Blogs
              </div>
            </div>
          </Link>

          <Link href="/admin/manage/ratings" className="group">
            <div className="bg-secondary rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-yellow-500">
              <div className="flex items-center justify-between mb-4">
                <Star className="h-8 w-8 text-yellow-500" />
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-yellow-500 transform group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Player Ratings
              </h2>
              <p className="text-gray-400">
                Update and manage player performance ratings. Keep track of
                player statistics and match performances.
              </p>
              <div className="mt-4 flex items-center text-yellow-500 text-sm font-medium">
                Manage Ratings
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-secondary rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Tips</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Use the blog management section to create and edit your football
              analysis posts
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              Update player ratings after each match to keep your content fresh
              and engaging
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Remember to regularly check and update blog posts after matches
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
