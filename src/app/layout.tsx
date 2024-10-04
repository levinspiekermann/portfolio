import { Providers } from '@/components/providers'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import CommandMenu from '../components/command-menu'
import Footer from './(components)/footer'
import './globals.css'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Levin Spiekermann',
	description:
		'I’m Levin, a full-stack developer from Germany with expertise in building dynamic web applications and seamless user experiences. Explore my portfolio for more information.',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://levinspiekermann.com',
		siteName: 'Levin Spiekermann',
		title: 'Levin Spiekermann',
		description:
			'I’m Levin, a full-stack developer from Germany with expertise in building dynamic web applications and seamless user experiences. Explore my portfolio for more information.',
		images: [
			{
				url: 'https://levinspiekermann.com/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Levin Spiekermann',
			},
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased text-base`}>
				<Providers>
					<main className="m:px-0 flex justify-center px-6 pb-24 pt-8 sm:pb-28 sm:pt-32">
						<article className="w-full max-w-[46rem] grow">
							<CommandMenu />
							{children}
							<Footer />
						</article>
					</main>
				</Providers>
				{/* <main className="m:px-0 flex justify-center px-6 pb-24 pt-8 sm:pb-28 sm:pt-32">
					<Providers>
						<CommandMenu />
						{children}
						<Footer />
					</Providers>
				</main> */}
				<Analytics />
			</body>
		</html>
	)
}
