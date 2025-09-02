"use client";
import React from "react";
import Image from "next/image";
import kiki from "/public/images/kikis-broom-nuage 3.svg";
import { gsap } from "gsap";
type KikisImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const KikisImage: React.FC<KikisImageProps> = (props) => {
  const kikisImage = React.useRef<HTMLImageElement>(null);
  const divKiki = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!kikisImage.current || !divKiki.current) return;

    // 1) Rendre le conteneur invisible AVANT toute manip (évite le flash)
    /*  gsap.set(kikisImage.current, { autoAlpha: 0, yPercent: 100 }); */

    gsap.timeline({}).fromTo(
      kikisImage.current,
      {
        autoAlpha: 0,
        yPercent: 100,
      },
      {
        duration: 1.2,
        autoAlpha: 1,
        yPercent: 0,
        ease: "expo.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: divKiki.current,
          start: "center center", // animation starts when the middle of the image is at the center of the viewport
          immediateRender: false,
        },
      },
    );
  }, []);

  return (
    <div ref={divKiki} className="-mb-12 h-full w-full">
      <Image
        ref={kikisImage}
        src={kiki}
        alt="kikis"
        priority={true}
        className="absolute -left-2/4 bottom-1/4 z-30 mx-auto h-64 w-auto sm:static sm:mb-[-75px] sm:h-full  sm:w-full"
        style={{
          maxWidth: "1500px",
        }}
      />
    </div>
  );
};

export default KikisImage;
