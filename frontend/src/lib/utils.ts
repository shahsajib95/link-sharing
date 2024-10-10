import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function pickAvatarName(name: string) {
  const nameArray = name.split(" ");
  if (nameArray.length > 1) {
    return `${nameArray[0]?.charAt(0).toUpperCase()}${nameArray[1]
      ?.charAt(0)
      .toUpperCase()}`;
  } else return nameArray[0]?.charAt(0).toUpperCase();
}
