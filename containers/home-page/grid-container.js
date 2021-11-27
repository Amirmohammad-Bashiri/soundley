import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";

import TopArtists from "@components/home-page/artists/top-artists";
import TopAlbums from "@components/home-page/albums/top-albums";
import ErrorFallback from "@components/error-fallback";

function GridContainer() {
  return (
    <div className="px-6 pb-6 mt-12 space-y-10 md:px-10 md:pb-8 xl:space-y-0 xl:gap-8 xl:grid-cols-12 xl:grid">
      <section className="col-span-8 px-4 py-4 bg-gray-800 rounded xl:px-6">
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

      <section className="hidden bg-gray-800 rounded xl:block xl:col-span-4">
        <h2>Music Player</h2>
      </section>

      <section className="relative overflow-y-scroll bg-gray-800 rounded xl:col-span-3 max-h-80">
        <h2 className="sticky top-0 z-10 py-4 pl-6 text-xl font-semibold tracking-wide bg-gray-800 md:text-2xl text-gray-50">
          Top Albums
        </h2>

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

      <section className="bg-gray-800 rounded xl:col-span-5">
        <h2>Top Charts</h2>
      </section>
    </div>
  );
}

export default GridContainer;
