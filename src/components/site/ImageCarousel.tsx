import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselSlide = {
  src?: string;
  placeholder?: string;
  title?: string;
  caption?: string;
};

/**
 * Image carousel with capped image + caption tab + side nav buttons.
 * Mirrors the original site's .image-carousel module.
 */
const ImageCarousel = ({ slides }: { slides: CarouselSlide[] }) => {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const go = (d: number) => setIndex((i) => (i + d + total) % total);

  return (
    <div className="relative mt-6">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="flex-none w-full pr-4">
              <div className="bg-muted border border-border rounded-[1rem_1rem_1rem_0] aspect-video flex items-center justify-center overflow-hidden">
                {s.src ? (
                  <img
                    src={s.src}
                    alt={s.title || ""}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6">
                    <p className="text-text-subtle text-sm font-medium">
                      {s.placeholder || "Image"}
                    </p>
                    <p className="text-xs text-text-subtle/70 mt-1">
                      Image placeholder
                    </p>
                  </div>
                )}
              </div>
              {(s.title || s.caption) && (
                <div className="carousel-caption">
                  {s.title && (
                    <p className="text-sm font-medium text-text-display mb-0.5">
                      {s.title}
                    </p>
                  )}
                  {s.caption && (
                    <p className="text-sm text-text-body">{s.caption}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-elevated border border-accent-warm text-text-subtle hover:bg-accent-warm-light hover:text-text-display flex items-center justify-center transition-colors z-10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-elevated border border-accent-warm text-text-subtle hover:bg-accent-warm-light hover:text-text-display flex items-center justify-center transition-colors z-10"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
