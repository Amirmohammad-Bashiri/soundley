import Header from "@components/navigation/header";
import Sidebar from "@components/navigation/sidebar";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-7 h-screen border-r-2">
      <div>
        <Sidebar />
      </div>

      <div className="col-span-6 bg-gray-900">
        <Header />

        {children}
      </div>
    </div>
  );
}

export default Layout;
