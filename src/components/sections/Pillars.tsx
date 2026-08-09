"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/site.config";
import { iconMap } from "@/lib/icons";

export default function Pillars() {
  return (
    <section id="conceito" className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl text-graphite md:text-4xl">
          {siteConfig.sections.pillarsTitle}
        </h2>
      </div>
      <div className="mx-auto mt-20 grid max-w-5xl gap-16 md:grid-cols-3">
        {siteConfig.pillars.map((pillar, index) => {
          const Icon = iconMap[pillar.icon];
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
              className="text-center"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-roseTaupe/30">
                <Icon className="text-roseTaupe" size={26} strokeWidth={1.25} />
              </span>
              <h3 className="mt-6 font-display text-xl text-graphite">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite/70">{pillar.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
