import { extendTheme } from "@chakra-ui/react";


export const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  colors: {
    blue: {
      "900": "#051828",
      "800": "#012A4A",
      "700": "#0C263B",
      "600": "#01395A",
      "500": "#014D6E",
      "400": "#016F91",
      "300": "#168AAD",
      "200": "#0092B5",
      "100": "#00A3C6",
      "50": "#00B4D8",
    },
    green: {
      "900": "#0E4A38",
      "800": "#135532",
      "700": "#17612C",
      "600": "#1C6C25",
      "500": "#21771F",
      "400": "#258319",
      "300": "#2A8E13",
      "200": "#2F990C",
      "100": "#33A506",
      "50": "#38B000",
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  styles: {
    global: {
      body: {
        bgGradient: "linear(238deg, blue.900 0%,blue.700 100%)",
        color: "gray.50",
        minH: "100vh",
      },
    },
  },
});
