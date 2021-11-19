import Link from "next/link";
import { useRouter } from "next/router";
import cx from "clsx";

function Sidebar() {
  const { pathname } = useRouter();

  const linkStyle = "hover:text-blue-500 transition-colors duration-300";

  return (
    <div className="relative bg-gray-800 text-gray-50 h-screen">
      <header className="font-bold text-white text-3xl tracking-wider absolute left-1/2 transform -translate-x-2/4 pt-16">
        <h2>Soundley</h2>
      </header>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4">
        <nav>
          <ul className="space-y-10 font-semibold text-xl">
            <li
              className={cx(linkStyle, { "text-blue-500": pathname === "/" })}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li
              className={cx(linkStyle, {
                "text-blue-500": pathname === "/genres",
              })}>
              <Link href="/genres">
                <a>Genres</a>
              </Link>
            </li>
            <li
              className={cx(linkStyle, {
                "text-blue-500": pathname === "/favourites",
              })}>
              <Link href="/favourites">
                <a>Favourites</a>
              </Link>
            </li>
            <li
              className={cx(linkStyle, {
                "text-blue-500": pathname === "/playlists",
              })}>
              <Link href="/playlists">
                <a>Playlists</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
