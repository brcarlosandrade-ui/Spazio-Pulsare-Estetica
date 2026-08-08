"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site.config";

export default function HeroText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      className="relative z-10 max-w-lg px-6 md:px-12"
    >
      <h1 className="font-cormorant text-4xl font-bold leading-tight text-white [text-shadow:0_0_24px_rgba(255,255,255,.45),0_0_56px_rgba(199,155,149,.4)] md:text-7xl">
        {siteConfig.hero.title}
      </h1>
      <p className="mt-6 text-base text-white/70 md:text-lg">
        {siteConfig.hero.subtitle}
      </p>
      <div className="mt-10 flex gap-3 sm:gap-4">
        <Button
          href={siteConfig.contact.whatsapp}
          variant="primary"
          className="min-w-0 flex-1 text-center sm:flex-none"
        >
          {siteConfig.hero.ctaPrimaryLabel}
        </Button>
        <Button
          href="#procedimentos"
          variant="secondary"
          className="min-w-0 flex-1 text-center sm:flex-none !border-white/30 !text-white hover:!border-white/60"
        >
          {siteConfig.hero.ctaSecondaryLabel}
        </Button>
      </div>
    </motion.div>
  );
}
