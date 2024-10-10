import { Facebook, Github, Linkedin, Youtube } from "lucide-react";

export const platformTypes = [
  { type: "Facebook" },
  { type: "Youtube" },
  { type: "Github" },
  { type: "Linkedin" },
];

export const GetIcon = (type: string) => {
  switch (type) {
    case "Facebook":
      return <Facebook />;
    case "Youtube":
      return <Youtube />;
    case "Github":
      return <Github />;
    case "Linkedin":
      return <Linkedin />;
  }
};
