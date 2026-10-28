import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        amsipro: ["'amsipro'", 'sans-serif'],
        amatemora: ["'amatemora'", 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        banner: 'url("banner.png")'
      },
      colors: {
        surface: '#FFFAF3',
        primary: {
          DEFAULT: '#FF8601',
          600: '#E06C00',
          transparent: 'rgba(255, 134, 1, 0.15)',
          darken: '#C95F00',
          light: '#FFF4E8'
        },
        secondary: {
          DEFAULT: '#A8C428',
          transparent: 'rgba(168, 196, 40, 0.2)',
          darken: '#7A9420'
        },
        tertiary: {
          DEFAULT: '#353838',
          light: '#F5F5F4'
        },
        success: {
          DEFAULT: '#6aa84f'
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#E06C00',
              foreground: '#FFFFFF'
            },
            secondary: {
              DEFAULT: '#A8C428',
              foreground: '#1C1917'
            },
            focus: '#E06C00',
            background: '#FFFAF3'
          }
        }
      }
    })
  ]
}
export default config
