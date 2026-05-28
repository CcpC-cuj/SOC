// MainLayout.jsx
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import SceneEnvironment from "../components/common/SceneEnvironment";
import Footer from "../components/common/Footer";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHome =
    location.pathname === "/";
  const isShowcase =
    location.pathname === "/projects" ||
    /^\/projects\/[^/]+$/.test(
      location.pathname
    );
  const useMarketingBackdrop =
    isHome || isShowcase;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--soc-bg)] text-[var(--soc-ink)]">
      {useMarketingBackdrop ? (
        <SceneEnvironment
          variant="marketing"
          showLandscape={isHome}
        />
      ) : null}

      <div className="relative z-10">
        <div className="mx-auto w-full max-w-[90rem] px-4 pb-10 pt-4 sm:px-6 lg:px-8 xl:px-10">
          <Navbar />

          <main className="mt-6">
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
