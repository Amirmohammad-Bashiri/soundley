import Header from "@components/navigation/header";
import Sidebar from "@components/navigation/sidebar";

function Layout({ children }) {
  return (
    <div className="grid h-screen grid-cols-5 xl:grid-cols-7">
      <div className="hidden xl:block">
        <Sidebar />
      </div>

      <div className="col-span-5 bg-gray-900 xl:col-span-6">
        <Header />

        {children}
      </div>
    </div>
  );
}

export default Layout;
