import { Compass, Layout } from "lucide-react"
import SidebarHeader from "./header"
import { Separator } from "../ui/separator"
import SidebarItem from "./item"

const sidebarRoutes = [
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
]

const Sidebar = () => {
  const routes = sidebarRoutes
  return ( 
    <div>
      <div>
        <SidebarHeader />
      </div>

      <Separator className="my-2"/>
      <div className="my-2">
        {routes.map((route) => (
          
        <SidebarItem 
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
        ))}
      </div>
    </div>
   );
}
 
export default Sidebar;