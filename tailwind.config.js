/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#014d4d",
        lightColor: "#FFFFFF",
        mainGold: "#C5A363",
      },
    },
  },
  plugins: [],
});
