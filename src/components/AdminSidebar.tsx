"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminUtils = [
  { id: 0, name: "Home", href: "" },
  {
    id: 1,
    name: "Blogging",
    href: "/manage/blogs",
  },
  {
    id: 2,
    name: "Player Rating",
    href: "/manage/ratings",
  },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <section className="px-2 border border-zinc-700 md:px-4 py-4 bg-outer rounded-md min-w-[300px] max-h-max">
      <div>
        <h1 className="font-bold text-xl text-center mb-4 text-[rgb(137,160,223)]">
          Manage
        </h1>
        <ul className="space-y-2">
          {adminUtils.map((util) => (
            <Link href={`/admin/${util.href}`} key={util?.id}>
              <div
                className={`py-2 my-1 px-3 duration-500 rounded-md hover:bg-inner ${
                  pathname == `/admin${util.href}` ? "bg-inner" : ""
                }`}
              >
                {util.name}
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};
