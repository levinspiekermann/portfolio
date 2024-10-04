'use client'
import { Command } from 'cmdk'
import { CameraIcon, GlobeIcon, HomeIcon, MusicIcon, Notebook } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Badge from './badge'

export default function CommandMenu() {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'k' && event.metaKey) {
				setOpen(true)
			}
		},
		[setOpen]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])

	const navigate = function (path: string) {
		router.push(path)
	}

	return (
		<Command.Dialog open={open} onOpenChange={setOpen}>
			<Command.Input placeholder="Go to..." />

			<Command.List>
				{loading && (
					<Command.Loading>
						<div>{/* <SpinnerIcon size={24} /> */}</div>
					</Command.Loading>
				)}

				<Command.Empty>Maybe someday...</Command.Empty>

				<Command.Group heading="Pages">
					<Command.Item onSelect={() => navigate('/')}>
						<div>
							<HomeIcon size={16} />
							Home
						</div>
					</Command.Item>
					<Command.Item onSelect={() => navigate('/posts')}>
						<div>
							<Notebook size={16} />
							Posts
						</div>
					</Command.Item>
					<Command.Item onSelect={() => navigate('/playlists')}>
						<div>
							<MusicIcon size={16} />
							Playlists
						</div>
					</Command.Item>
					<Command.Item onSelect={() => navigate('/globe')}>
						<div>
							<GlobeIcon size={16} />
							Globe
						</div>
					</Command.Item>
					<Command.Item onSelect={() => navigate('/photos')}>
						<div>
							<CameraIcon size={16} />
							Photos
						</div>
						<Badge border>Experimental</Badge>
					</Command.Item>
				</Command.Group>
			</Command.List>
		</Command.Dialog>
	)
}
