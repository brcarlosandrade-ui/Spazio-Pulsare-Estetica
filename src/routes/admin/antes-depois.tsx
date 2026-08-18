import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);

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
          <div className="relative mt-1.5">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden />
              ) : (
                <Eye className="h-4 w-4" aria-hidden />
              )}
            </button>
          </div>
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
          <Input
            id="before"
            name="before"
            type="file"
            accept="image/*"
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="after">Foto depois</Label>
          <Input id="after" name="after" type="file" accept="image/*" required className="mt-1.5" />
        </div>

        {status.type === "error" && <p className="text-sm text-destructive">{status.message}</p>}
        {status.type === "success" && <p className="text-sm text-emerald-600">{status.message}</p>}

        <Button type="submit" disabled={status.type === "loading"} className="w-full">
          {status.type === "loading" ? "Enviando..." : "Publicar"}
        </Button>
      </form>
    </div>
  );
}
