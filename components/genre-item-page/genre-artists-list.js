import Link from "next/link";
import Image from "next/image";

function GenreArtistsList({ artists }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 md:gap-x-6 xl:gap-x-8 gap-y-10">
      {artists.map(artist => (
        <li key={artist.id} className="col-span-1">
          <Link href={`/artists/${artist.id}`}>
            <a>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative rounded-sm w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 2xl:w-44 2xl:h-44">
                  <Image
                    src={artist.picture_medium}
                    alt="Artist Cover"
                    layout="fill"
                    className="rounded-sm"
                  />
                  <div className="absolute w-full h-full rounded-sm border-gray-50 opacity-30 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
                </div>
                <strong className="text-center text-gray-100 md:text-lg">
                  {artist.name}
                </strong>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GenreArtistsList;
