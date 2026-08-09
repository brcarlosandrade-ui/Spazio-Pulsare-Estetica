"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site.config";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-warmWhite/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link href="#top" className="flex items-center gap-2.5">
          <Image
            src="/images/logo-mark.svg"
            alt=""
            width={32}
            height={32}
            aria-hidden
            className="h-8 w-8"
          />
          <span className="font-cormorant text-2xl font-bold tracking-wide text-graphite md:text-3xl">
            {siteConfig.clinicName}
          </span>
        </Link>
        <nav className="hidden gap-10 text-sm text-graphite/80 md:flex">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} className="story-link">
              {item.label}
            </a>
          ))}
        </nav>
        <Button
          href={siteConfig.contact.whatsapp}
          variant="secondary"
          className="!px-6 !py-2 !text-xs whitespace-nowrap"
        >
          <span className="sm:hidden">Agendar</span>
          <span className="hidden sm:inline">
            {siteConfig.hero.ctaPrimaryLabel}
          </span>
        </Button>
      </div>
    </header>
  );
}
