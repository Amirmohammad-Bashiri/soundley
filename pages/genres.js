import Image from "next/image";
import Link from "next/link";
import { QueryClient, dehydrate } from "react-query";

import { getGenres } from "@lib/genres";
import { deezerClient } from "@clients/deezer-client";
import { soundleyClient } from "@clients/soundley-client";
import { useGenres } from "@hooks/useGenres";

function GenresPage() {
  const { data } = useGenres(soundleyClient, "/genres");

  return (
    <main className="pb-6 mx-6 mt-10 rounded xl:pb-10 md:mt-14">
      <ul className="flex flex-wrap items-center justify-center md:justify-start md:gap-x-5 gap-y-10">
        {data.map(genre => (
          <li
            key={genre.id}
            className="transition duration-300 hover:scale-105">
            <Link href={`/genre/${genre.id}`}>
              <a>
                <div className="relative h-40 rounded md:h-32 w-72 md:w-60 xl:h-32 xl:w-60 2xl:h-40 2xl:w-72">
                  <Image
                    src={genre.picture_medium}
                    alt="Genre Cover"
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                  <div className="absolute w-full h-full rounded border-gray-50 opacity-30 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
                  <strong className="absolute text-2xl font-bold tracking-wide text-indigo-100 md:text-2xl right-2 bottom-1 md:right-4 md:bottom-2">
                    {genre.name}
                  </strong>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    "genres",
    () => getGenres(deezerClient, "/genre"),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default GenresPage;
