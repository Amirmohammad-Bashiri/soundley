import Link from "next/link";
import { useRouter } from "next/router";
import cx from "clsx";
import {
  HomeIcon,
  HeartIcon,
  CollectionIcon,
  ViewGridIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

function BottomNavigation() {
  const { pathname } = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 z-20 w-full py-2 bg-black bg-opacity-90 xl:hidden">
      <ul className="flex items-center justify-around">
        <li
          className={cx("text-gray-100", {
            "text-indigo-500": pathname === "/",
          })}>
          <Link href="/">
            <a>
              <div className="flex flex-col items-center justify-center space-y-1">
                <HomeIcon className="w-6 h-6 md:w-8 md:h-8" />
                <small>Home</small>
              </div>
            </a>
          </Link>
        </li>
        <li
          className={cx("text-gray-100", {
            "text-indigo-500": pathname === "/genres",
          })}>
          <Link href="/genres">
            <a>
              <div className="flex flex-col items-center justify-center space-y-1">
                <ViewGridIcon className="w-6 h-6 md:w-8 md:h-8" />
                <small>Genres</small>
              </div>
            </a>
          </Link>
        </li>
        <li
          className={cx("text-gray-100", {
            "text-indigo-500": pathname === "/favourites",
          })}>
          <Link href="/favourites">
            <a>
              <div className="flex flex-col items-center justify-center space-y-1">
                <HeartIcon className="w-6 h-6 md:w-8 md:h-8" />
                <small>Genres</small>
              </div>
            </a>
          </Link>
        </li>
        <li
          className={cx("text-gray-100", {
            "text-indigo-500": pathname === "/playlists",
          })}>
          <Link href="/playlists">
            <a>
              <div className="flex flex-col items-center justify-center space-y-1">
                <CollectionIcon className="w-6 h-6 md:w-8 md:h-8" />
                <small>Playlists</small>
              </div>
            </a>
          </Link>
        </li>
        <li
          className={cx("text-gray-100", {
            "text-indigo-500": pathname === "/login",
          })}>
          <Link href="/login">
            <a>
              <div className="flex flex-col items-center justify-center space-y-1">
                <UserCircleIcon className="w-6 h-6 md:w-8 md:h-8" />
                <small>Profile</small>
              </div>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default BottomNavigation;
