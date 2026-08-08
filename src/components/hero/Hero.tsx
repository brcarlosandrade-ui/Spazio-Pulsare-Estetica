"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroText from "./HeroText";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = 768;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: `(min-width: ${MOBILE_BREAKPOINT}px) and (prefers-reduced-motion: no-preference)`,
        isFallback: `(max-width: ${MOBILE_BREAKPOINT - 1}px), (prefers-reduced-motion: reduce)`,
      },
      (context) => {
        const { isDesktop } = context.conditions as {
          isDesktop: boolean;
          isFallback: boolean;
        };

        if (!isDesktop) {
          // Mobile / reduced-motion fallback: no scroll sync, just play the video.
          video.autoplay = true;
          video.loop = true;
          video.play().catch(() => {});

          // Pause while the hero is scrolled out of view so the video isn't
          // decoding/looping in the background as the user reads other sections.
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                video.play().catch(() => {});
              } else {
                video.pause();
              }
            },
            { threshold: 0 }
          );
          observer.observe(section);

          return () => {
            observer.disconnect();
            video.pause();
            video.autoplay = false;
            video.loop = false;
          };
        }

        const state = { progress: 0 };

        const onLoadedMetadata = () => {
          if (video.duration) {
            video.currentTime = state.progress * video.duration;
          }
        };
        video.addEventListener("loadedmetadata", onLoadedMetadata);

        // ScrollTrigger only applies `scrub` smoothing to an attached animation,
        // so drive a paused proxy tween instead of reading `self.progress` raw.
        const proxy = gsap.to(state, {
          progress: 1,
          ease: "none",
          paused: true,
          onUpdate: () => {
            // Skip the write if the browser hasn't finished the previous
            // seek yet — issuing currentTime faster than the decoder can
            // service it floods the seek pipeline and shows up as stutter.
            // The very next tick (~16ms later) picks up the latest target.
            if (video.duration && !video.seeking) {
              video.currentTime = state.progress * video.duration;
            }
          },
        });

        const trigger = ScrollTrigger.create({
          trigger: section,
          animation: proxy,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        });

        return () => {
          trigger.kill();
          proxy.kill();
          video.removeEventListener("loadedmetadata", onLoadedMetadata);
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-warmWhite md:block md:h-screen md:min-h-0"
    >
      {/*
        Mobile: video is a fixed-height block in normal flow, text stacks below it.
        md+: video becomes the full-bleed background and the text overlaps it.
      */}
      <div className="relative h-[55vh] w-full md:absolute md:inset-0 md:h-full">
        {/* id kept for Task 8 / debugging hooks; GSAP targets this element via ref */}
        <video
          ref={videoRef}
          id="hero-video"
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          {/* Lighter, lower-resolution encode for phones: hardware-decoded H.264 instead of the heavier desktop webm/vp9. */}
          <source
            media={`(max-width: ${MOBILE_BREAKPOINT - 1}px)`}
            src="/videos/hero-mobile.mp4"
            type="video/mp4"
          />
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Contrast scrim: only needed at md+, where the text sits over the video. Dark so the white hero text reads. */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-graphite/75 via-graphite/35 to-transparent md:block" />
      </div>
      {/* Mobile: text sits below the video on a plain background, so it needs its own dark panel for the white text to read. md+: transparent, text overlays the video + scrim instead. */}
      <div className="relative flex flex-1 items-center bg-graphite py-12 md:absolute md:inset-0 md:z-10 md:items-center md:bg-transparent md:pb-12 md:pt-40">
        <HeroText />
      </div>
    </section>
  );
}
