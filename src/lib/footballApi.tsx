import { apiOptions } from "@/types";

export const options: apiOptions = {
  next: { revalidate: 30 },
  headers: {
    "X-Auth-Token": process.env.API_TOKEN,
    "Content-Type": "application/json",
  },
};

const todayDate = new Date();
const getDateMonth = new Date(todayDate.getTime());
getDateMonth.setDate(todayDate.getDate() - 1);
const year = getDateMonth.getFullYear();
const month = String(getDateMonth.getMonth() + 1).padStart(2, "0");
const day = String(getDateMonth.getDate()).padStart(2, "0");

const getDateMonth2 = new Date(todayDate.getTime());
getDateMonth2.setDate(todayDate.getDate() + 1);
const year2 = getDateMonth2.getFullYear();
const month2 = String(getDateMonth.getMonth() + 1).padStart(2, "0");
const day2 = String(getDateMonth.getDate()).padStart(2, "0");

export const yesterday = [year, month, day].join("-");
export const tomorrow = [year2, month2, day2].join("-");
