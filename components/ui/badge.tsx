import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          {
            "bg-[#006D92] text-white": variant === "default",
            "bg-gray-100 text-gray-900": variant === "secondary",
            "bg-red-100 text-red-700": variant === "destructive",
            "border border-gray-200 text-gray-700": variant === "outline",
            "bg-green-100 text-green-700": variant === "success",
            "bg-yellow-100 text-yellow-700": variant === "warning",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge } 