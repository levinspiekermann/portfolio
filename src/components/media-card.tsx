import Image from 'next/image'
import Link from 'next/link'

interface MediaCardProps {
	image?: {
		alt?: string
		title?: string
		src: string
		width: number
		height: number
	}
	title?: string
	subtitle?: string
	href?: string
	hrefLabel?: string
	loading?: boolean
	borderTop?: boolean
}

const FALLBACK_COVER =
	"data:image/svg+xml,%0A%3Csvg fill='none' height='160' viewBox='0 0 112 160' width='112' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 0h112v160h-112z' fill='%2318181b'/%3E%3Cg fill='%23e2e8f0' fill-opacity='.15'%3E%3Ccircle cx='56' cy='57' r='34'/%3E%3Ccircle cx='56' cy='102' r='34'/%3E%3C/g%3E%3C/svg%3E"

export default function MediaCard({
	title,
	subtitle,
	image,
	href,
	hrefLabel,
	loading,
	borderTop,
}: MediaCardProps) {
	const loadingComponent = (
		<div
			className={`group flex animate-pulse items-center gap-4 ${
				borderTop ? `border-t border-solid pt-4 border-neutral-900` : null
			}`}
			title="Loading..."
		>
			<div className="relative">
				<div className="relative">
					<span className="block h-12 w-12 rounded bg-zinc-900 opacity-100"></span>
				</div>
			</div>

			<div className="w-full">
				<span className="mb-2 block h-5 w-1/2 rounded opacity-70 bg-zinc-900"></span>
				<span className="block h-4 w-1/3 rounded bg-zinc-900"></span>
			</div>
		</div>
	)

	const cardComponent = (
		<div
			className={`group flex items-center gap-4 ${
				borderTop ? `border-t border-solid pt-4 border-neutral-900` : null
			}`}
		>
			<div className="relative">
				<div className="relative z-10 origin-center drop-shadow-md transition-transform group-hover:scale-110">
					<Image
						alt={image?.alt || ''}
						title={title}
						className={`truncate bg-zinc-600`}
						src={image?.src || FALLBACK_COVER}
						width={image?.width}
						height={image?.height}
						priority={false}
					/>
				</div>
			</div>

			<div className="w-full truncate transition-transform group-hover:translate-x-0.5">
				<div className="truncate">{title}</div>
				<div className="truncate text-sm slashed-zero text-silver-dark">{subtitle}</div>
			</div>
		</div>
	)

	if (loading) {
		return loadingComponent
	}

	if (href) {
		return (
			<Link href={href} target="_blank" title={hrefLabel} rel="noopener noreferrer">
				{cardComponent}
			</Link>
		)
	}

	return cardComponent
}
