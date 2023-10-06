import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // colors: {
      //   teal: {
      //     DEFAULT: '#008F94',
      //   },
      //   coral: {
      //     DEFAULT: '#FF6B60',
      //   },
      //   gold: {
      //     DEFAULT: '#F5CD00',
      //   },
      //   gray: {
      //     DEFAULT: '#8A8A8A',
      //   },
      // },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),  // Ensure this plugin is installed via npm

  ],
}
export default config
