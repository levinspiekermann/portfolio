import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				border: 'var(--border)',
				silver: '#DFDFDE',
				'silver-dark': '#9B9B9B',
				'neutral-950': '#010101',
				'neutral-850': '#1C1C1C',
			},
			textDecorationThickness: {
				1.5: '1.5px',
			},
			textUnderlineOffset: {
				1.5: '1.5px',
				2.5: '2.5px',
			},
			transitionTimingFunction: {
				'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				'out-expo': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
			},
			keyframes: {
				'grayscale-to-color': {
					'0%': { filter: 'grayscale(1)' },
					'100%': { filter: 'grayscale(0)' },
				},
				'color-to-grayscale': {
					'0%': { filter: 'grayscale(0)' },
					'100%': { filter: 'grayscale(1)' },
				},
			},
			animation: {
				'grayscale-to-color': 'grayscale-to-color 0.5s ease-in',
				'color-to-grayscale': 'color-to-grayscale 0.5s ease-in-out',
			},
		},
	},
	plugins: [],
}
export default config
