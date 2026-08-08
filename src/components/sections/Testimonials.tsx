"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { siteConfig, type Testimonial } from "@/content/site.config";

const AUTOPLAY_INTERVAL_MS = 5000;

function useItemsPerView() {
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const smQuery = window.matchMedia("(min-width: 640px)");
    const lgQuery = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      setItemsPerView(lgQuery.matches ? 3 : smQuery.matches ? 2 : 1);
    };

    update();
    smQuery.addEventListener("change", update);
    lgQuery.addEventListener("change", update);
    return () => {
      smQuery.removeEventListener("change", update);
      lgQuery.removeEventListener("change", update);
    };
  }, []);

  return itemsPerView;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={testimonial.avatarUrl}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <p className="font-medium text-graphite">{testimonial.name}</p>
          <div className="flex gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} size={14} className="fill-roseTaupe text-roseTaupe" />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-graphite/70">
        &ldquo;{testimonial.text}&rdquo;
      </p>
    </Card>
  );
}

export default function Testimonials() {
  const testimonials = siteConfig.testimonials;
  const itemsPerView = useItemsPerView();
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Clamp whenever the responsive item count shrinks the valid range.
  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const id = setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(id);
  }, [isPaused, maxIndex]);

  const goPrev = () => setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  const goNext = () => setIndex((current) => (current >= maxIndex ? 0 : current + 1));

  return (
    <section id="depoimentos" className="bg-champagne/40 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow className="justify-center">
          {siteConfig.sections.testimonialsEyebrow}
        </SectionEyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-3 text-center font-display text-3xl text-graphite md:text-4xl"
        >
          {siteConfig.sections.testimonialsTitle}
        </motion.h2>

        <div
          className="relative mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {maxIndex > 0 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Depoimento anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-warmWhite/90 p-2 text-graphite shadow-soft transition-transform duration-300 hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Próximo depoimento"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-warmWhite/90 p-2 text-graphite shadow-soft transition-transform duration-300 hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>

              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ir para o grupo de depoimentos ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-roseTaupe" : "w-2 bg-graphite/20"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
