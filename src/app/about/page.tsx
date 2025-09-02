"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Page = () => {
  const aboutSection = useRef<HTMLDivElement | null>(null);
  const titre = useRef<HTMLHeadingElement | null>(null);
  const parag1 = useRef<HTMLParagraphElement | null>(null);
  const parag2 = useRef<HTMLParagraphElement | null>(null);
  const textCitation_1 = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    console.log("useLayoutEffect about");
    if (
      !aboutSection.current ||
      !titre.current ||
      !parag1.current ||
      !parag2.current ||
      !textCitation_1.current
    )
      return;

    // 1) Rendre le conteneur invisible AVANT toute manip (évite le flash)
    gsap.set(aboutSection.current, { autoAlpha: 0 });

    // 2) Crée les SplitText APRES montage
    const splitTitle = new SplitText(titre.current, {
      type: "chars",
      charsClass: "char-js",
    });
    const splitP1 = new SplitText(parag1.current, {
      type: "words",
      wordsClass: "word-js",
    });
    const splitP2 = new SplitText(parag2.current, {
      type: "words",
      wordsClass: "word-js",
    });

    const splitCitation = new SplitText(textCitation_1.current, {
      type: "chars",
      charsClass: "char-js",
    });

    // 3) Préparer l’état initial des morceaux (toujours avant la 1re peinture)
    gsap.set([splitTitle.chars, splitP1.words, splitP2.words], {
      autoAlpha: 0,
    });

    // 4) Révéler le conteneur seulement maintenant
    gsap.set(aboutSection.current, { autoAlpha: 1 });

    // 5) Anims avec ScrollTrigger (fromTo + immediateRender:false pour éviter les “sauts”)
    const ctx = gsap.context(() => {
      // Titre
      gsap
        .timeline({})
        .fromTo(
          splitTitle.chars,
          { rotateX: -76, xPercent: -20, yPercent: 100, autoAlpha: 0 },
          {
            duration: 1.2,
            rotateX: 0,
            xPercent: 0,
            yPercent: 0,
            autoAlpha: 1,
            ease: "expo.out",
            stagger: 0.04,
            scrollTrigger: {
              trigger: titre.current, // <- utilise la ref
              start: "top 70%",
              immediateRender: false,
            },
          },
        )
        .fromTo(
          splitP1.words,
          { yPercent: 150, autoAlpha: 0 },
          {
            duration: 0.9,
            yPercent: 0,
            autoAlpha: 1,
            ease: "expo.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: parag1.current,
              start: "top 75%",
            },
          },
        )
        .fromTo(
          splitP2.words,
          { yPercent: 150, autoAlpha: 0 },
          {
            duration: 0.9,
            yPercent: 0,
            autoAlpha: 1,
            ease: "expo.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: parag2.current,
              start: "top 75%",
            },
          },
        )
        .fromTo(
          splitCitation.chars,
          { opacity: 0, scale: 0.2, xPercent: -50, yPercent: 60 },
          {
            duration: 0.9,
            scale: 1,
            xPercent: 0,
            yPercent: 0,
            opacity: 1,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: textCitation_1.current,
              start: "top 75%",
              markers: true,
            },
          },
        );
    }, []); // scope (optionnel mais propre)

    // Nettoyage : détruit les animations & remet le DOM normal
    return () => {
      ctx.revert();
      splitTitle.revert();
      splitP1.revert();
      splitP2.revert();
    };
  }, []);

  return (
    <>
      <div className="mx-auto mt-16 w-full sm:w-3/5" ref={aboutSection}>
        <h1
          className="w-full origin-bottom-left -skew-y-2 transform overflow-hidden text-left font-serif text-3xl text-mc-marrom sm:text-5xl"
          ref={titre}
        >
          A propos du site
        </h1>

        <p
          className="mx-auto w-full overflow-hidden text-center sm:text-left"
          ref={parag1}
        >
          Ce site a été fait dans le cadre d’un projet personnel par
          <Link
            className="ml-1 text-mc-rose hover:text-mc-marrom"
            href={"https://www.rafaeladsdo.com/"}
          >
            RAFAELA DA SILVA DE OLIVEIRA
          </Link>
          . Les illustrations sont un hommage au film{" "}
          <b>Kiki’s delivery Service</b> du
          <span className="ml-1 text-mc-green">@Studio Ghibli</span>.
        </p>
        <p
          className="mx-auto my-6 overflow-hidden text-center sm:text-left"
          ref={parag2}
        >
          L’objetif était de créer un répertoire en ligne de ma bibliothèque,
          donc c’est un site d’utilisation à titre personnel.
        </p>
      </div>

      <div
        className="relative mx-auto flex flex-col justify-center text-center align-bottom text-sm text-mc-marrom  sm:text-xl lg:flex-row"
        ref={textCitation_1}
      >
        <div className={`mx-auto flex`}>
          <p className={`mt-2 animate-fadeIn`}>
            <i className="non-italic text-2xl text-mc-violet">{`"`}</i>
            {`If I lose`}
          </p>
          <span
            className={`mx-2 mt-0 block -skew-y-6 transform animate-fadeIn font-serif text-3xl  text-mc-rose delay-150 sm:mt-4`}
          >
            my magic
          </span>
        </div>

        <p
          className={`mt-2 animate-fadeIn delay-200 lg:mt-16`}
        >{`, that means I've lost`}</p>

        <span
          className={`mx-10 -mt-2 block -skew-y-6 transform animate-fadeIn text-left font-serif text-3xl text-mc-rose delay-300 sm:text-center lg:mt-8 `}
        >
          absolutely
        </span>

        <div className={`mx-auto flex sm:mx-auto`}>
          <span
            className={`-mt-10  block skew-y-0 transform animate-fadeIn text-center font-serif text-3xl text-mc-rose delay-500 sm:-skew-y-6 lg:mt-12`}
          >
            everything
          </span>
          <p
            className={`-mt-8 animate-fadeIn text-mc-beigeClair delay-700 lg:mt-24`}
          >
            <i className="non-italic text-2xl text-mc-violet">{`"`}</i>
          </p>
        </div>
        <p
          className={`-mt-4 animate-fadeIn text-mc-beigeClair delay-700 lg:mt-24`}
        >
          {`- Kiki`}
        </p>
      </div>
    </>
  );
};

export default Page;
