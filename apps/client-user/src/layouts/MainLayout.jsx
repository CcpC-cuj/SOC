// MainLayout.jsx
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* CONTENT */}
      <div className="relative z-10">

        {/* NAVBAR */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <Navbar />
        </div>

        {/* PAGE */}
        <main className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

      </div>

    </div>
  );
};

export default MainLayout;