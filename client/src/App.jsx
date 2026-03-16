import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Public pages
import HomePage         from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";
import PackageDetailPage from "./pages/PackageDetailPage";
import ContactPage      from "./pages/ContactPage";
import AboutPage        from "./pages/AboutPage";
import NotFoundPage     from "./pages/NotFoundPage";

// Admin
import { AdminAuthProvider }  from "./admin/store/adminAuth";
import AdminGuard             from "./admin/components/AdminGuard";
import AdminLayout            from "./admin/components/AdminLayout";
import AdminLogin             from "./admin/pages/AdminLogin";
import AdminDashboard         from "./admin/pages/AdminDashboard";
import AdminDestinations      from "./admin/pages/AdminDestinations";
import AdminItinerary         from "./admin/pages/AdminItinerary";
import { AdminCategories, AdminReviews, AdminQueries } from "./admin/pages/AdminCollections";

const router = createBrowserRouter([
  // ── Public routes ──────────────────────────────────────────
  { path: "/",               element: <HomePage /> },
  { path: "/destinations",   element: <DestinationsPage /> },
  { path: "/package/:id",    element: <PackageDetailPage /> },
  { path: "/contact",        element: <ContactPage /> },
  { path: "/about",          element: <AboutPage /> },

  // ── Admin login (unprotected) ────────────────────────────────
  { path: "/admin/login",    element: <AdminLogin /> },

  // ── Admin protected routes ──────────────────────────────────
  {
    element: <AdminGuard />,
    children: [{
      element: <AdminLayout />,
      children: [
        { path: "/admin",              element: <AdminDashboard /> },
        { path: "/admin/destinations", element: <AdminDestinations /> },
        { path: "/admin/itinerary",    element: <AdminItinerary /> },
        { path: "/admin/categories",   element: <AdminCategories /> },
        { path: "/admin/reviews",      element: <AdminReviews /> },
        { path: "/admin/queries",      element: <AdminQueries /> },
      ],
    }],
  },

  // ── 404 ──────────────────────────────────────────────────────
  { path: "*",               element: <NotFoundPage /> },
]);

export default function App() {
  return (
    <AdminAuthProvider>
      <RouterProvider router={router} />
    </AdminAuthProvider>
  );
}
