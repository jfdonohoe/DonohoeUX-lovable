import { ReactNode } from "react";

/**
 * TwoColumnBlock — text + image side-by-side, image on left or right.
 * Used heavily throughout case studies.
 */
const TwoColumnBlock = ({
  imageSide = "right",
  image,
  children,
  aspect = "video",
}: {
  imageSide?: "left" | "right";
  image: ReactNode;
  children: ReactNode;
  aspect?: "video" | "square" | "portrait";
}) => {
  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  }[aspect];

  const imgEl = (
    <div
      className={`hero-image-container ${aspectClass} w-full`}
    >
      {image}
    </div>
  );
  const textEl = <div className="space-y-4">{children}</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center my-12">
      {imageSide === "left" ? (
        <>
          {imgEl}
          {textEl}
        </>
      ) : (
        <>
          {textEl}
          {imgEl}
        </>
      )}
    </div>
  );
};

export default TwoColumnBlock;
