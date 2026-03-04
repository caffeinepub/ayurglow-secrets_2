import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminPage from "./pages/AdminPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ChronicPage from "./pages/ChronicPage";
import HairPage from "./pages/HairPage";
import HealthPage from "./pages/HealthPage";
import HomePage from "./pages/HomePage";
import LifestylePage from "./pages/LifestylePage";
import SkinPage from "./pages/SkinPage";

// Root Layout
function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen font-body">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4">🌿</div>
      <h1 className="font-display text-3xl font-bold text-[oklch(0.25_0.1_230)] mb-3">
        Page Not Found
      </h1>
      <p className="text-muted-foreground mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-[oklch(0.38_0.12_225)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[oklch(0.32_0.12_225)] transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
}

// Route definitions
const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const healthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/health",
  component: HealthPage,
});

const skinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/skin",
  component: SkinPage,
});

const hairRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hair",
  component: HairPage,
});

const lifestyleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lifestyle",
  component: LifestylePage,
});

const chronicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chronic",
  component: ChronicPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$id",
  component: BlogPostPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  healthRoute,
  skinRoute,
  hairRoute,
  lifestyleRoute,
  chronicRoute,
  blogRoute,
  blogPostRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
