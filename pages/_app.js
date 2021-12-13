import { useState } from "react";
import { useRouter } from "next/router";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Layout from "@containers/layout";
import PlayerProvider from "@store/player-context";
import MusicPlayerPopupProvider from "@store/music-player-popup-context";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  const { query } = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <PlayerProvider albumId={query?.albumId} artistId={query?.artistId}>
          <MusicPlayerPopupProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MusicPlayerPopupProvider>
        </PlayerProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
