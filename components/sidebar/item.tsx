"use client"
import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarRoute } from "@/type";

const SidebarItem = ({
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
        "flex items-center justify-normal w-full rounded-none",
        isActive && " bg-accent  text-accent-foreground "
      )}
    >
      <Icon
        size={22}
        className=
          "text-slate-500 mr-2"
      />
      {label}
    </Button>
   );
}
 
export default SidebarItem;