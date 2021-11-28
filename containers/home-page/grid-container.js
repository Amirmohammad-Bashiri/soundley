import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";
import { ViewGridAddIcon } from "@heroicons/react/solid";

import TopArtists from "@components/home-page/artists/top-artists";
import TopAlbums from "@components/home-page/albums/top-albums";
import TopTracks from "@components/home-page/tracks/top-tracks";
import ErrorFallback from "@components/error-fallback";

function GridContainer() {
  return (
    <div className="home-grid-layout">
      <section className="relative px-4 py-4 bg-gray-800 rounded xl:order-1 2xl:order-none xl:col-span-8 xl:row-span-3 xl:px-6">
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

      <section className="hidden py-4 bg-gray-800 rounded xl:order-3 2xl:order-none xl:row-span-3 2xl:row-span-6 xl:block xl:col-span-5 2xl:col-span-4">
        <div className="flex items-center justify-between px-6 text-gray-50">
          <h2 className="text-xl font-semibold">Player</h2>
          <button>
            <ViewGridAddIcon className="w-5 h-5 cursor-pointer xl:h-6 xl:w-6" />
          </button>
        </div>

        <div className="flex items-center px-16 mt-10 jusitfy-center">
          <div className="w-full bg-blue-500 rounded h-80"></div>
        </div>

        <div className="flex flex-col items-center justify-center px-6 mt-5 space-y-2">
          <h1 className="text-2xl font-semibold text-gray-50">
            Butterfly Effect
          </h1>
          <Link href="/artists/:artistid">
            <a className="text-lg text-gray-300">Travis Scott</a>
          </Link>
        </div>

        <div className="flex items-center px-6 mt-4 space-x-4">
          <time className="font-medium text-gray-100">0:00</time>
          <div className="w-full h-1 bg-gray-600 rounded cursor-pointer">
            <div className="relative w-20 h-full bg-gray-100 rounded">
              <div className="absolute right-0 w-3 h-3 bg-indigo-600 border-2 border-gray-100 rounded-full cursor-pointer -top-1"></div>
            </div>
          </div>
          <time className="font-medium text-gray-100">3:25</time>
        </div>

        <div className="mt-10 ">
          <div className="flex items-center justify-center space-x-8">
            <i className="text-gray-100 cursor-pointer fas fa-redo-alt fa-lg"></i>
            <i className="text-gray-100 cursor-pointer fas fa-step-backward fa-lg"></i>
            <i className="p-4 text-gray-100 bg-indigo-500 rounded cursor-pointer fas fa-play fa-lg"></i>
            <i className="text-gray-100 cursor-pointer fas fa-step-forward fa-lg"></i>
            <i className="text-gray-100 cursor-pointer fas fa-random fa-lg"></i>
          </div>
        </div>
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

        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFallback
              resetErrorBoundary={resetErrorBoundary}
              queryKey="tracks"
            />
          )}>
          <TopTracks />
        </ErrorBoundary>
      </section>
    </div>
  );
}

export default GridContainer;
