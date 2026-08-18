import { createServerFn } from "@tanstack/react-start";

// Lazy-load cloudinary to ensure it only runs on server
let cloudinary: typeof import("cloudinary").v2;

async function configureCloudinary(): Promise<void> {
  if (!cloudinary) {
    const mod = await import("cloudinary");
    cloudinary = mod.v2;
  }
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

  await configureCloudinary();

  const caseKey = `${slugify(treatment)}-${slugify(caseLabel)}`;
  const context = { treatment: treatment.trim(), case_label: caseLabel.trim() };

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
  await configureCloudinary();

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
      .filter((entry): entry is { before: CloudinaryResource; after: CloudinaryResource } =>
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
