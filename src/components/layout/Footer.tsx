import { MapPin, Phone, Mail } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/content/site.config";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.contact.address
  )}&output=embed`;

  return (
    <footer className="bg-champagne px-6 py-20 md:px-12 md:py-24">
      <SectionEyebrow className="mx-auto mb-16 max-w-7xl justify-center">
        Onde estamos
      </SectionEyebrow>
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1fr_1.3fr]">
        <div>
          <h3 className="font-display text-2xl text-graphite">
            {siteConfig.clinicName}
          </h3>
          <p className="mt-3 max-w-xs text-sm text-graphite/70">
            {siteConfig.tagline}
          </p>
        </div>
        <div>
          <div className="space-y-3 text-sm text-graphite/80">
            <p className="flex items-center gap-2">
              <Phone size={16} /> {siteConfig.contact.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> {siteConfig.contact.email}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> {siteConfig.contact.address}
            </p>
          </div>
          <div className="mt-6 flex gap-4 text-graphite/80">
            <a
              href={siteConfig.social.instagram}
              aria-label="Instagram"
              className="transition-transform duration-300 hover:scale-110"
            >
              <InstagramIcon />
            </a>
            <a
              href={siteConfig.social.facebook}
              aria-label="Facebook"
              className="transition-transform duration-300 hover:scale-110"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
        <div className="h-48 w-full overflow-hidden rounded-2xl shadow-soft md:h-full md:min-h-[180px]">
          <iframe
            src={mapSrc}
            title={`Mapa de localização — ${siteConfig.clinicName}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-graphite/10 pt-6 text-xs text-graphite/50">
        © {new Date().getFullYear()} {siteConfig.clinicName}. Todos os
        direitos reservados.
      </p>
    </footer>
  );
}
