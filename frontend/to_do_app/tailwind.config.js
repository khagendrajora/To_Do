/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#e0e7ff",
        title: "#fcd34d",
        description: "#fafafa",
        text: "#e7e5e4",
        deadline: "#dc2626",
        component: "#bae6fd",
        buttonbg: "#fbbf24"

      },
      screens: {
        sm: '320px',
        md: '768px',
        lg: '1144px',
        xl: '1024px',
        xxl: '1280',
        xxxl: "1536"
      },
      spacing: {
        '1': '8px',
        '2': '12px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
      },
      fonts: {
        sans: 'font-sans',
        mono: "font-mono"

      },
      width: {
        wsm: 24,
        wmd: 28,
        wlg: 64,
        wxl: 80,
        wxxl: 96


      },
      text: {
        tsize: '0.1rem'

      }
    },
  },
  plugins: [],
}

