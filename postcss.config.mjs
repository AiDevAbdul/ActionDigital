/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // ✅ New package name for Tailwind v4
    autoprefixer: {},
  },
};
