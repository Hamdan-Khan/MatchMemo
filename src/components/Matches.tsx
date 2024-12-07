import Image from "next/image";
import { matchesType } from "@/types";
import Link from "next/link";

const Matches = ({ data }: { data: matchesType }) => {
  const getDate = new Date(data?.utcDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const matchStatus =
    data?.status === "SCHEDULED"
      ? "Scheduled"
      : data?.status === "TIMED"
      ? "Planned"
      : data?.status === "IN_PLAY"
      ? "Live"
      : data?.status === "PAUSED"
      ? "Paused"
      : data?.status === "FINISHED"
      ? "Finished"
      : data?.status === "AWARDED"
      ? "Awarded"
      : data?.status === "CANCELLED"
      ? "Cancelled"
      : data?.status === "POSTPONED"
      ? "Postponed"
      : data?.status === "SUSPENDED"
      ? "Suspended"
      : "Unknown";

  return (
    <div className="grid grid-cols-3 gap-2">
      <Link href={`/team/${data?.homeTeam?.id}`}>
        <div className="w-full flex items-center">
          <div className="w-[20px] h-[20px] relative mr-2 flex-shrink-0">
            <Image
              src={data?.homeTeam?.crest || "/football-info.png"}
              alt={data?.homeTeam?.name || ""}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-xs md:text-sm truncate">{data?.homeTeam?.name}</p>
        </div>
      </Link>
      <div className="px-2 m-auto flex justify-center items-center bg-slate-600 rounded-md">
        {data?.status === "FINISHED" ? (
          <p className="py-1 text-teal-400 text-xs">
            {data?.score?.fullTime?.home} : {data?.score?.fullTime?.away}
          </p>
        ) : data?.status === "IN_PLAY" ? (
          <p className="py-1 text-teal-400 text-xs">
            <span className="py-1 text-green-500 text-xs font-bold">
              {matchStatus}
            </span>{" "}
            {data?.score?.fullTime?.home} : {data?.score?.fullTime?.away}
          </p>
        ) : (
          <p className="py-1 text-teal-400 text-xs">{getDate}</p>
        )}
      </div>
      <Link href={`/team/${data?.awayTeam?.id}`}>
        <div className="w-full flex items-center justify-end">
          <p className="text-xs md:text-sm truncate text-right">
            {data.awayTeam?.name}
          </p>
          <div className="w-[20px] h-[20px] relative ml-2 flex-shrink-0">
            <Image
              src={data?.awayTeam?.crest || "/football-info.png"}
              alt={data?.awayTeam?.name || ""}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Matches;
