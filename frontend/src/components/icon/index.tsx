import {
  AlignLeft,
  AppWindow,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Atom,
  BadgePercent,
  CircleDollarSign,
  Cog,
  Copy,
  Eye,
  FileText,
  Layers,
  LogOut,
  PackageCheck,
  PieChart,
  Radar,
  Settings,
  SquarePen,
  Trash,
  User,
  UserCog,
  Users,
} from "lucide-react";
import { ButtonLoaderIcon } from "./button-loader-icon";
import { LogoIcon } from "./logo-icon";
import { LogoWithoutTextIcon } from "./logo-without-text-icon";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  alignLeft: AlignLeft,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  atom: Atom,
  appWindow: AppWindow,
  badgePercent: BadgePercent,
  cog: Cog,
  copy: Copy,
  dollar: CircleDollarSign,
  eye: Eye,
  edit: SquarePen,
  logOut: LogOut,
  layers: Layers,
  user: User,
  trash: Trash,
  settings: Settings,
  users: Users,
  userAdmin: UserCog,
  fileText: FileText,
  pieChart: PieChart,
  packageCheck: PackageCheck,
  radar: Radar,
  buttonLoader: (props: IconProps) => <ButtonLoaderIcon {...props} />,
  logo: (props: IconProps) => <LogoIcon {...props} />,
  logoWithoutText: (props: IconProps) => <LogoWithoutTextIcon {...props} />,
};
