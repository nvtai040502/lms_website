import { Mode, SidebarRoute } from "@/type";
import { Compass, Layout} from "lucide-react";

const sidebarRoutes: SidebarRoute[] = [
  {
    icon: Layout,
    label: "Browse",
    href: "/"
  },
  {
    icon: Compass,
    label: "Dashboard",
    href: "/dashboard"
  }
];

const guestMode: Mode = {routes: sidebarRoutes}

export default guestMode