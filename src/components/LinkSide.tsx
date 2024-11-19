import Link from "next/link";
import Image from "next/image";

type linkProps = {
  href: string;
  name: string;
  src: string;
};

const LinkSide = ({ href, name, src }: linkProps) => {
  return (
    <Link
      href={`/league/${href}`}
      className="flex items-center p-2 rounded-md hover:bg-[rgb(54,63,78)] transition-colors"
    >
      <div className="w-5 h-5 relative flex-shrink-0">
        <Image src={src} alt={name} fill className="object-contain" />
      </div>
      <p className="ml-3 text-sm text-gray-300 truncate">{name}</p>
    </Link>
  );
};

export default LinkSide;
