import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { ErrorBoundary } from "react-error-boundary";
import { useMediaQuery } from "react-responsive";

import TopArtists from "@components/home-page/artists/top-artists";
import TopAlbums from "@components/home-page/albums/top-albums";

const DesktopPlayer = dynamic(
  () => import("@components/home-page/music-player/desktop-player"),
  { ssr: false }
);
const TopTracks = dynamic(
  () => import("@components/home-page/tracks/top-tracks"),
  { ssr: false }
);
const ErrorFallback = dynamic(() => import("@components/error-fallback"), {
  ssr: false,
});

function GridContainer() {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  return (
    <div className="home-grid-layout">
      <section className="relative px-4 py-4 bg-gray-800 rounded xl:order-1 2xl:order-none xl:col-span-8 xl:row-span-3 xl:px-6">
        <h2 className="mb-6 text-xl font-semibold tracking-wide md:text-2xl text-gray-50">
          Top Artists
        </h2>
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFallback
              resetErrorBoundary={resetErrorBoundary}
              queryKey={["artists"]}
            />
          )}>
          <TopArtists />
        </ErrorBoundary>
      </section>

      {isDesktopOrLaptop ? (
        <section className="py-4 bg-gray-800 rounded xl:order-3 2xl:order-none xl:row-span-3 2xl:row-span-6 xl:col-span-4 2xl:col-span-4">
          <DesktopPlayer />
        </section>
      ) : null}

      <section
        ref={ref}
        className="relative overflow-y-scroll bg-gray-800 rounded xl:order-2 2xl:order-none xl:row-span-3 xl:col-span-4 2xl:col-span-3 max-h-80">
        <h2 className="sticky top-0 z-10 py-4 pl-6 mb-6 text-xl font-semibold tracking-wide bg-gray-800 md:text-2xl text-gray-50">
          Top Albums
        </h2>

        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFallback
              resetErrorBoundary={resetErrorBoundary}
              queryKey={["albums"]}
            />
          )}>
          <TopAlbums />
        </ErrorBoundary>
      </section>

      {inView ? (
        <section className="relative overflow-y-scroll bg-gray-800 rounded xl:order-4 2xl:order-none xl:row-span-3 xl:col-span-8 2xl:col-span-5 max-h-80">
          <h2 className="sticky top-0 z-10 py-4 pl-6 mb-6 text-xl font-semibold tracking-wide bg-gray-800 md:text-2xl text-gray-50">
            Top Tracks
          </h2>

          <ErrorBoundary
            fallbackRender={({ resetErrorBoundary }) => (
              <ErrorFallback
                resetErrorBoundary={resetErrorBoundary}
                queryKey={["topTracks"]}
              />
            )}>
            <TopTracks />
          </ErrorBoundary>
        </section>
      ) : null}
    </div>
  );
}

export default GridContainer;
