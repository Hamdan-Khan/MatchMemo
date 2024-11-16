import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

export const AdminInfo: React.FC = async () => {
  const session = await getServerSession();

  if (!session?.user) {
    return null;
  }

  const { name, email, image } = session.user;

  return (
    <div className="bg-outer border border-zinc-700 rounded-lg p-4 shadow-md">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
          {image ? (
            <Image
              src={image}
              alt={name || "Admin profile"}
              fill
              className="object-cover"
              sizes="(max-width: 64px) 100vw, 64px"
            />
          ) : (
            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
              <span className="text-2xl text-white">
                {name?.charAt(0) || email?.charAt(0) || "A"}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {name && <h2 className="text-lg font-semibold text-white">{name}</h2>}
          {email && <p className="text-sm text-gray-400">{email}</p>}
          <p className="text-xs text-blue-400 mt-1">Admin</p>
        </div>
      </div>
      <Link href={"/api/auth/signout"} className="">
        <Button color="red">Sign out</Button>
      </Link>
    </div>
  );
};
