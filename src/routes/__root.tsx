import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import appCss from "../styles.css?url";
import { Navbar } from "@/shared/ui/components/navbar";
import { queryClient } from "@/providers/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/auth-provider";
import { MobileFabMenu } from "@/shared/ui/components/mobile-fab-menu";
import { Toaster as HotToaster } from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Footer } from "@/shared/ui/components/footer";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Blog",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Toaster position="top-center" />

            <HotToaster
              position="top-center"
              toastOptions={{
                error: {
                  style: {
                    background: "rgba(165, 0, 0, 0.65)",
                    color: "white",
                  },
                  icon: <MdErrorOutline className="size-6 text-white" />,
                },
                success: {
                  style: {
                    background: "rgba(32, 232, 0, 0.56)",
                    color: "white",
                  },
                },
                loading: {
                  icon: (
                    <AiOutlineLoading3Quarters className="size-4 animate-spin" />
                  ),
                },
              }}
            />

            <Navbar />

            <MobileFabMenu />

            {children}

            <Footer />
            {/* <TanStackDevtools
              config={{
                position: "bottom-right",
              }}
              plugins={[
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            /> */}
            <Scripts />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
