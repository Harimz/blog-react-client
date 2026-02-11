import { Link } from "@tanstack/react-router";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-[#FBF8F3]/25 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="font-display text-xl font-bold text-foreground"
            >
              Logbook
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Thoughtful writing on technology, design, and the art of living
              well. Published weekly.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigate
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <span className="text-sm text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
                Categories
              </span>
              <span className="text-sm text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
                About
              </span>
              <span className="text-sm text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
                Contact
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
                Twitter
              </span>
              <span className="text-sm text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
                GitHub
              </span>
              <span className="text-sm text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
                RSS Feed
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © 2026 Logbook. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
