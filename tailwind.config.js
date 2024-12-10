/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{html,tsx}",, './public/index.html'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['poppins', 'sans-serif']
  		},
  		colors: {
  			primary: {
  				DEFAULT: 'rgba(var(--gray))',
  				foreground: 'rgba(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'rgba(var(--blue))',
  				foreground: 'rgba(var(--secondary-foreground))'
  			},
  			background: 'rgba(var(--background))',
  			foreground: 'rgba(var(--foreground))',
  			card: {
  				DEFAULT: 'rgba(var(--card))',
  				foreground: 'rgba(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'rgba(var(--popover))',
  				foreground: 'rgba(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'rgba(var(--muted))',
  				foreground: 'rgba(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'rgba(var(--accent))',
  				foreground: 'rgba(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'rgba(var(--destructive))',
  				foreground: 'rgba(var(--destructive-foreground))'
  			},
  			border: 'rgba(var(--border))',
  			input: 'rgba(var(--input))',
  			ring: 'rgba(var(--ring))',
  			chart: {
  				'1': 'rgba(var(--chart-1))',
  				'2': 'rgba(var(--chart-2))',
  				'3': 'rgba(var(--chart-3))',
  				'4': 'rgba(var(--chart-4))',
  				'5': 'rgba(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

