"use client"
import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

const SidebarItem = ({
  icon,
  label,
  href
}: SidebarItemProps) => {
  const Icon = icon
 
  const router = useRouter()
  const pathname = usePathname()
  const isActive = 
    (pathname === "/" && href==="/") ||
    pathname === href

  const onClick = () => {
  router.push(href)
  }
  return ( 
    <Button 
      onClick={onClick}
      size="lg" 
      variant="outline" 
      className={cn(
        "flex items-center justify-normal w-full rounded-none",
        isActive && " bg-slate-200 dark:bg-slate-700 text-accent-foreground "
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