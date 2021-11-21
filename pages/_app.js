import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { CssVarsProvider } from "@mui/joy/styles";
import { createSpacing, createBreakpoints } from "@mui/system";

import createEmotionCache from "../src/createEmotionCache";
import CssBaseline from "../src/CssBaseline";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssVarsProvider
        theme={{
          borderRadius: {
            default: "8px",
          },
          colorSchemes: {
            light: {
              palette: {
                primary: {
                  outlinedBorder: "var(--joy-palette-neutral-200)",
                },
                neutral: {
                  outlinedBorder: "var(--joy-palette-neutral-200)",
                },
              },
            },
            dark: {
              palette: {
                primary: {
                  outlinedBorder: "var(--joy-palette-neutral-600)",
                },
                neutral: {
                  outlinedBorder: "var(--joy-palette-neutral-600)",
                },
              },
            },
          },
          spacing: createSpacing(),
          breakpoints: createBreakpoints({}),
        }}
      >
        <CssBaseline />
        <Component {...pageProps} />
      </CssVarsProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
