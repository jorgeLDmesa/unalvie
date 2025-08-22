// app/pdf-extractor/page.tsx
"use client";

import { useState, useRef } from "react";
import { ResultsTable } from "./_components/ResultsTable";
import { UploadCard } from "./_components/UploadCard";

type Item = {
  tipo_proyecto: string | null;
  valor_proyecto: number | null;
  responsable_proyecto: string | null;
};

export default function PdfExtractorPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileRef = useRef<File | null>(null);

  const onFileSelected = (f: File | null) => {
    fileRef.current = f;
    setItems([]);
    setErrorMsg(null);
  };

  const handleProcess = async () => {
    setErrorMsg(null);
    setItems([]);
    if (!fileRef.current) {
      setErrorMsg("Primero selecciona un PDF.");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", fileRef.current);
      const res = await fetch("/api/extract", { method: "POST", body: fd });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e?.error ?? `Fallo con estado ${res.status}`);
      }
      const data = await res.json();
      setItems(Array.isArray(data?.items) ? data.items : []);
    } catch (e: any) {
      setErrorMsg(e?.message ?? "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-dvh bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Extractor de proyectos desde PDF</h1>
          <p className="text-slate-600">
            Sube un PDF y obtén una tabla con <b>tipo_proyecto</b>, <b>valor_proyecto</b> y{" "}
            <b>responsable_proyecto</b>.
          </p>
        </header>

        <UploadCard onFileSelected={onFileSelected} onProcess={handleProcess} loading={loading} />

        {errorMsg && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{errorMsg}</div>
        )}

        <section className="mt-8">
          <ResultsTable items={items} />
        </section>
      </div>
    </main>
  );
}
