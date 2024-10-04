'use client'

import Badge from '@/components/badge'
import ListContainer from '@/components/list/list-container'
import ListContent from '@/components/list/list-content'
import ListTitle from '@/components/list/list-title'
import MediaCard from '@/components/media-card'
import { SpotifyPlayback } from '@/types/spotify'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNowStrict } from 'date-fns'

export default function NowPlaying() {
	const { data, isLoading } = useQuery({
		queryKey: ['spotify-listening'],
		queryFn: async () => {
			const response = await fetch('/api/spotify')

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data: SpotifyPlayback = await response.json()
			return data
		},
		refetchInterval: 15 * 1000,
	})

	return (
		<ListContainer>
			<ListTitle border className="flex items-center gap-2">
				<h3 className="text-silver">Listening</h3>
				{data?.is_playing ? (
					<Badge isLive>Live</Badge>
				) : (
					<Badge>
						{formatDistanceToNowStrict(new Date(data?.timestamp ?? 0), {
							addSuffix: true,
						})}
					</Badge>
				)}
			</ListTitle>
			<ListContent border>
				<MediaCard
					image={{
						alt: 'Spotify Album Cover',
						title: 'Spotify Album Cover',
						src: data?.album_image_url ?? '',
						width: 64,
						height: 64,
					}}
					title={data?.track_name}
					subtitle={`${data?.artists.join(', ')} • ${data?.album_name}`}
					href={data?.track_link}
					loading={isLoading}
				/>
			</ListContent>
		</ListContainer>
	)
}
