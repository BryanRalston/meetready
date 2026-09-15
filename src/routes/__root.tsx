import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/device-frame";
import { AuthProvider } from "@/lib/auth/provider";
import appCss from "../styles.css?url";

const APP_NAME = "MeetReady";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      { name: "theme-color", content: "#0c0c0e" },
      {
        name: "description",
        content: "She competes. You run the season. Household plans for JO and Xcel families.",
      },
      { name: "apple-mobile-web-app-capable", content: "yes" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: `${import.meta.env.BASE_URL}favicon.svg` },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: `${import.meta.env.BASE_URL}manifest.webmanifest` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="bg-stage text-fg font-sans">
        <AuthProvider>
          <DeviceFrame>
            <Outlet />
          </DeviceFrame>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
