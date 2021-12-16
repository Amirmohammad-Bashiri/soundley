import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import cx from "clsx";
import {
  HomeIcon,
  HeartIcon,
  CollectionIcon,
  ViewGridIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

function BottomNavigation() {
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  const { pathname } = useRouter();

  const { data: session, status } = useSession();

  const toggleIsSignOutOpen = () => {
    setIsSignOutOpen(prevState => !prevState);
  };

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
                <small>Favourites</small>
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
              {status === "unauthenticated" ? (
                <div className="flex flex-col items-center justify-center space-y-1">
                  <UserCircleIcon className="w-6 h-6 md:w-8 md:h-8" />
                  <small>Sign In</small>
                </div>
              ) : (
                <div className="relative w-8 h-8 md:w-10 md:h-10">
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
              )}
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default BottomNavigation;
