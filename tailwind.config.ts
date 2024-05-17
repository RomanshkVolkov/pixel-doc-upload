import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      screens: {
         xs: '320px',
         sm: '640px',
         md: '768px',
         lg: '1024px',
         xl: '1280px',
         '2xl': '1536px',
      },
   },
   darkMode: 'class',
   plugins: [
      nextui({
         addCommonColors: false,
         layout: {},
         themes: {
            dark: {
               layout: {},
               colors: {
                  primary: {
                     DEFAULT: '#f6f6f6',
                  },
                  secondary: {
                     DEFAULT: '#888888',
                  },
                  background: {
                     DEFAULT: 'rgba(0,0,0,.5)',
                     50: '#737584', // buttons
                     100: '#18181b', // container
                     200: '#000000', // subcontainer
                  },
                  foreground: {
                     DEFAULT: '#f6f6f6',
                  },
               },
            },
            light: {
               layout: {},
               colors: {
                  primary: {
                     DEFAULT: '#27272a',
                  },
                  secondary: {
                     DEFAULT: '#5d5d5d',
                  },
                  background: {
                     DEFAULT: '#ffffff',
                     50: '#b0b0b0', // buttons
                     100: '#f6f6f6', // container
                     200: '#e7e7e7', // subcontainer
                  },
                  foreground: {
                     DEFAULT: '#000000',
                  },
               },
            },
         },
      }),
   ],
};
export default config;
