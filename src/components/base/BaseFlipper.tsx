import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import React, { useRef } from "react";

export type BaseFlipperProps = React.ComponentPropsWithoutRef<"div"> & {
  play: boolean;
  offset?: number;
};

export function BaseFlipper({ children, className, play, offset = 0 }: BaseFlipperProps) {
  const top = useRef(null);
  const bottom = useRef(null);
  const bottomText = useRef(null);

  useGSAP(() => {
    const delay = 3.5 + offset;
    const tl = gsap.timeline({ delay, paused: !play });

    tl.fromTo(bottom.current, { rotateX: 180 }, { duration: 1, rotateX: 0 });
    tl.fromTo(bottomText.current, { opacity: 0 }, { duration: 0.1, opacity: 1 }, 0.3);

    tl.timeScale(1.7);
  }, [play]);

  return (
    <div
      className={clsx(
        "relative h-104 w-72 overflow-hidden rounded-lg border-2 border-black/50 bg-[#8577AA] xxl:h-88 xxl:w-56 l:h-80 l:w-48 xs:h-56",
        className
      )}
      style={{ perspective: 3000 }}
    >
      <div ref={top} className="preserve-3d relative h-1/2 w-full overflow-hidden bg-[#8577AA]">
        <p className="absolute z-10 w-full text-center font-bebas text-96 leading-[1.15] text-white xxl:text-80 l:text-72 l:leading-[1.16] xs:text-48">
          {children}
        </p>
      </div>
      <div ref={bottom} className="preserve-3d relative h-1/2 w-full origin-top overflow-hidden bg-[#7F6FA7]">
        <p
          ref={bottomText}
          className="absolute -top-48 z-10 w-full text-center font-bebas text-96 leading-[1.15] text-white xxl:top-[-44px] xxl:text-80 l:-top-40 l:text-72 l:leading-[1.16] xs:-top-28 xs:text-48"
        >
          {children}
        </p>
      </div>
      <div className="y-center absolute z-20 h-2 w-full bg-black/20" />
    </div>
  );
}
