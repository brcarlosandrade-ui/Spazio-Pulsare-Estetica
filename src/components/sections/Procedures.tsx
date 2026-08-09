"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/content/site.config";
import { iconMap } from "@/lib/icons";

export default function Procedures() {
  const [activeId, setActiveId] = useState(siteConfig.procedureCategories[0].id);
  const activeCategory =
    siteConfig.procedureCategories.find((category) => category.id === activeId) ??
    siteConfig.procedureCategories[0];

  return (
    <section id="procedimentos" className="bg-champagne/40 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow className="justify-center">
          {siteConfig.sections.proceduresEyebrow}
        </SectionEyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-3 text-center font-display text-3xl text-graphite md:text-4xl"
        >
          {siteConfig.sections.proceduresTitle}
        </motion.h2>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {siteConfig.procedureCategories.map((category) => {
            const Icon = iconMap[category.icon];
            const isActive = category.id === activeId;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveId(category.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-medium tracking-wide transition-all duration-300 sm:text-sm ${
                  isActive
                    ? "border-roseTaupe bg-roseTaupe text-warmWhite"
                    : "border-graphite/15 bg-white/50 text-graphite/70 hover:border-roseTaupe/40"
                }`}
              >
                <Icon size={16} strokeWidth={1.5} />
                {category.title}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {activeCategory.items.map((item) => (
            <Card key={item.name} className="flex h-full flex-col">
              <h3 className="font-display text-xl text-graphite">{item.name}</h3>
              <p className="mt-3 flex-1 text-sm text-graphite/70">{item.description}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
