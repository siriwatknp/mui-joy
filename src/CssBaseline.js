import { GlobalStyles } from "@mui/styled-engine";

export const body = (theme) => ({
  color: theme.palette.text.primary,
  ...theme.typography.body1,
  backgroundColor: theme.palette.background.default,
  "@media print": {
    // Save printer ink.
    backgroundColor: theme.palette.common.white,
  },
});

export const styles = (theme) => {
  let defaultStyles = {
    html: {
      WebkitFontSmoothing: "antialiased", // Antialiasing.
      MozOsxFontSmoothing: "grayscale", // Antialiasing.
      // Change from `box-sizing: content-box` so that `width`
      // is not affected by `padding` or `border`.
      boxSizing: "border-box",
      // Fix font resize problem in iOS
      WebkitTextSizeAdjust: "100%",
    },
    "*, *::before, *::after": {
      boxSizing: "inherit",
    },
    "strong, b": {
      fontWeight: theme.vars.fontWeight.lg,
    },
    body: {
      margin: 0, // Remove the margin in all browsers.
      backgroundColor: theme.vars.palette.surface.default,
      "@media print": {
        // Save printer ink.
        backgroundColor: "#fff",
      },
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      "&::backdrop": {
        backgroundColor: theme.vars.palette.surface.default,
      },
    },
  };

  const themeOverrides = theme.components?.MuiCssBaseline?.styleOverrides;
  if (themeOverrides) {
    defaultStyles = [defaultStyles, themeOverrides];
  }

  return defaultStyles;
};

function CssBaseline() {
  return <GlobalStyles styles={styles} />;
}

export default CssBaseline;
