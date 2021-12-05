import Header from "@components/navigation/header";
import Sidebar from "@components/navigation/sidebar";
import BottomNavigation from "@components/navigation/bottom-navigation";
import GlobalMusicPlayer from "@components/global-music-player";

function Layout({ children }) {
  return (
    <div>
      <div className="hidden xl:block">
        <Sidebar />
      </div>

      <div className="relative bg-gray-900 xl:pl-52 2xl:pl-72">
        <Header />

        {children}

        <GlobalMusicPlayer />
      </div>

      <div className="mt-32">
        <BottomNavigation />
      </div>
    </div>
  );
}

export default Layout;
