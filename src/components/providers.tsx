'use client'

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import { PropsWithChildren, useState } from 'react'

export const Providers = ({ children }: PropsWithChildren) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				queryCache: new QueryCache({
					onError: (err) => {
						let errorMessage: string
						if (err instanceof Error) {
							errorMessage = err.message
						} else {
							errorMessage = 'An unknown error occurred.'
						}

						console.log(errorMessage)
					},
				}),
			})
	)

	return (
		<>
			<Analytics />
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</>
	)
}
