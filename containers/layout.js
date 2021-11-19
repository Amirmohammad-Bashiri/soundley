import Sidebar from "@components/navigation/sidebar";

function Layout({ children }) {
  return (
    <div>
      <div>
        <Sidebar />
      </div>

      <div>
        {/* header */}

        {children}
      </div>
    </div>
  );
}

export default Layout;
