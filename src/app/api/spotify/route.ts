import { RawCurrentSong, RawRecentlyPlayedSong } from '@/types/spotify'
import { NextResponse } from 'next/server'

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'

interface TokenResponse {
	access_token: string
	token_type: string
	expires_in: number
	scope: string
	refresh_token?: string
}

async function getAccessToken() {
	return await fetch(SPOTIFY_TOKEN_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
			).toString('base64')}`,
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? '',
		}),
		next: { revalidate: 3200 },
	})
}

async function getRecentlyPlayedSong(accessToken: string) {
	return await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		next: { revalidate: 5 * 60 },
	})
}

async function getNowPlayingSong(accessToken: string) {
	return await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		next: { revalidate: 15 },
	})
}

export async function GET(request: Request) {
	const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

	if (!refreshToken) {
		return NextResponse.json({ error: 'Missing refresh token' }, { status: 400 })
	}

	const clientId = process.env.SPOTIFY_CLIENT_ID
	const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

	if (!clientId || !clientSecret) {
		return NextResponse.json({ error: 'Missing client credentials' }, { status: 500 })
	}

	const tokenResponse = await getAccessToken()

	if (!tokenResponse.ok) {
		throw new Error(`HTTP error! status: ${tokenResponse.status}`)
	}

	const tokenData: TokenResponse = await tokenResponse.json()

	try {
		const nowPlayingResponse = await getNowPlayingSong(tokenData.access_token)

		if (nowPlayingResponse.status > 204) {
			throw new Error(`HTTP error! status: ${nowPlayingResponse.status}`)
		}

		if (nowPlayingResponse.status === 204) {
			// No song is currently playing
			const recentlyPlayedResponse = await getRecentlyPlayedSong(tokenData.access_token)
			const recentlyPlayedData: RawRecentlyPlayedSong = await recentlyPlayedResponse.json()
			const recentlyPlayedTrack = recentlyPlayedData.items[0].track

			return NextResponse.json({
				timestamp: new Date(recentlyPlayedData.items[0].played_at).getTime(),
				is_playing: false,
				album_image_url: recentlyPlayedTrack.album.images[0].url,
				artists: recentlyPlayedTrack.album.artists.map((artist) => artist.name),
				track_name: recentlyPlayedTrack.name,
				album_name: recentlyPlayedTrack.album.name,
				track_link: recentlyPlayedTrack.external_urls.spotify,
			})
		}

		const playingTrackData: RawCurrentSong = await nowPlayingResponse.json()

		if (!playingTrackData) {
			return NextResponse.json({ error: 'Failed to get playing track' }, { status: 500 })
		}

		return NextResponse.json({
			timestamp: playingTrackData.timestamp ?? 0,
			is_playing: playingTrackData.is_playing,
			album_image_url: playingTrackData.item.album.images[0].url,
			artists: playingTrackData.item.album.artists.map((artist) => artist.name),
			track_name: playingTrackData.item.name,
			album_name: playingTrackData.item.album.name,
			track_link: playingTrackData.item.external_urls.spotify,
		})
	} catch (error) {
		console.error('Error refreshing token:', error)
		return NextResponse.json({ error: 'Failed to refresh token' }, { status: 500 })
	}
}
