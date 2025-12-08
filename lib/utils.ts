import { EventFormData } from "@/components/NewEventForm";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime12Hour = (time24: string): string => {
  if (!time24) return "";
  try {
    // Split the string "HH:MM"
    const [hours24, minutes] = time24.split(":").map(Number);

    // Determine AM/PM
    const period = hours24 >= 12 ? "PM" : "AM";

    // Convert 24-hour format to 12-hour format (13 -> 1, 0 -> 12)
    const hours12 = hours24 % 12 || 12;

    // Format the result
    return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
  } catch (error) {
    return `Invalid Time : ${error}`;
  }
};

export const appendFormData = (obj: any): FormData => {
  const formData = new FormData();

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      // file | blob
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      }
      // array
      else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
        // value.forEach((item) => {
        //   if (item instanceof File || item instanceof Blob) {
        //     formData.append(`${key}[]`, item);
        //   } else if (typeof item === "object" && item !== null) {
        //     formData.append(`${key}[]`, JSON.stringify(item));
        //   } else {
        //     formData.append(`${key}[]`, String(item));
        //   }
        // });
      }
      // nested objects
      else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      }
      // strings | number | booleans
      else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }
  }

  return formData;
};
