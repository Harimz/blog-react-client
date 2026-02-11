import { PostPreview } from "../../domain/types";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Props {
  posts: PostPreview[];
}

export const HeaderCarousel = ({ posts }: Props) => {
  const [current, setCurrent] = useState(0);
  const featured = posts.slice(0, 3);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % featured.length);
  }, [featured.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + featured.length) % featured.length);
  }, [featured.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const heroImages = posts.map((post) => post.coverImageUrl);

  const post = featured[current];
  if (!post) return null;

  return (
    <section className="relative overflow-hidden bg-foreground">
      <div className="absolute inset-0">
        <img
          src={heroImages[current % heroImages.length]}
          alt=""
          className="h-full w-full object-cover opacity-40 transition-all duration-700"
        />

        <div className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/40 to-transparent" />
      </div>

      <div className="max-w-400 w-[95%] relative mx-auto flex min-h-120 items-end pb-12 pt-20 md:min-h-210">
        <div className="max-w-2xl animate-fade-in">
          <span className="rounded-full bg-custom-primary/50 px-3 py-1 text-xs font-semibold text-primary-foreground">
            {post.category.name}
          </span>

          <Link to="/posts/$postId" params={{ postId: String(post.postId) }}>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-primary-foreground md:text-5xl hover:underline decoration-custom-primary underline-offset-4">
              {post.title}
            </h1>
          </Link>

          <p className="mt-4 text-sm text-primary-foreground/60">
            By {post.author.name} ·{" "}
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="absolute bottom-12 right-4 flex items-center gap-2 md:right-8">
          <button
            onClick={prev}
            className="rounded-full border border-primary-foreground/20 p-2 text-primary-foreground/60 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="rounded-full border border-primary-foreground/20 p-2 text-primary-foreground/60 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="ml-2 text-xs text-primary-foreground/40">
            {current + 1} / {featured.length}
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-custom-primary"
                : "w-1.5 bg-primary-foreground/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
