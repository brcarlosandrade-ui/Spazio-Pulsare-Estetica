"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/content/site.config";

export default function Location() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.contact.address
  )}&output=embed`;

  return (
    <section id="localizacao" className="bg-champagne/40 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow className="justify-center">
          {siteConfig.sections.locationEyebrow}
        </SectionEyebrow>
        <h2 className="mt-3 text-center font-display text-3xl text-graphite md:text-4xl">
          {siteConfig.sections.locationTitle}
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-72 w-full overflow-hidden rounded-2xl shadow-soft md:h-96"
          >
            <iframe
              src={mapSrc}
              title={`Mapa de localização — ${siteConfig.clinicName}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="space-y-6"
          >
            <p className="flex items-start gap-3 text-graphite/80">
              <MapPin size={20} className="mt-0.5 shrink-0 text-roseTaupe" />
              {siteConfig.contact.address}
            </p>
            <p className="flex items-start gap-3 text-graphite/80">
              <Clock size={20} className="mt-0.5 shrink-0 text-roseTaupe" />
              {siteConfig.contact.hours}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href={siteConfig.contact.mapsUrl} variant="secondary">
                Ver no Google Maps
              </Button>
              <Button href={siteConfig.contact.whatsapp} variant="whatsapp">
                <span className="inline-flex items-center gap-2">
                  <MessageCircle size={18} />
                  Agendar pelo WhatsApp
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
