import { matchesType } from "@/types";
import Image from "next/image";

const Competition = ({ data }: { data: matchesType }) => {
  const nd = new Date(data?.utcDate);
  const dateConvert = nd.toDateString();
  return (
    <div className="mb-4 flex justify-between items-center px-3 md:px-4 py-1 bg-slate-600 hover:bg-slate-700 rounded-md">
      <div className="flex items-center gap-2 md:gap-4">
        <Image
          src={data?.competition.emblem}
          alt={data?.competition.name}
          width={20}
          height={20}
          className="w-4 h-4 md:w-5 md:h-5"
        />
        <p className="text-xs md:text-sm text-teal-400 truncate">
          {data?.competition.name}
        </p>
      </div>
      <p className="text-xs md:text-sm truncate ml-2">{dateConvert}</p>
    </div>
  );
};

export default Competition;
