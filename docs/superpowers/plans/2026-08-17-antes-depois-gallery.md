# Antes & Depois Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let the clinic publish before/after photo pairs to the public site herself, via a password-protected upload page, with photos hosted and served from her own Cloudinary account.

**Architecture:** Two TanStack Start server functions (`uploadAntesDepois`, `listAntesDepois`) wrap the Cloudinary Node SDK and never expose Cloudinary credentials to the browser. A new `/admin/antes-depois` route posts to the upload function. A new public section on `/` calls the list function via React Query and renders the pairs.

**Tech Stack:** TanStack Start (React 19) server functions, `cloudinary` Node SDK v2, React Query (already wired via `router.tsx`), existing shadcn `Input`/`Label`/`Button` primitives, Tailwind v4.

**Spec:** [docs/superpowers/specs/2026-08-17-antes-depois-gallery-design.md](../specs/2026-08-17-antes-depois-gallery-design.md)

## Global Constraints

- Cloudinary credentials (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) and `UPLOAD_PASSWORD` live only in server-side env vars — never in client code or committed files.
- Photos live under the Cloudinary folder `spazio-pulsare/antes-depois/`, tagged `antes-depois`.
- `public_id` per photo: `{treatment-slug}-{case-slug}-antes` / `...-depois` — used only to pair before/after, not to reconstruct display text.
- Display text (treatment name, case label) is stored as Cloudinary `context` metadata on upload and read back on list — **this corrects the spec's "extract from filename" idea**, which is ambiguous (you can't tell where the treatment-slug ends and the case-slug begins once both are hyphenated). Functionally it still delivers exactly what the spec asks for: `{ treatment, caseLabel, beforeUrl, afterUrl }` per pair.
- No automated test suite exists in this project (confirmed: no test runner in `package.json`). Verification steps below are manual (dev server + browser), matching the spec's explicit "fora de escopo" on automated tests.
- New pair upload with the same treatment+case overwrites the previous one in Cloudinary (same `public_id`) — expected, not an error case.
- The server module lives at `src/lib/antes-depois.ts`, not under any directory named `server` — this project's `@lovable.dev/vite-tanstack-config` configures TanStack Start's import-protection plugin with `client.files: ["**/server/**"]`, which unconditionally blocks any client-bundled import whose path contains a `server` path segment. Discovered mid-implementation (Task 2); ruled and corrected in the ledger. `src/lib/` already holds this project's other shared modules (`clinic.ts`, `utils.ts`, `error-page.ts`).
- TanStack Start is isomorphic by default: only code inside `createServerFn(...).handler(fn)` bodies is stripped from the client bundle. `cloudinary.config()` (and any `process.env` read) must happen inside each handler, never at module scope — a module-scope call leaks the `cloudinary` package into the client bundle and crashes the page in the browser. Discovered mid-implementation (Task 2); ruled and corrected in the ledger.

---

### Task 1: Cloudinary server module (upload + list server functions)

