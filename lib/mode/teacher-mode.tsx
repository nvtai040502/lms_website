import { Mode, SidebarRoute } from "@/type";
import { BarChart, List} from "lucide-react";

const sidebarRoutes: SidebarRoute[] = [
  {
    icon: List,
    label: "Course",
    href: "/teacher/courses"
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics"
  }
];

const teacherMode: Mode = {routes: sidebarRoutes}

export default teacherMode