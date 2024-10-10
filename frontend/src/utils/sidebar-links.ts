import { BiCalendar } from "react-icons/bi";
import { GoMegaphone } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";

interface SidebarLink {
  id: number;
  name?: string;
  icon?: any;
  path: string;
}

const sidebarList: SidebarLink[] = [
  {
    id: 1,
    name: "Announcements",
    icon: GoMegaphone,
    path: "/announcements",
  },
  {
    id: 2,
    name: "My Course",
    icon: HiOutlineUserGroup,
    path: "/course",
  },
  {
    id: 3,
    name: "Calendar",
    icon: BiCalendar,
    path: "/calendar",
  },
];

export default sidebarList;
