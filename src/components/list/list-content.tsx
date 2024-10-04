import { cn } from "@/lib/utils"

export default function ListContent({ children, border }: { children?: React.ReactNode, border?: boolean }) {
  return (
    <dd className={cn("col-span-12 md:col-span-8", border ? "border-t border-border pt-[1rem]" : "")}>
      {children}
    </dd>
  )
}
