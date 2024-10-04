import IconBox from '@/components/icon-box'
import ListContainer from '@/components/list/list-container'
import ListContent from '@/components/list/list-content'
import ListTitle from '@/components/list/list-title'
import Link from 'next/link'
import NowPlaying from './(components)/now-playing'

export default function Home() {
	return (
		<>
			<ListContainer>
				<ListTitle>
					<h1 className="flex items-center gap-1 text-white font-semibold">
						<Link href="/">Levin Spiekermann</Link>
					</h1>
					<h2 className="text-silver">Fullstack Developer</h2>
				</ListTitle>
				<ListContent>
					<p>
						Hi, I&apos;m Levin, a 15-year-old full-stack developer from Germany with a passion for
						creating intuitive and scalable web applications.
					</p>
					<p className="flex items-start flex-wrap gap-2">
						My primary tech stack includes{' '}
						<IconBox icon="/go-logo.svg" title="Golang" href="https://go.dev" />{' '}
						<IconBox icon="/ts-logo.svg" title="TypeScript" href="https://www.typescriptlang.org" />{' '}
						<IconBox icon="/next-logo.svg" title="Next.js" href="https://nextjs.org" />{' '}
						<IconBox icon="/react-logo.svg" title="React" href="https://reactjs.org" />{' '}
						<IconBox
							icon="/tailwind-logo.svg"
							title="Tailwind CSS"
							href="https://tailwindcss.com"
						/>{' '}
						which I use to build fast, modern, and responsive web applications.
					</p>
					<p>
						I love learning new technologies and improving my skills through hands-on projects.
						Whether it&apos;s backend logic or front-end design, I enjoy tackling the full
						development process to bring ideas to life.
					</p>
				</ListContent>
			</ListContainer>
			<NowPlaying />
		</>
	)
}
