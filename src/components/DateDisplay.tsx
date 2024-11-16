"use client";

import { useEffect, useState } from "react";

export const DateDisplay = () => {
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    setDateString(new Date().toDateString());
  }, []);

  return (
    <div className="px-4 py-0 md:py-1 bg-slate-600 rounded-md text-textPrimary text-sm">
      <p>{dateString}</p>
    </div>
  );
};
