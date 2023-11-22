"use client"
import { Button } from "../../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarRoute } from "@/type";

const DashboardSidebarItem = ({
  icon: Icon,
  label,
  href
}: SidebarRoute) => {
  
 
  const router = useRouter()
  const pathname = usePathname()
  const isActive = 
    (pathname === "/" && href==="/") ||
    pathname === href

  const onClick = () => {
  {!isActive && router.push(href)}
  
  }
  return ( 
    <Button 
      onClick={onClick}
      size="lg" 
      variant="outline" 
      className={cn(
        "flex items-center justify-normal w-full rounded-none border-none p-6",
        isActive && "bg-accent  text-accent-foreground "
      )}
    >
      <Icon
        size={22}
        className=
          "mr-2"
      />
      {label}
    </Button>
   );
}
 
export default DashboardSidebarItem;