import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function IconBox({
	icon,
	href,
	title,
	className,
}: {
	icon: string
	href: string
	title?: string
	className?: string
}) {
	return (
		<Link
			className={cn(
				'inline-flex items-center gap-2 border border-border rounded-md px-2 py-1 grayscale hover:grayscale-0 transition ease-in-out duration-500 text-silver hover:text-white max-h-[32px]',
				className
			)}
			href={href}
			target="_blank"
		>
			<Image
				src={icon}
				alt={title ?? 'Icon'}
				className="object-contain w-8 h-8 p-1"
				width={32}
				height={32}
			/>
			{title && <span className="text-sm">{title}</span>}
		</Link>
	)
}
