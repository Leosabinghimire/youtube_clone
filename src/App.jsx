import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { AppThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Search from "./pages/Search/Search";
import Watch from "./pages/Watch/Watch";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

/** Keeps links from the previous `/video/:categoryId/:videoId` route working. */
function LegacyVideoRedirect() {
  const { videoId } = useParams();
  return <Navigate to={`/watch/${videoId}`} replace />;
}

export default function App() {
  return (
    <AppThemeProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="watch/:videoId" element={<Watch />} />
          <Route path="search" element={<Search />} />
          <Route path="video/:categoryId/:videoId" element={<LegacyVideoRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppThemeProvider>
  );
}
