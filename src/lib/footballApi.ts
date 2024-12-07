import { apiOptions } from "@/types";

export const options: apiOptions = {
  next: { revalidate: 30 },
  headers: {
    "X-Auth-Token": process.env.API_TOKEN || "",
    "Content-Type": "application/json",
  },
};

export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://match-memo.vercel.app";

const todayDate = new Date();

const yesterdayDate = new Date(todayDate.getTime() - 1);
const year = yesterdayDate.getFullYear();
const month = String(yesterdayDate.getMonth() + 1).padStart(2, "0");
const day = String(yesterdayDate.getDate()).padStart(2, "0");

const tomorrowDate = new Date(todayDate.getTime() + 1);
const year2 = tomorrowDate.getFullYear();
const month2 = String(tomorrowDate.getMonth() + 1).padStart(2, "0");
const day2 = String(tomorrowDate.getDate()).padStart(2, "0");

export const yesterday = [year, month, day].join("-");
export const tomorrow = [year2, month2, day2].join("-");
