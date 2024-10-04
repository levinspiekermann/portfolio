import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function timeToRelativeTimeString(time: number) {
	const seconds = Math.floor(time % 60)
	const minutes = Math.floor(time / 60) % 60
	const hours = Math.floor(time / 60 / 60) % 24
	const days = Math.floor(time / 60 / 60 / 24)

	if (days > 0) {
		return `${days} Days ago`
	} else if (hours > 0) {
		return `${hours} Hours ago`
	} else if (minutes > 0) {
		return `${minutes} Minutes ago`
	} else {
		return `${seconds} Seconds ago`
	}
}
