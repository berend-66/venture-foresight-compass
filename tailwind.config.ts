
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                venture: {
                    blue: {
                        100: '#EDF2F7',
                        200: '#E2E8F0',
                        300: '#CBD5E0',
                        400: '#A0AEC0',
                        500: '#718096',
                        600: '#4A5568',
                        700: '#2A4365',
                        800: '#1A365D',
                        900: '#1A1F2C',
                    },
                    gray: {
                        100: '#F7FAFC',
                        200: '#F1F0FB',
                        300: '#E2E8F0',
                        400: '#CBD5E0',
                        500: '#A0AEC0',
                        600: '#718096',
                        700: '#4A5568',
                        800: '#2D3748',
                        900: '#1A202C',
                    },
                    accent: {
                        success: '#38A169',
                        warning: '#D69E2E',
                        danger: '#E53E3E',
                        info: '#3182CE',
                    }
                }
			},
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" }
                },
                "fade-out": {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" }
                },
                "scale-in": {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" }
                },
                "progress": {
                    "0%": { width: "0%" },
                    "100%": { width: "100%" }
                },
                "pulse-light": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.7" }
                },
                "ping-slow": {
                    "0%": { transform: "scale(1)", opacity: "1" },
                    "75%, 100%": { transform: "scale(1.5)", opacity: "0" }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.3s ease-out",
                "fade-out": "fade-out 0.3s ease-out",
                "scale-in": "scale-in 0.3s ease-out",
                "progress": "progress 1.5s ease-out",
                "pulse-light": "pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite"
            },
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
