import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function MainLayout({ children }) {
  return (
    <div className="bg-[#F6E28B] min-h-screen overflow-x-hidden">

      <Navbar />

      <main>
        {children}
      </main>

      <Footer />

    </div>
  );
}

export default MainLayout;