import Image from "next/image";
import Link from "next/link";

import Loader from "@components/loader";
import NoResult from "./no-result";

function SearchResults({ searchResult, isLoading, activeTab }) {
  const result = searchResult?.data?.result;
  console.log(result);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader type="Oval" color="#D1D5DB" height={70} width={70} />
      </div>
    );

  return (
    <div className="py-2">
      {result && result.length === 0 ? (
        <NoResult />
      ) : (
        result && (
          <ul className="divide-y divide-gray-400">
            {result.map(item => (
              <li
                key={item.id}
                className="flex items-center px-5 pt-2 pb-3 space-x-10 text-gray-100">
                <div className="relative flex-shrink-0 w-14 h-14">
                  {activeTab === "track" ? (
                    <>
                      {item && item.album && (
                        <Image
                          layout="fill"
                          src={item.album.cover_medium}
                          alt="Track Cover"
                          className="rounded-md"
                        />
                      )}
                    </>
                  ) : activeTab === "album" ? (
                    <>
                      {item.cover_medium && (
                        <Image
                          layout="fill"
                          src={item.cover_medium}
                          alt="Album Cover"
                          className="rounded-md"
                        />
                      )}
                    </>
                  ) : activeTab === "artist" ? (
                    <>
                      {item.picture_medium && (
                        <Image
                          layout="fill"
                          src={item.picture_medium}
                          className="rounded-md"
                          alt="Artist Cover"
                        />
                      )}
                    </>
                  ) : null}
                </div>
                {activeTab === "album" ? (
                  <Link href={`/albums/${item.id}`}>
                    <a className="text-lg font-bold line-clamp-1">
                      {item.title}
                    </a>
                  </Link>
                ) : activeTab === "artist" ? (
                  <Link href={`/artists/${item.id}`}>
                    <a className="text-lg font-bold line-clamp-1">
                      {item.name}
                    </a>
                  </Link>
                ) : (
                  <Link href={`/tracks/${item.id}`}>
                    <a className="text-lg font-bold line-clamp-1">
                      {item.title}
                    </a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export default SearchResults;
