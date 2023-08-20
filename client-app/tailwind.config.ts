import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'banner': "url('banner.png')",
      },
      colors: {
        primary: {
          DEFAULT: '#311d72',
          transparent: 'rgba(49, 29, 114, 0.62)',
          darken: '#251655'
        },
        secondary: {
          DEFAULT: '#f52d54',
          transparent: 'rgba(245, 46, 85, 0.62)',
          darken: '#e50b36'
        },
        tertiary: {
          DEFAULT: '#5252db'
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
export default config
