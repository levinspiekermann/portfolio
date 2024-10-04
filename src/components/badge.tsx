import { cn } from '@/lib/utils'

export default function Badge({
	children,
	isLive,
	border,
}: {
	children: React.ReactNode
	isLive?: boolean
	border?: boolean
}) {
	return (
		<span
			className={cn(
				'inline-flex items-center gap-[.25rem] rounded-xl px-2 py-0.5 text-xs text-silver',
				border && 'bg-border'
			)}
		>
			{isLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
			{children}
		</span>
	)
}
