import Link from "next/link";
import Image from "next/image";

import { useArtists } from "@hooks/useArtists";

import artistImage from "../../public/artist.jpg";

function GridContainer() {
  const { data, isLoading, isError } = useArtists();

  if (isError) {
    return <h1>Could not get top artists</h1>;
  }

  return (
    <div className="grid grid-cols-12 gap-8 px-10 pb-8 mt-12">
      <section className="col-span-7 bg-gray-800 rounded xl:py-4 xl:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-wide md:text-2xl lg:text-3xl text-gray-50">
            Top Artists
          </h2>
          <Link href="/artists/">
            <a className="text-sm font-medium text-gray-300 md:text-base">
              View All
            </a>
          </Link>
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <Link href="/artists/:someid">
            <a>
              <div className="w-24 h-24 bg-blue-500 rounded-lg"></div>
            </a>
          </Link>
          <p>Adele</p>
        </div>
      </section>

      <section className="col-span-5 bg-gray-800 rounded">
        <h2>Music Player</h2>
      </section>

      <section className="col-span-3 overflow-y-scroll bg-gray-800 rounded xl:py-4 xl:px-6 max-h-72">
        <h2>Top Albums</h2>
        <div className="w-24 h-24 bg-blue-500 rounded-lg"></div>
        <div className="w-24 h-24 bg-blue-500 rounded-lg"></div>
        <div className="w-24 h-24 bg-blue-500 rounded-lg"></div>
        <div className="w-24 h-24 bg-blue-500 rounded-lg"></div>
        <div className="w-24 h-24 bg-blue-500 rounded-lg"></div>
        <div className="w-24 h-24 bg-blue-500 rounded-lg"></div>
        <div className="w-24 h-24 bg-blue-500 rounded-lg"></div>
        <div className="w-24 h-24 bg-blue-500 rounded-lg"></div>
      </section>

      <section className="col-span-4 bg-gray-800 rounded">
        <h2>Top Charts</h2>
      </section>
    </div>
  );
}

export default GridContainer;
