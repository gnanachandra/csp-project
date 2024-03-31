/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'Nunito': "'Nunito', sans-serif",
                'Poppins': "'Poppins', sans-serif",
                'Raleway': "'Raleway', sans-serif",
                'Roboto': "'Roboto', sans-serif",
            }
        },
    },
    plugins: [],
}