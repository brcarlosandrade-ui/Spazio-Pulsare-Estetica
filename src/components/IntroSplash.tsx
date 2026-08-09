import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "sb-intro-seen";
const MAX_DURATION_MS = 4000;

function markSeen() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // sessionStorage unavailable (e.g. private mode) - safe to skip
  }
}

export function IntroSplash({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const dismiss = useCallback(() => {
    setFading((alreadyFading) => {
      if (alreadyFading) return alreadyFading;
      markSeen();
      window.setTimeout(() => setVisible(false), 400);
      return true;
    });
  }, []);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    if (alreadySeen) {
      setVisible(false);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markSeen();
      setVisible(false);
      return;
    }

    const timeout = window.setTimeout(dismiss, MAX_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [dismiss]);

  return (
    <>
      {children}
      {visible && (
        <div
          role="presentation"
          onClick={dismiss}
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-[400ms] ease-out ${
            fading ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={dismiss}
            onError={dismiss}
          >
            <source src="/videos/intro.webm" type="video/webm" />
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
}