**Files:**
- Modify: `package.json` (add `cloudinary` dependency — run install, don't hand-edit)
- Modify: `.gitignore` (ignore local env files)
- Create: `.env.example`
- Create: `src/lib/antes-depois.ts`
- Modify: `README.md` (document the new env vars)

**Interfaces:**
- Produces: `uploadAntesDepois` — server function, `POST`, called as `uploadAntesDepois({ data: formData })` where `formData` has fields `password`, `treatment`, `caseLabel`, `before` (File), `after` (File). Resolves to `{ ok: true } | { ok: false; error: string }`.
- Produces: `listAntesDepois` — server function, `GET`, called as `listAntesDepois()`. Resolves to `AntesDepoisPair[]`, where `AntesDepoisPair = { treatment: string; caseLabel: string; beforeUrl: string; afterUrl: string }`.

- [ ] **Step 1: Install the Cloudinary SDK**

Run:
```bash
npm install cloudinary
```

Verify `"cloudinary"` now appears under `"dependencies"` in `package.json`.

- [ ] **Step 2: Ignore local env files**

In `.gitignore`, add a new section (anywhere after the existing `# Wrangler / Cloudflare` block is fine):

```
# Local secrets
.env
.env.local
```

- [ ] **Step 3: Add `.env.example`**

Create `.env.example` at the repo root:

```
# Cloudinary account that stores the antes/depois photos.
# Get these three from the Cloudinary dashboard (Settings > Access Keys) — NOT the account password.
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Shared password that gates the /admin/antes-depois upload page. Pick anything.
UPLOAD_PASSWORD=
```

- [ ] **Step 4: Write the Cloudinary server module**

Create `src/lib/antes-depois.ts`:

```ts
import { createServerFn } from "@tanstack/react-start";
import { v2 as cloudinary } from "cloudinary";

// TanStack Start is isomorphic by default — module-scope code runs in BOTH
// bundles. Only code inside .handler() bodies gets stripped from the client
// build, so cloudinary.config() must be called from inside each handler,
// never at module scope (see execution-model docs / ledger ruling).
function configureCloudinary(): void {
  cloudinary.config({
    cloud_name: process.env["CLOUDINARY_CLOUD_NAME"] ?? "",
    api_key: process.env["CLOUDINARY_API_KEY"] ?? "",
    api_secret: process.env["CLOUDINARY_API_SECRET"] ?? "",
  });
}

const FOLDER = "spazio-pulsare/antes-depois";
const TAG = "antes-depois";

function slugify(value: string): string {
  // NFD splits accented letters into base letter + combining mark (code
  // points 0x0300-0x036F); dropping marks in that range de-accents the text.
  const withoutAccents = Array.from(value.normalize("NFD"))
    .filter((ch) => {
      const code = ch.codePointAt(0) ?? 0;
      return code < 0x0300 || code > 0x036f;
    })
    .join("");

  return withoutAccents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fileToDataUri(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export type UploadAntesDepoisResult = { ok: true } | { ok: false; error: string };

export async function uploadAntesDepoisHandler({
  data,
}: {
  data: FormData;
}): Promise<UploadAntesDepoisResult> {
  const password = data.get("password");
  if (typeof password !== "string" || password !== process.env["UPLOAD_PASSWORD"]) {
    return { ok: false, error: "Senha incorreta." };
  }

  const treatment = data.get("treatment");
  const caseLabel = data.get("caseLabel");
  const before = data.get("before");
  const after = data.get("after");

  if (typeof treatment !== "string" || !treatment.trim()) {
    return { ok: false, error: "Informe o nome do tratamento." };
  }
  if (typeof caseLabel !== "string" || !caseLabel.trim()) {
    return { ok: false, error: "Informe o nome/rótulo do caso." };
  }
  if (!(before instanceof File) || before.size === 0) {
    return { ok: false, error: "Selecione a foto de antes." };
  }
  if (!(after instanceof File) || after.size === 0) {
    return { ok: false, error: "Selecione a foto de depois." };
  }

  const caseKey = `${slugify(treatment)}-${slugify(caseLabel)}`;
  const context = { treatment: treatment.trim(), case_label: caseLabel.trim() };

  configureCloudinary();
  try {
    await Promise.all([
      cloudinary.uploader.upload(await fileToDataUri(before), {
        folder: FOLDER,
        public_id: `${caseKey}-antes`,
        tags: [TAG],
        context,
        overwrite: true,
      }),
      cloudinary.uploader.upload(await fileToDataUri(after), {
        folder: FOLDER,
        public_id: `${caseKey}-depois`,
        tags: [TAG],
        context,
        overwrite: true,
      }),
    ]);
    return { ok: true };
  } catch (error) {
    console.error("Falha ao subir fotos antes/depois:", error);
    return { ok: false, error: "Falha ao enviar as fotos. Tente novamente." };
  }
}

export const uploadAntesDepois = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as FormData)
  .handler(uploadAntesDepoisHandler);

export type AntesDepoisPair = {
  treatment: string;
  caseLabel: string;
  beforeUrl: string;
  afterUrl: string;
};

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  created_at: string;
  context?: { custom?: { treatment?: string; case_label?: string } };
};

export async function listAntesDepoisHandler(): Promise<AntesDepoisPair[]> {
  configureCloudinary();
  try {
    const result = await cloudinary.api.resources_by_tag(TAG, {
      max_results: 500,
      context: true,
    });

    const pairs = new Map<string, { before?: CloudinaryResource; after?: CloudinaryResource }>();

    for (const resource of result.resources as CloudinaryResource[]) {
      const isBefore = resource.public_id.endsWith("-antes");
      const isAfter = resource.public_id.endsWith("-depois");
      if (!isBefore && !isAfter) continue;

      const caseKey = resource.public_id.replace(/-(antes|depois)$/, "");
      const entry = pairs.get(caseKey) ?? {};
      if (isBefore) entry.before = resource;
      else entry.after = resource;
      pairs.set(caseKey, entry);
    }

    return Array.from(pairs.values())
      .filter(
        (entry): entry is { before: CloudinaryResource; after: CloudinaryResource } =>
          Boolean(entry.before && entry.after),
      )
      .map((entry) => ({
        treatment: entry.before.context?.custom?.treatment ?? "",
        caseLabel: entry.before.context?.custom?.case_label ?? "",
        beforeUrl: entry.before.secure_url,
        afterUrl: entry.after.secure_url,
        sortAt: entry.before.created_at,
      }))
      .sort((a, b) => (a.sortAt < b.sortAt ? 1 : -1))
      .map(({ sortAt: _sortAt, ...pair }) => pair);
  } catch (error) {
    console.error("Falha ao listar fotos antes/depois:", error);
    return [];
  }
}

export const listAntesDepois = createServerFn({ method: "GET" }).handler(listAntesDepoisHandler);
```

- [ ] **Step 5: Document the env vars in README**

In `README.md`, add a new section after the existing "Domínio do site (SEO / prévia de link)" section:

```markdown
## Antes & Depois (upload de fotos pela clínica)

A seção pública "Antes & Depois" e a página `/admin/antes-depois` dependem de
uma conta Cloudinary (da clínica, não sua — ver decisão no design doc) e de
quatro variáveis de ambiente, listadas em `.env.example`:

- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — em
  Cloudinary Console > Settings > Access Keys.
- `UPLOAD_PASSWORD` — senha simples que protege a página de upload.

Para desenvolvimento local, copie `.env.example` para `.env` e preencha os
valores (esse arquivo não é versionado). Na Vercel, configure as mesmas
variáveis em Project Settings > Environment Variables.
```

- [ ] **Step 6: Typecheck and lint**

Run:
```bash
npx tsc --noEmit
npm run lint
```
Expected: both pass with no errors related to `src/lib/antes-depois.ts`.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json .gitignore .env.example src/lib/antes-depois.ts README.md
git commit -m "feat: add Cloudinary server functions for antes/depois photos"
```

---

### Task 2: Admin upload page

**Files:**
- Create: `src/routes/admin/antes-depois.tsx`

**Interfaces:**
- Consumes: `uploadAntesDepois` from `src/lib/antes-depois.ts` (Task 1) — `uploadAntesDepois({ data: FormData }) => Promise<UploadAntesDepoisResult>`.

- [ ] **Step 1: Write the admin route**

Create `src/routes/admin/antes-depois.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { uploadAntesDepois } from "@/lib/antes-depois";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/antes-depois")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminAntesDepois,
});

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB — generous for a phone photo, safely under serverless body limits

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

