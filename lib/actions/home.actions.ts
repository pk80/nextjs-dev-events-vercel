"use server";

import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
if (!BASE_URL) {
  throw new Error("Please inlcude base url in env file.");
}

export const homePageLoadEvents = async () => {
  "use cache";
  cacheLife("hours");
  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    if (!response) return null;

    const { events } = await response.json();

    return events;
  } catch (error) {
    console.error(error);
    return null;
  }
};
