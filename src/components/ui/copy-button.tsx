import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

function CopyButton({
  text,
  label,
  className,
  ...props
}: { text: string; label?: string } & React.ComponentProps<"button">) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 1500)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot="copy-button"
          variant="ghost"
          size="iconSm"
          leftIcon={copied ? "icon-check" : "icon-copy"}
          onClick={handleCopy}
          className={cn(
            copied ? "text-success-5" : "text-black-55",
            className
          )}
          {...props}
        />
      </TooltipTrigger>
      <TooltipContent side="top" size="base">
        <p>{label || text}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export { CopyButton }