function AdminAntesDepois() {
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    for (const field of ["before", "after"] as const) {
      const file = formData.get(field);
      if (file instanceof File && file.size > MAX_FILE_BYTES) {
        setStatus({
          type: "error",
          message: `A foto "${field === "before" ? "antes" : "depois"}" está grande demais (máx. 8MB). Tente uma versão comprimida.`,
        });
        return;
      }
    }

    setStatus({ type: "loading" });
    const result = await uploadAntesDepois({ data: formData });

    if (result.ok) {
      setStatus({ type: "success", message: "Fotos publicadas com sucesso." });
      form.reset();
    } else {
      setStatus({ type: "error", message: result.error });
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
      <h1 className="font-display text-2xl text-[#101215]">Publicar antes &amp; depois</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Envie as duas fotos de um caso. Elas aparecem no site assim que o envio terminar.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input id="password" name="password" type="password" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="treatment">Tratamento</Label>
          <Input
            id="treatment"
            name="treatment"
            type="text"
            required
            className="mt-1.5"
            placeholder="Ex: Botox"
          />
        </div>
        <div>
          <Label htmlFor="caseLabel">Nome/rótulo do caso</Label>
          <Input
            id="caseLabel"
            name="caseLabel"
            type="text"
            required
            className="mt-1.5"
            placeholder="Ex: Maria"
          />
        </div>
        <div>
          <Label htmlFor="before">Foto antes</Label>
          <Input id="before" name="before" type="file" accept="image/*" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="after">Foto depois</Label>
          <Input id="after" name="after" type="file" accept="image/*" required className="mt-1.5" />
        </div>

        {status.type === "error" && <p className="text-sm text-destructive">{status.message}</p>}
        {status.type === "success" && (
          <p className="text-sm text-emerald-600">{status.message}</p>
        )}

        <Button type="submit" disabled={status.type === "loading"} className="w-full">
          {status.type === "loading" ? "Enviando..." : "Publicar"}
        </Button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Start the dev server and let the router pick up the new route**

Run:
```bash
npm run dev
```
Expected: no errors in the terminal; `src/routeTree.gen.ts` gets regenerated with a `/admin/antes-depois` entry (open the file and confirm the new route appears — do not hand-edit it).

- [ ] **Step 3: Manual test — wrong password**

With a real `.env` in place (`CLOUDINARY_*` + `UPLOAD_PASSWORD` filled in, from Task 1 Step 3), open `http://localhost:3000/admin/antes-depois` in the browser. Fill the form with an intentionally wrong password and two small test images, submit.
Expected: inline error "Senha incorreta.", form fields stay filled, nothing appears in the Cloudinary media library.

- [ ] **Step 4: Manual test — successful upload**

Same page, now with the correct `UPLOAD_PASSWORD`, treatment "Teste", case "Caso1", and two real small images. Submit.
Expected: "Fotos publicadas com sucesso.", form clears. In the Cloudinary dashboard, confirm two new assets under `spazio-pulsare/antes-depois/` named `teste-caso1-antes` and `teste-caso1-depois`, tagged `antes-depois`, with context metadata `treatment=Teste` and `case_label=Caso1`.

- [ ] **Step 5: Commit**

```bash
git add "src/routes/admin/antes-depois.tsx" src/routeTree.gen.ts
git commit -m "feat: add password-gated antes/depois upload page"
```

---

### Task 3: Public "Antes & Depois" section

**Files:**
- Modify: `src/routes/index.tsx`

**Interfaces:**
- Consumes: `listAntesDepois` from `src/lib/antes-depois.ts` (Task 1) — `listAntesDepois() => Promise<AntesDepoisPair[]>`; `AntesDepoisPair = { treatment: string; caseLabel: string; beforeUrl: string; afterUrl: string }`.
- Consumes: `SectionHead`, `Reveal` (already defined/imported in `src/routes/index.tsx`).

- [ ] **Step 1: Add the import**

In `src/routes/index.tsx`, add to the existing import block (near the other `@/lib/clinic` / component imports):

```tsx
import { useQuery } from "@tanstack/react-query";
import { listAntesDepois } from "@/lib/antes-depois";
```

- [ ] **Step 2: Add the nav entry**

In the `NAV` array, insert a new entry between `"#sobre"` and `"#depoimentos"`:

```tsx
const NAV = [
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#sobre", label: "Sobre" },
  { href: "#antes-depois", label: "Antes & Depois" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];
```

- [ ] **Step 3: Add the `AntesDepois` section component**

Add this new function right after `About()` and before `Testimonials()`:

```tsx
function AntesDepois() {
  const { data: pairs } = useQuery({
    queryKey: ["antes-depois"],
    queryFn: () => listAntesDepois(),
  });

  if (!pairs || pairs.length === 0) return null;

  return (
    <section id="antes-depois" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 lg:py-28">
      <SectionHead
        eyebrow="Antes & Depois"
        title="Resultados reais, no ritmo de cada pele"
        text="Uma seleção de casos acompanhados pela nossa equipe."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pairs.map((pair, i) => (
          <Reveal key={`${pair.treatment}-${pair.caseLabel}-${i}`} delay={i * 90}>
            <article className="surface-card overflow-hidden border border-[#675249]/10 bg-[#F8F7F5] p-4">
              <div className="grid grid-cols-2 gap-2">
                <figure>
                  <img
                    src={pair.beforeUrl}
                    alt={`${pair.treatment} - antes`}
                    loading="lazy"
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                  <figcaption className="mt-2 text-center text-xs font-semibold text-[#946652]">
                    Antes
                  </figcaption>
                </figure>
                <figure>
                  <img
                    src={pair.afterUrl}
                    alt={`${pair.treatment} - depois`}
                    loading="lazy"
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                  <figcaption className="mt-2 text-center text-xs font-semibold text-[#946652]">
                    Depois
                  </figcaption>
                </figure>
              </div>
              <p className="mt-4 font-display text-sm font-semibold text-[#101215]">
                {pair.treatment}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Render the section in `Home()`**

Change the `Home()` JSX to insert `<AntesDepois />` between `<About />` and `<Testimonials />`:

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
          <AntesDepois />
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

- [ ] **Step 5: Manual test — empty state**

Before any real photos exist for this feature (or by temporarily testing against a Cloudinary account/tag with nothing uploaded), run `npm run dev`, open `http://localhost:3000/`.
Expected: no "Antes & Depois" section renders, no error in the browser console, rest of the page is unaffected, nav has no "Antes & Depois" link issue (link still present but scrolls to nothing — acceptable per spec, this is a corner case that resolves itself once the first pair is published).

- [ ] **Step 6: Manual test — populated state**

Using the test pair uploaded in Task 2 Step 4, reload `http://localhost:3000/`.
Expected: "Antes & Depois" section appears between "Sobre" and "Depoimentos", showing the "Teste"/"Caso1" pair with both images loading from Cloudinary URLs, labeled "Antes"/"Depois", treatment name "Teste" shown as caption. Clicking "Antes & Depois" in the header nav scrolls to the section.

- [ ] **Step 7: Typecheck and lint**

Run:
```bash
npx tsc --noEmit
npm run lint
```
Expected: both pass.

- [ ] **Step 8: Clean up the test upload**

In the Cloudinary dashboard, delete the `teste-caso1-antes` / `teste-caso1-depois` test assets (or leave them — they're harmless, but cleaner to remove before handing off to the client).

- [ ] **Step 9: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: add public Antes & Depois section"
```
