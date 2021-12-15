import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import cx from "clsx";
import { useMediaQuery } from "react-responsive";

import Header from "@components/navigation/header";
import Sidebar from "@components/navigation/sidebar";
import BottomNavigation from "@components/navigation/bottom-navigation";
import GlobalMusicPlayer from "@components/global-player/global-music-player";
import { usePlayer } from "@store/player-context";
import { useUser } from "@hooks/useUser";

const MusicPlayerPortal = dynamic(() => import("../hoc/music-player-portal"), {
  ssr: false,
});
const MusicPlayerPopup = dynamic(
  () => import("@components/global-player/music-player-popup"),
  { ssr: false }
);

function Layout({ children }) {
  const { pathname } = useRouter();

  const { trackId } = usePlayer();

  useUser();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  return (
    <div>
      <div className="hidden xl:block">
        <Sidebar />
      </div>

      <div className="relative bg-gray-900 xl:pl-52 2xl:pl-72">
        <Header />

        {children}

        {trackId ? <GlobalMusicPlayer /> : null}
      </div>

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

        <BottomNavigation />
      </div>
    </div>
  );
}

export default Layout;
