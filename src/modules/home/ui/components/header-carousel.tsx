import { PostPreview } from "../../domain/types";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from "@/components/ui/carousel";
import { HeaderCarouselItem } from "./header-carousel-item";
import { useEffect, useState } from "react";

interface Props {
  posts: PostPreview[];
}

export const HeaderCarousel = ({ posts }: Props) => {
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(posts.length);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrentIndex(api.selectedScrollSnap());

    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
    >
      <CarouselContent>
        {posts.map((post) => (
          <HeaderCarouselItem
            key={post.id}
            post={post}
            currentIndex={currentIndex}
            count={count}
          />
        ))}
      </CarouselContent>
    </Carousel>
  );
};
