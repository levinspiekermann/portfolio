import { cn } from '@/lib/utils'

export default function ListTitle({
	children,
	border,
	className,
}: {
	children?: React.ReactNode
	border?: boolean
	className?: string
}) {
	return (
		<dt
			className={cn(
				'pb-4 pt-0 leading-relaxed sm:pb-0 col-span-12 md:col-span-4',
				border ? 'border-t border-border pt-[1rem]' : '',
				className
			)}
		>
			{children}
		</dt>
	)
}
