import cx from "clsx";

import Header from "@components/navigation/header";
import Sidebar from "@components/navigation/sidebar";
import BottomNavigation from "@components/navigation/bottom-navigation";
import GlobalMusicPlayer from "@components/global-music-player";
import { usePlayer } from "@store/player-context";

function Layout({ children }) {
  const { trackId } = usePlayer();

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

      <div className={cx("pt-28 xl:pt-0", { "pt-44 xl:pt-0": trackId })}>
        <BottomNavigation />
      </div>
    </div>
  );
}

export default Layout;
