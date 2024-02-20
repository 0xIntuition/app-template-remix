import { cn } from '@/lib/utils/misc'
import * as React from 'react'

const FastForwardIcon = React.forwardRef<
  HTMLOrSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }, ref) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('h-6 md:h-10', className)}
    {...props}
  >
    <path
      d="M12.3742 11.3303L4.75 5.5V18.5L12.3742 12.6697M12.75 5.5L21.25 12L12.75 18.5V5.5Z"
      stroke="current"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
  </svg>
))
export default FastForwardIcon
