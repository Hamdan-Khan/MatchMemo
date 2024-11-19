"use client";

import { useState } from "react";
import { matchesType } from "@/types";
import LeagueTable from "./LeagueTable";

const Status = ({
  matchesListToday,
  matchesListYesterday,
  matchesListTomorrow,
}: {
  matchesListToday: matchesType[];
  matchesListYesterday: matchesType[];
  matchesListTomorrow: matchesType[];
}) => {
  const [statusMatch, setStatusMatch] = useState("TODAY");

  return (
    <div className="w-full">
      <div className="flex gap-2 md:gap-4 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => setStatusMatch("FINISHED")}
          className={`px-3 py-1.5 text-primary text-xs md:text-sm rounded-md whitespace-nowrap transition-colors ${
            statusMatch === "FINISHED"
              ? "bg-teal-400 font-semibold"
              : "bg-slate-500 hover:bg-slate-400"
          }`}
        >
          Finished
        </button>
        <button
          onClick={() => setStatusMatch("TODAY")}
          className={`px-3 py-1.5 text-primary text-xs md:text-sm rounded-md whitespace-nowrap transition-colors ${
            statusMatch === "TODAY"
              ? "bg-teal-400 font-semibold"
              : "bg-slate-500 hover:bg-slate-400"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setStatusMatch("TOMORROW")}
          className={`px-3 py-1.5 text-primary text-xs md:text-sm rounded-md whitespace-nowrap transition-colors ${
            statusMatch === "TOMORROW"
              ? "bg-teal-400 font-semibold"
              : "bg-slate-500 hover:bg-slate-400"
          }`}
        >
          Upcoming
        </button>
      </div>

      <div className="space-y-3">
        {statusMatch === "TODAY" && (
          <>
            {matchesListToday?.length > 0 ? (
              matchesListToday?.map((data) => (
                <div key={data.id}>
                  {data?.status === "TIMED" && <LeagueTable data={data} />}
                </div>
              ))
            ) : (
              <div className="text-sm md:text-base text-gray-400">
                No matches scheduled
              </div>
            )}
          </>
        )}

        {statusMatch === "FINISHED" && (
          <>
            {matchesListToday?.map((data) => (
              <div key={data.id}>
                {data?.status === "FINISHED" && <LeagueTable data={data} />}
              </div>
            ))}
            {matchesListYesterday?.length > 0 ? (
              matchesListYesterday?.map((data) => (
                <div key={data.id}>
                  <LeagueTable data={data} />
                </div>
              ))
            ) : (
              <div className="text-sm md:text-base text-gray-400">
                No matches scheduled
              </div>
            )}
          </>
        )}

        {statusMatch === "TOMORROW" && (
          <>
            {matchesListTomorrow?.length > 0 ? (
              matchesListTomorrow?.map((data) => (
                <div key={data.id}>
                  <LeagueTable data={data} />
                </div>
              ))
            ) : (
              <div className="text-sm md:text-base text-gray-400">
                No matches scheduled
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Status;
