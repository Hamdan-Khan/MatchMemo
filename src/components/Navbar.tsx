"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Blogs", href: "/blog" },
];

const Navbar: FC = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center py-3 pb-6">
      <Link href="/" className="flex items-center space-x-2">
        <div className="relative w-[30px] h-[30px]">
          <Image
            src="/football-info.png"
            alt="icon"
            fill
            className="object-cover"
          />
        </div>
        <span className="text-2xl font-bold none md:block">MatchMemo</span>
      </Link>
      <ul className="flex gap-7 text-lg">
        {links.map((link) => {
          const { href, name, id } = link;
          return (
            <Link
              key={id}
              href={href}
              className={`hover:text-white ${
                pathname == href ? "font-semibold underline" : ""
              }`}
            >
              {name}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
