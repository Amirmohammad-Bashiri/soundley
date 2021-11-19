import Header from "@components/navigation/header";
import Sidebar from "@components/navigation/sidebar";

function Layout({ children }) {
  return (
    <div>
      <div>
        <Sidebar />
      </div>

      <div>
        <Header />

        {children}
      </div>
    </div>
  );
}

export default Layout;
