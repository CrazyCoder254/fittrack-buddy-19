import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { AuthProvider } from "../lib/auth";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-[8rem] leading-none text-primary">404</h1>
        <h2 className="mt-4 text-xl font-display tracking-wider">Off the grid</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This route doesn't exist. Head back and keep training.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl tracking-wider">Something broke</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="border border-border px-5 py-3 text-sm font-bold uppercase tracking-wider">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GMS — Gym Management System" },
      { name: "description", content: "An integrated Gym Management System for memberships, trainer workflows, and member performance tracking. Final Year Project, KCA University." },
      { property: "og:title", content: "GMS — Gym Management System" },
      { property: "og:description", content: "Integrated gym operations and fitness tracking. Final Year Project, KCA University." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SiteNav />
        <main className="pt-24">
          <Outlet />
        </main>
        <SiteFooter />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
