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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const getFilteredMatches = () => {
    switch (statusMatch) {
      case "TODAY":
        return (
          matchesListToday?.filter((data) => data?.status === "TIMED") || []
        );
      case "FINISHED":
        return [
          ...(matchesListToday?.filter((data) => data?.status === "FINISHED") ||
            []),
          ...(matchesListYesterday || []),
        ];
      case "TOMORROW":
        return matchesListTomorrow || [];
      default:
        return [];
    }
  };

  const filteredMatches = getFilteredMatches();
  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const paginatedMatches = filteredMatches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <div className="flex gap-2 md:gap-4 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => {
            setStatusMatch("FINISHED");
            setCurrentPage(1);
          }}
          className={`px-3 py-1.5 text-primary text-xs md:text-sm rounded-md whitespace-nowrap transition-colors ${
            statusMatch === "FINISHED"
              ? "bg-teal-400 font-semibold"
              : "bg-slate-500 hover:bg-slate-400"
          }`}
        >
          Finished (
          {matchesListToday?.filter((data) => data?.status === "FINISHED")
            .length + matchesListYesterday.length}
          )
        </button>
        <button
          onClick={() => {
            setStatusMatch("TODAY");
            setCurrentPage(1);
          }}
          className={`px-3 py-1.5 text-primary text-xs md:text-sm rounded-md whitespace-nowrap transition-colors ${
            statusMatch === "TODAY"
              ? "bg-teal-400 font-semibold"
              : "bg-slate-500 hover:bg-slate-400"
          }`}
        >
          Today (
          {matchesListToday?.filter((data) => data?.status === "TIMED").length})
        </button>
        <button
          onClick={() => {
            setStatusMatch("TOMORROW");
            setCurrentPage(1);
          }}
          className={`px-3 py-1.5 text-primary text-xs md:text-sm rounded-md whitespace-nowrap transition-colors ${
            statusMatch === "TOMORROW"
              ? "bg-teal-400 font-semibold"
              : "bg-slate-500 hover:bg-slate-400"
          }`}
        >
          Upcoming ({matchesListTomorrow.length})
        </button>
      </div>

      <div className="space-y-3">
        {paginatedMatches.length > 0 ? (
          paginatedMatches.map((data) => (
            <div key={data.id}>
              <LeagueTable data={data} />
            </div>
          ))
        ) : (
          <div className="text-sm md:text-base text-gray-400">
            No matches scheduled
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-primary text-xs md:text-sm rounded-md whitespace-nowrap transition-colors bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ◀ Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-primary text-xs md:text-sm rounded-md whitespace-nowrap transition-colors bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Status;
