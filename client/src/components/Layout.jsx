import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />
      <main className="flex-grow bg-base-100">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

