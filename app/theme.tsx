import { type ThemeConfig, extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === "light" ? "green" : "white",
        // bg: mode("green", "white")(props),
      },
    }),
  },
});

export default theme;
