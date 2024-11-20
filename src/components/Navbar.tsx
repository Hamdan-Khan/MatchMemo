"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LinkSide from "./LinkSide";
import { baseURL } from "@/lib/footballApi";
import { getSession } from "next-auth/react";

interface League {
  id: number;
  name: string;
  code: string;
  emblem: string;
}

interface NavLink {
  id: number;
  name: string;
  href: string;
  isAdmin?: boolean;
}

const links: NavLink[] = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Blogs", href: "/blog" },
  { id: 3, name: "Admin Panel", href: "/admin", isAdmin: true },
  { id: 4, name: "About", href: "/about"}
];

const adminUtils = [
  { id: 0, name: "Home", href: "" },
  { id: 1, name: "Blogging", href: "/manage/blogs" },
  { id: 2, name: "Player Rating", href: "/manage/ratings" },
];

const Navbar: FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isAdminPage = pathname.startsWith("/admin");

  useEffect(() => {
    const initializeNavbar = async () => {
      try {
        // Check admin status
        const session = await getSession();
        setIsAdmin(!!session);

        // Fetch leagues
        const res = await fetch(`${baseURL}/api/leagues`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch leagues");
        }
        const data = await res.json();
        setLeagues(data ?? []);
      } catch (error) {
        console.error("Error initializing navbar:", error);
        setLeagues([]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeNavbar();
  }, []);

  const visibleLinks = links.filter(
    (link) => !link.isAdmin || (link.isAdmin && isAdmin)
  );

  return (
    <nav className="flex justify-between items-center py-3 md:py-4">
      <Link href="/" className="flex items-center space-x-2">
        <div className="relative w-[30px] h-[30px]">
          <Image
            src="/football-info.png"
            alt="icon"
            fill
            className="object-cover"
          />
        </div>
        <span className="text-xl md:text-2xl font-bold">MatchMemo</span>
      </Link>

      <ul className="hidden md:flex gap-4 md:gap-7">
        {visibleLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`text-base md:text-lg hover:text-white transition-colors ${
              pathname === link.href ? "font-semibold underline" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </ul>

      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-400 hover:text-white focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`fixed inset-y-0 left-0 w-64 bg-[rgb(45,51,63)] transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } z-50 overflow-y-auto`}
        >
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Menu</h2>
          </div>

          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-[rgb(137,160,223)] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {visibleLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} onClick={toggleMenu}>
                    <div
                      className={`py-2 px-3 rounded-md transition-colors duration-200 
                        ${
                          pathname === link.href
                            ? "bg-inner text-white"
                            : "text-gray-300 hover:bg-inner hover:text-white"
                        }`}
                    >
                      {link.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {isAdmin && isAdminPage && (
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-[rgb(137,160,223)] mb-4">
                Admin
              </h3>
              <ul className="space-y-2">
                {adminUtils.map((util) => (
                  <li key={util.id}>
                    <Link href={`/admin${util.href}`} onClick={toggleMenu}>
                      <div
                        className={`py-2 px-3 rounded-md transition-colors duration-200 
                        ${
                          pathname === `/admin${util.href}`
                            ? "bg-inner text-white"
                            : "text-gray-300 hover:bg-inner hover:text-white"
                        }`}
                      >
                        {util.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-4">
            <h3 className="text-lg font-semibold text-textHeading mb-4">
              Leagues
            </h3>
            <div className="space-y-2">
              {isLoading ? (
                <div className="text-gray-400 animate-pulse">
                  Loading leagues...
                </div>
              ) : (
                leagues.map((league) => (
                  <div key={league.id} className="py-1">
                    <LinkSide
                      href={league.code}
                      name={league.name}
                      src={league.emblem}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
