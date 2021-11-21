import { useMediaQuery } from "react-responsive";
import Header from "@components/navigation/header";
import Sidebar from "@components/navigation/sidebar";

function Layout({ children }) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1124px)",
  });

  return (
    <div className="grid h-screen grid-cols-5 border-r-2 xl:grid-cols-7">
      {isDesktopOrLaptop ? (
        <div>
          <Sidebar />
        </div>
      ) : null}

      <div className="col-span-5 bg-gray-900 xl:col-span-6">
        <Header />

        {children}
      </div>
    </div>
  );
}

export default Layout;
