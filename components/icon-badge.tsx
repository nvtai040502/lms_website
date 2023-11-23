import { LucideIcon, LucideProps } from "lucide-react";
import React from "react";

interface IconBadgeProps {
  icon: LucideIcon;
  size?: LucideProps['size']
};

export const IconBadge = ({
  icon: Icon,
  size
}: IconBadgeProps) => {
  return (
    <div className=" bg-secondary rounded-full p-2">
      <Icon size={size}/>
    </div>
  )
};