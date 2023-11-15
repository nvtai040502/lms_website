"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface ActionTooltipProps {
  label: string;
  side?: React.ComponentProps<typeof TooltipContent>['side'];
  children: React.ReactNode;
}

export const ActionTooltip = ({
  label,
  side = "right",
  children,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p className="font-semibold text-sm">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}