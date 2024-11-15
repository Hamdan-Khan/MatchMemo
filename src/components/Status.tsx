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
    <div>
      <div className="flex space-x-4 mb-2 md:mb-4">
        <button
          onClick={() => setStatusMatch("FINISHED")}
          className={`px-2 py-1 text-primary text-sm rounded-md ${
            statusMatch === "FINISHED"
              ? "bg-teal-400 font-semibold"
              : "bg-slate-500 font-regular"
          }`}
        >
          Finished
        </button>
        <button
          onClick={() => setStatusMatch("TODAY")}
          className={`px-2 py-1 text-primary text-xs md:text-sm rounded-md ${
            statusMatch === "TODAY"
              ? "bg-teal-400 font-semibold"
              : "bg-slate-500 font-regular"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setStatusMatch("TOMORROW")}
          className={`px-2 py-1 text-primary text-xs md:text-sm rounded-md ${
            statusMatch === "TOMORROW"
              ? "bg-teal-400 font-semibold"
              : "bg-slate-500 font-regular"
          }`}
        >
          Upcoming
        </button>
      </div>

      <div className="w-full">
        {statusMatch === "TODAY" ? (
          matchesListToday?.length > 0 ? (
            matchesListToday?.map((data) => (
              <div key={data.id}>
                {data?.status === "TIMED" && <LeagueTable data={data} />}
              </div>
            ))
          ) : (
            <div>No matches scheduled</div>
          )
        ) : null}

        {statusMatch === "FINISHED"
          ? matchesListToday?.map((data) => (
              <div key={data.id}>
                {data?.status === "FINISHED" && <LeagueTable data={data} />}
              </div>
            ))
          : null}
        {statusMatch === "FINISHED" ? (
          matchesListYesterday?.length > 0 ? (
            matchesListYesterday?.map((data) => (
              <div key={data.id}>
                <LeagueTable data={data} />
              </div>
            ))
          ) : (
            <div>No matches scheduled</div>
          )
        ) : null}

        {statusMatch === "TOMORROW" ? (
          matchesListTomorrow?.length > 0 ? (
            matchesListTomorrow?.map((data) => (
              <div key={data.id}>
                <LeagueTable data={data} />
              </div>
            ))
          ) : (
            <div>No matches scheduled</div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Status;
