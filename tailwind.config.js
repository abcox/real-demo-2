/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}', // Include Angular files
    './node_modules/@angular/material/**/*.js', // Include Angular Material
  ],
  theme: {
    extend: {},
  },
  plugins: [], // Add Tailwind plugins here
  corePlugins: {
    preflight: false, // Disable base styles if causing issues
  }, // This property is where you can toggle features
}

