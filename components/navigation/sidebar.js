import Link from "next/link";
import { useRouter } from "next/router";
import cx from "clsx";
import {
  HomeIcon,
  HeartIcon,
  CollectionIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";

function Sidebar() {
  const { pathname } = useRouter();

  const linkStyle = "hover:text-indigo-500 transition-colors duration-300";

  return (
    <div className="relative h-screen bg-gray-800 text-gray-50">
      <header className="absolute pt-16 text-3xl font-bold tracking-wide text-white transform 2xl:text-4xl 2xl:tracking-wider left-1/2 -translate-x-2/4">
        <h2>Soundley</h2>
      </header>

      <nav className="absolute transform top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
        <ul className="space-y-10 text-sm font-semibold 2xl:text-xl">
          <li
            className={cx("flex items-center space-x-4", linkStyle, {
              "text-indigo-500": pathname === "/",
            })}>
            <Link href="/">
              <a>
                <HomeIcon className="h-7 w-7 xl:h-8 xl:w-8" />
              </a>
            </Link>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li
            className={cx("flex items-center space-x-4", linkStyle, {
              "text-indigo-500": pathname === "/genres",
            })}>
            <Link href="/genres">
              <a>
                <VolumeUpIcon className="cursor-pointer h-7 w-7 xl:h-8 xl:w-8" />
              </a>
            </Link>
            <Link href="/genres">
              <a>Genres</a>
            </Link>
          </li>
          <li
            className={cx("flex items-center space-x-4", linkStyle, {
              "text-indigo-500": pathname === "/favourites",
            })}>
            <Link href="/favourites">
              <a>
                <HeartIcon className="cursor-pointer h-7 w-7 xl:h-8 xl:w-8" />
              </a>
            </Link>
            <Link href="/favourites">
              <a>Favourites</a>
            </Link>
          </li>
          <li
            className={cx("flex items-center space-x-4", linkStyle, {
              "text-indigo-500": pathname === "/playlists",
            })}>
            <Link href="/playlists">
              <a>
                <CollectionIcon className="cursor-pointer h-7 w-7 xl:h-8 xl:w-8" />
              </a>
            </Link>
            <Link href="/playlists">
              <a>Playlists</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
