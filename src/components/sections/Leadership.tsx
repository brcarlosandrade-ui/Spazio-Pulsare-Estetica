"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/content/site.config";

export default function Leadership() {
  return (
    <section
      id="equipe"
      className="mx-auto grid max-w-7xl gap-16 px-6 py-32 md:grid-cols-2 md:items-center md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative h-[420px] w-full overflow-hidden rounded-2xl md:order-2 md:h-[520px]"
      >
        <Image
          src={siteConfig.leadership.imageUrl}
          alt={siteConfig.leadership.name}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        className="md:order-1"
      >
        <SectionEyebrow lines={false}>{siteConfig.sections.leadershipEyebrow}</SectionEyebrow>
        <h2 className="mt-3 font-display text-3xl text-graphite md:text-4xl">
          {siteConfig.sections.leadershipTitle}
        </h2>
        <p className="mt-6 leading-relaxed text-graphite/70">{siteConfig.leadership.text}</p>
        <p className="mt-10 font-display italic text-graphite/80">
          {siteConfig.leadership.name}
        </p>
        <p className="text-sm text-graphite/50">
          {siteConfig.leadership.role} • {siteConfig.leadership.credential}
        </p>
      </motion.div>
    </section>
  );
}
