import { useState } from "react";
import { useRouter } from "next/router";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";

import Layout from "@containers/layout";
import PlayerProvider from "@store/player-context";
import MusicPlayerPopupProvider from "@store/music-player-popup-context";

import "../styles/globals.css";
import PlaylistPopupProvider from "@store/playlist-popup-contenxt";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  const { query } = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Hydrate state={pageProps.dehydratedState}>
          <PlayerProvider albumId={query?.albumId} artistId={query?.artistId}>
            <MusicPlayerPopupProvider>
              <PlaylistPopupProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </PlaylistPopupProvider>
            </MusicPlayerPopupProvider>
          </PlayerProvider>
        </Hydrate>
      </SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
