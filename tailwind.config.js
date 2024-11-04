/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    colors: {
      gray100: "#F6F6F6",
      gray200: "#EEEEEE",
      gray300: "#CCCCCC",
      gray400: "#999999",
      gray500: "#555555",
      gray600: "#4A4A4A",
      gray700: "#3A3A3A",
      gray800: "#2B2B2B",
      gray900: "#181818",
      white: "#FFFFFF",
      black: "#000000",
      error: "#DC3A3A",
      surface: "#F6F8FF",
      green100: "#E4FBDC",
      green200: "#D0F5C3",
      green300: "#9BE282",
      green400: "#60CF37",
      green500: "#2BA600",
      blue100: "#E2F5FF",
      blue200: "#B1E4FF",
      blue300: "#7CD2FF",
      blue400: "#34B9FF",
      blue500: "#00A2FE",
      beige100: "#FFF0D6",
      beige200: "#FFE2AD",
      beige300: "#FFC583",
      beige400: "#FFAE65",
      beige500: "#FF8832",
      purple100: "#F8F0FF",
      purple200: "#ECD9FF",
      purple300: "#DCB9FF",
      purple400: "#C894FD",
      purple500: "#AB57FF",
      purple600: "#9935FF",
      purple700: "#861DEE",
      purple800: "#6E0AD1",
      purple900: "#5603A7",
      dark1: "#121212",
      dark2: "#1E1E1E",
      dark3: "#252525",
      dark4: "#2E2E2E",
    },
    fontFamily: {
      extraLight: ["Pretendard-ExtraLight"],
      light: ["Pretendard-Light"],
      regular: ["Pretendard-Regular"],
      bold: ["Pretendard-Bold"],
    },
    extend: {
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200%" },
          100: { backgroundPosition: "-200%" },
        },
      },
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(to right, #D9D9D9 0%, #EDEEF1 50%, #D9D9D9 100%)",
      },
      backgroundSize: {
        custom: "300% 100%",
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
        pretendard: ["Pretendard", "sans-serif"],
        custom: ["나눔명조", "나눔손글씨 손편지체", "serif"], // 다른 폰트를 추가하고 싶다면 여기에 추가
      },
      screens: {
        mobile: "376px",
        tablet: "1025px",
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@tailwindcss/line-clamp"),
  ],
};
