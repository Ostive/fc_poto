import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E0E10",
        cream: "#F2EDE4",
        paper: "#EAE2D2",
        navy: {
          DEFAULT: "#1F2A60",
          deep: "#0C1537",
          electric: "#3B4A99"
        },
        ocre: "#E0531F",
        moss: "#2A4D2F",
        bone: "#D9CDB5"
      },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      letterSpacing: {
        tightest: "-0.06em",
        tighter2: "-0.045em"
      },
      animation: {
        ticker: "ticker 35s linear infinite",
        reveal: "reveal 1.1s cubic-bezier(.2,.7,.2,1) forwards",
        blink: "blink 1.4s steps(2, end) infinite",
        pulseDot: "pulseDot 1.8s ease-in-out infinite"
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        reveal: {
          "0%": { transform: "translateY(28px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" }
        },
        pulseDot: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.6)", opacity: ".55" }
        }
      }
    }
  },
  plugins: []
};

export default config;
