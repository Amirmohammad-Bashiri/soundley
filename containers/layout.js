import Header from "@components/navigation/header";
import Sidebar from "@components/navigation/sidebar";

function Layout({ children }) {
  return (
    <div>
      <div className="hidden xl:block">
        <Sidebar />
      </div>

      <div className="bg-gray-900 xl:pl-52 2xl:pl-72">
        <Header />

        {children}
      </div>
    </div>
  );
}

export default Layout;
