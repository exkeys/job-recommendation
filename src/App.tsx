import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./router";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
