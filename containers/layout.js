import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import cx from "clsx";
import { useMediaQuery } from "react-responsive";

import Header from "@components/navigation/header";
import { usePlayer } from "@store/player-context";
import { useUser } from "@hooks/useUser";
import BottomNavigation from "@components/navigation/bottom-navigation";

const MusicPlayerPortal = dynamic(() => import("../hoc/music-player-portal"), {
  ssr: false,
});
const MusicPlayerPopup = dynamic(
  () => import("@components/global-player/music-player-popup"),
  { ssr: false }
);
const PlaylistPortal = dynamic(() => import("../hoc/playlist-portal"), {
  ssr: false,
});
const PlaylistPopup = dynamic(
  () => import("@components/playlist/playlist-popup"),
  { ssr: false }
);
const PopupBackdrop = dynamic(
  () => import("@components/playlist/popup-backdrop"),
  { ssr: false }
);
const GlobalMusicPlayer = dynamic(
  () => import("@components/global-player/global-music-player"),
  { ssr: false }
);
// const BottomNavigation = dynamic(
//   () => import("@components/navigation/bottom-navigation"),
//   { ssr: false }
// );
const Sidebar = dynamic(() => import("@components/navigation/sidebar"), {
  ssr: false,
});

function Layout({ children }) {
  const { pathname } = useRouter();

  const { trackId } = usePlayer();

  useUser();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  return (
    <div>
      {isDesktopOrLaptop ? <Sidebar /> : null}

      <div className="relative bg-gray-900 xl:pl-52 2xl:pl-72">
        <Header />

        {children}

        {trackId ? <GlobalMusicPlayer /> : null}
      </div>

      <PlaylistPortal>
        <PopupBackdrop />
        <PlaylistPopup />
      </PlaylistPortal>

      <div
        className={cx("pt-28 xl:pt-0", {
          "pt-44": trackId,
          "xl:pt-24": trackId && pathname !== "/",
        })}>
        {!isDesktopOrLaptop ? (
          <MusicPlayerPortal>
            <MusicPlayerPopup />
          </MusicPlayerPortal>
        ) : null}

        {!isDesktopOrLaptop ? <BottomNavigation /> : null}
      </div>
    </div>
  );
}

export default Layout;
