# Intro Splash Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a full-screen intro video (logo, ~4s) once per browser tab session before revealing the Seven Beauties site, with graceful skip/fallback behavior.

**Architecture:** A single client-side component, `IntroSplash`, wraps the existing `Home()` page content. It renders its `children` unconditionally (so the site mounts/loads underneath) and layers a full-screen `<video>` overlay on top, controlled by local React state. The overlay is dismissed (with fade) on video end, a 4s safety timeout, a click/tap anywhere, or a video load error — and is skipped entirely on repeat visits within the same tab session (`sessionStorage`) or when `prefers-reduced-motion` is set.

**Tech Stack:** React 19, TanStack Start/Router, Tailwind CSS v4 (existing project stack — no new dependencies).

## Global Constraints

- Video source files are **not** part of this work — the component must reference `/videos/intro.mp4` (+ optional `/videos/intro.webm`) and degrade gracefully (skip to site) if those files 404, exactly as specified in `docs/superpowers/specs/2026-08-09-intro-splash-video-design.md`.
- Initial render state must be identical on server and client (`visible` starts `true` unconditionally) to avoid SSR hydration mismatches — per spec.
- No new npm/bun dependencies.
- This project has no automated test runner configured (no `test` script, no test files, no vitest/jest config). Verification for this plan is: TypeScript compiles clean, ESLint passes, and manual behavior checks in a running dev server — not automated unit tests. Do not introduce a test framework as part of this work; that would be out of scope.
- Package manager: the repo pins `bun` (`bun.lock`, `bunfig.toml`), but this environment only has `npm`/`node` available locally. If `node_modules` is missing, install with `npm install` before running any verification command (`npm run lint`, `npx tsc --noEmit`, `npm run dev`). This is a one-time local setup step, not a repo change.

---

### Task 1: Create the `IntroSplash` component

**Files:**
- Create: `src/components/IntroSplash.tsx`
- Create: `public/videos/README.md`

**Interfaces:**
- Produces: `IntroSplash` — a React component, default-exported as a named export `export function IntroSplash({ children }: { children: React.ReactNode })`, rendering `children` plus the overlay. No props beyond `children`. Consumed by Task 2.

- [ ] **Step 1: Ensure dependencies are installed**

Run: `npm install` (only if `node_modules` doesn't exist yet — check with `Test-Path node_modules` on Windows or `ls node_modules` first; skip this step if it already exists).

- [ ] **Step 2: Create `src/components/IntroSplash.tsx`**

```tsx
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
```

- [ ] **Step 3: Create `public/videos/README.md`**

```md
# Vídeo de abertura (intro splash)

Coloque aqui os arquivos do vídeo de abertura exibido antes do site carregar:

- `intro.mp4` — obrigatório.
- `intro.webm` — opcional, mas recomendado (melhor compressão em navegadores compatíveis).

Nenhum outro arquivo do projeto precisa mudar — o componente `src/components/IntroSplash.tsx`
já referencia `/videos/intro.mp4` e `/videos/intro.webm`. Se os arquivos não existirem, o site
carrega normalmente (a intro é pulada automaticamente).
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors related to `src/components/IntroSplash.tsx`.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: no errors/warnings for `src/components/IntroSplash.tsx` (in particular, `react-hooks/exhaustive-deps` must be clean — no `eslint-disable` needed given the `useCallback`-wrapped `dismiss`).

- [ ] **Step 6: Commit**

```bash
git add src/components/IntroSplash.tsx public/videos/README.md
git commit -m "feat: add IntroSplash overlay component"
```

---

### Task 2: Wire `IntroSplash` into the home page and verify end-to-end

**Files:**
- Modify: `src/routes/index.tsx:87-104` (the `Home` component)

**Interfaces:**
- Consumes: `IntroSplash` from `src/components/IntroSplash.tsx` (Task 1) — `import { IntroSplash } from "@/components/IntroSplash";`.

- [ ] **Step 1: Wrap the `Home` component's return value**

In `src/routes/index.tsx`, add the import near the other local imports (after the `Reveal` import on line 19):

```tsx
import { IntroSplash } from "@/components/IntroSplash";
```

Then change the `Home` function (currently lines 87-104):

```tsx
function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Treatments />
        <Differentials />
        <About />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
```

to:

```tsx
function Home() {
  return (
    <IntroSplash>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Marquee />
          <Treatments />
          <Differentials />
          <About />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </IntroSplash>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors/warnings.

- [ ] **Step 4: Manual verification — no video file present (current repo state)**

Run: `npm run dev`, open the printed local URL in a browser with DevTools console open.

Check all of the following:
- The page background flashes the site's warm-white color (not white/black) for an instant, then the full site appears — because `/videos/intro.mp4` 404s, `onError` fires, and the overlay is dismissed immediately.
- No hydration warning/error appears in the console.
- No JavaScript error appears in the console.

- [ ] **Step 5: Manual verification — simulated video present**

Temporarily drop any small local `.mp4` file (e.g. rename a copy of an unrelated short clip) into `public/videos/intro.mp4` for this check only — do not commit it.

Check all of the following in a fresh **incognito/private** browser window (so `sessionStorage` starts empty):
- The video overlay covers the full screen and autoplays muted immediately on load.
- After the video ends, or after 4 seconds (whichever comes first), the overlay fades out (~400ms) and the site becomes visible and clickable.
- Reload the page (same tab, not a new incognito window): the overlay does **not** appear again (sessionStorage already has `sb-intro-seen`).
- Open a fresh incognito window again, and this time click anywhere on the overlay shortly after it appears: it fades out immediately instead of waiting for the video/timeout.
- In DevTools, enable "Emulate CSS media feature `prefers-reduced-motion: reduce`" (Rendering tab), then reload in a fresh incognito window: the overlay does not appear at all.

After verifying, delete the temporary `public/videos/intro.mp4` file (it must not be committed by this plan — the spec explicitly leaves the real video file for the user to add later).

- [ ] **Step 6: Confirm no stray files staged**

Run: `git status`
Expected: only `src/routes/index.tsx` shows as modified; no video file listed.

- [ ] **Step 7: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: show intro splash video before revealing the site"
```
