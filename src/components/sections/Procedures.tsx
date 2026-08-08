"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/content/site.config";
import { iconMap } from "@/lib/icons";

export default function Procedures() {
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
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.procedures.map((procedure, index) => {
            const Icon = iconMap[procedure.icon];
            return (
              <motion.div
                key={procedure.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
              >
                <Card className="flex h-full flex-col">
                  <Icon className="text-roseTaupe" size={28} strokeWidth={1.5} />
                  <h3 className="mt-6 font-display text-xl text-graphite">
                    {procedure.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-graphite/70">
                    {procedure.description}
                  </p>
                  <Button
                    variant="secondary"
                    href="#top"
                    className="mt-6 self-start !px-6 !py-2 text-xs"
                  >
                    {procedure.ctaLabel}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
