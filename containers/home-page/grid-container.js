import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";

import TopArtists from "@components/home-page/artists/top-artists";
import TopAlbums from "@components/home-page/albums/top-albums";
import TopTracks from "@components/home-page/tracks/top-tracks";
import ErrorFallback from "@components/error-fallback";

function GridContainer() {
  return (
    <div className="home-grid-layout">
      <section className="px-4 py-4 bg-gray-800 rounded xl:order-1 2xl:order-none xl:col-span-8 xl:row-span-3 xl:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-wide md:text-2xl text-gray-50">
            Top Artists
          </h2>
          <Link href="/artists">
            <a className="text-sm font-medium text-gray-300 md:text-base">
              View All
            </a>
          </Link>
        </div>
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFallback
              resetErrorBoundary={resetErrorBoundary}
              queryKey="artists"
            />
          )}>
          <TopArtists />
        </ErrorBoundary>
      </section>

      <section className="hidden bg-gray-800 rounded xl:order-3 2xl:order-none xl:row-span-3 2xl:row-span-6 xl:block xl:col-span-5 2xl:col-span-4">
        <h2>Music Player</h2>
      </section>

      <section className="relative overflow-y-scroll bg-gray-800 rounded xl:order-2 2xl:order-none xl:row-span-3 xl:col-span-4 2xl:col-span-3 max-h-80">
        <div className="sticky top-0 z-10 flex items-center justify-between py-4 mb-6 bg-gray-800">
          <h2 className="pl-6 text-xl font-semibold tracking-wide md:text-2xl text-gray-50">
            Top Albums
          </h2>
          <Link href="/albums">
            <a className="pr-6 text-sm font-medium text-gray-300 md:text-base">
              View All
            </a>
          </Link>
        </div>

        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFallback
              resetErrorBoundary={resetErrorBoundary}
              queryKey="albums"
            />
          )}>
          <TopAlbums />
        </ErrorBoundary>
      </section>

      <section className="relative overflow-y-scroll bg-gray-800 rounded xl:order-4 2xl:order-none xl:row-span-3 xl:col-span-7 2xl:col-span-5 max-h-80">
        <div className="sticky top-0 z-10 flex items-center justify-between py-4 mb-6 bg-gray-800">
          <h2 className="pl-6 text-xl font-semibold tracking-wide md:text-2xl text-gray-50">
            Top Tracks
          </h2>
          <Link href="/tracks">
            <a className="pr-6 text-sm font-medium text-gray-300 md:text-base">
              View All
            </a>
          </Link>
        </div>

        <TopTracks />
      </section>
    </div>
  );
}

export default GridContainer;
