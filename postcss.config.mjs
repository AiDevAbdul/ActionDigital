/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},  // ✅ New package name for Tailwind v4
    autoprefixer: {},
  },
};

export default config;
