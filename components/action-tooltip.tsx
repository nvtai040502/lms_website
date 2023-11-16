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
  delayDuration?: React.ComponentProps<typeof Tooltip>["delayDuration"]
  children: React.ReactNode;
}

export const ActionTooltip = ({
  label,
  side="right",
  delayDuration= 500,
  children,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
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