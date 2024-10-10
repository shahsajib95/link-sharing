import { useAppSelector } from "@/store/store";
import { Card } from "./ui/card";

import UserView from "./UserView";

export default function MobileCard() {
  const { name, links } = useAppSelector((state) => state.auth);

  return (
    <Card className="xl:lock col-span-2 hidden border-none  p-5 shadow-none lg:block 2xl:block ">
      <div className="relative flex items-center justify-center">
        {/* Image */}
        <img src="/images/mobile.png" className="large-image" alt="Mobile" />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center pt-16">
          <UserView
            user={{
              firstName: name?.firstName,
              lastName: name?.lastName,
              email: name?.email,
              avatar: name?.avatar?.type
                ? name?.avatar?.type == "link"
                  ? name?.avatar?.src
                  : URL.createObjectURL(name?.avatar?.src)
                : "",
            }}
            links={links}
          />
        </div>
      </div>
    </Card>
  );
}
