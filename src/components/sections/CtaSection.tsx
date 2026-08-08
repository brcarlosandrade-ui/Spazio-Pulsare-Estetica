"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/content/site.config";

export default function CtaSection() {
  return (
    <section className="relative flex min-h-[430px] items-center overflow-hidden px-6 py-24 text-center md:min-h-[460px] md:px-12">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_50%_0%,#F6DEDE_0%,#E2B4B6_35%,#C3908F_65%,#A87373_100%)]"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-2xl"
      >
        <SectionEyebrow className="justify-center">
          {siteConfig.cta.eyebrow}
        </SectionEyebrow>
        <h2 className="mt-5 font-body text-3xl font-extrabold leading-tight text-white md:text-5xl">
          {siteConfig.cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/85">
          {siteConfig.cta.subtitle}
        </p>
        <div className="mt-10 flex justify-center">
          <Button
            href={siteConfig.contact.whatsapp}
            variant="whatsapp"
            className="w-full sm:w-auto"
          >
            <span className="inline-flex items-center gap-2">
              <MessageCircle size={18} />
              {siteConfig.cta.buttonLabel}
            </span>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
