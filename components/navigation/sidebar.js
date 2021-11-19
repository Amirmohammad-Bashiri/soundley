import Link from "next/link";

function Sidebar() {
  return (
    <div>
      <header>
        <h2>Soundley</h2>
      </header>

      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Explore</a>
            </Link>
          </li>
          <li>
            <Link href="/genres">
              <a>Genres</a>
            </Link>
          </li>
          <li>
            <Link href="/favourites">
              <a>Favourites</a>
            </Link>
          </li>
          <li>
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
