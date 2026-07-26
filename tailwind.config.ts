import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#09090B",
        graphite: "#3F3F46",
        bone: "#F7F7F4",
        emerald: "#0F8A6C",
        fog: "#D6D3D1",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.12), 0 20px 60px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(0,200,150,0.08), transparent 42%), linear-gradient(135deg, #0A0A0A 0%, #121212 40%, #1A1A1A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
