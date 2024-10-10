import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import { GetIcon } from "@/utils/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Links } from "@/types";
import { useLocation } from "react-router-dom";

type Props = {
  user: any;
  links: any
};

export default function UserView({ user, links }: Props) {
  const getClass = (type: string) => {
    switch (type) {
      case "Github":
        return "bg-black text-white";
      case "Youtube":
        return "bg-red-500 text-white";
      case "Linkedin":
        return "bg-blue-500 text-white";
      case "Facebook":
        return "bg-blue-400 text-white";
    }
  };

  const location = useLocation();

  return (
    <div className="flex justify-center text-center my-5">
      <div>
        <div className="mb-5 flex justify-center ">
          {user?.avatar ? (
            <Avatar className="h-20 w-20 rounded-full border-4 border-primary">
              <AvatarImage src={user?.avatar} alt="@shadcn" />
              <AvatarFallback> {user?.firstName?.[0]}</AvatarFallback>
            </Avatar>
          ) : (
            <div className="h-20 w-20 rounded-full bg-gray-100"></div>
          )}
        </div>

        <div className="my-3 flex justify-center">
          {user?.firstName ? (
            <p className="text-xl font-semibold ">
              {user?.firstName} {user?.lastName}
            </p>
          ) : (
            <div className="h-4 w-44	 rounded-md bg-gray-100" />
          )}
        </div>
        <div className="flex justify-center text-gray-400">
          {user?.email ? (
            <span className="text-xs">{user?.email}</span>
          ) : (
            <div className="h-4 w-20 rounded-md bg-gray-100 " />
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <div>
            {links?.map(
              (link: Links, index: number) =>
                link?.platform &&
                link?.link && (
                  <a href={link?.link} target="_blank" key={index}>
                    <Button
                      className={`my-4 flex w-[220px] justify-between ${getClass(link?.platform)} py-5`}
                    >
                      <div className="flex items-center">
                        {GetIcon(link?.platform)}{" "}
                        <span className="ms-2 text-xs">{link?.platform}</span>
                      </div>
                      <MoveRight />
                    </Button>
                  </a>
                ),
            )}
            {!location?.pathname?.includes("preview") && (
              <>
                <div className="mt-4	h-10 w-56 rounded-md bg-gray-100 " />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
