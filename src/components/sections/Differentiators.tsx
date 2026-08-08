"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/content/site.config";
import { iconMap } from "@/lib/icons";

export default function Differentiators() {
  return (
    <section className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl text-center">
        <SectionEyebrow className="justify-center">
          {siteConfig.sections.differentiatorsEyebrow}
        </SectionEyebrow>
        <h2 className="mt-3 font-display text-3xl text-graphite md:text-4xl">
          {siteConfig.sections.differentiatorsTitle}
        </h2>
      </div>
      <div className="mx-auto mt-16 grid max-w-7xl gap-12 md:grid-cols-4">
        {siteConfig.differentiators.map((item, index) => {
          const Icon = iconMap[item.icon];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              className="text-center md:text-left"
            >
              <Icon
                className="mx-auto text-roseTaupe md:mx-0"
                size={24}
                strokeWidth={1.5}
              />
              <h3 className="mt-4 font-display text-lg text-graphite">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-graphite/70">{item.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
