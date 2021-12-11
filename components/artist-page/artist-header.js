import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function ArtistHeader() {
  const [artistData, setArtistData] = useState(null);

  const { query } = useRouter();

  useEffect(() => {
    fetch(`/api/artist/${query.artistId}`)
      .then(response => response.json())
      .then(data => setArtistData(data.artistInfo));
  }, [query.artistId]);

  return (
    <div className="flex flex-col items-center justify-center w-full md:space-x-8 md:justify-start md:flex-row">
      <div className="relative rounded-sm w-52 h-52 xl:w-64 xl:h-64">
        {artistData ? (
          <Image
            src={artistData.picture_big}
            alt="Artist Cover"
            layout="fill"
            className="rounded-sm"
            objectFit="contain"
            priority={true}
          />
        ) : null}
        <div className="absolute top-0 left-0 rounded w-52 h-52 xl:w-64 xl:h-64 opacity-20 border-gray-50 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
      </div>

      <div className="space-y-5">
        <h3 className="hidden text-lg font-semibold text-gray-100 md:block">
          Artist
        </h3>

        <h1 className="text-2xl font-bold text-center md:text-left md:text-4xl xl:text-5xl 2xl:text-6xl text-gray-50">
          {artistData?.name}
        </h1>
      </div>
    </div>
  );
}

export default ArtistHeader;
