"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminUtils = [
  {
    id: 1,
    name: "Blogging",
    href: "blogs",
  },
  {
    id: 2,
    name: "Player Rating",
    href: "ratings",
  },
];

export const AdminSidebar: React.FC = async () => {
  const pathname = usePathname();
  return (
    <section className="px-2 md:px-4 py-2 bg-[rgb(40,46,58)] rounded-md min-w-[300px]">
      <div>
        <h1 className="font-bold text-xl text-center mb-4 text-[rgb(137,160,223)]">
          Manage
        </h1>
        <ul className="space-y-2">
          {adminUtils.map((util) => (
            <Link href={`/admin/manage/${util.href}`} key={util?.id}>
              <div
                className={`py-2 my-1 px-3 duration-500 rounded-md hover:bg-[rgb(47,54,68)] ${
                  pathname == `/admin/manage/${util.href}`
                    ? "bg-[rgb(45,53,68)]"
                    : ""
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
