// components/UploadCard.tsx
"use client";

import { useState, DragEvent } from "react";

type Props = {
  onFileSelected: (file: File | null) => void;
  onProcess: () => void;
  loading: boolean;
};

export function UploadCard({ onFileSelected, onProcess, loading }: Props) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isOver, setIsOver] = useState(false);

  const handleFile = (f: File | null) => {
    if (f && f.type !== "application/pdf") return;
    setFileName(f ? f.name : null);
    onFileSelected(f);
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);
    const f = e.dataTransfer.files?.[0] ?? null;
    handleFile(f);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={onDrop}
        className={[
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition",
          isOver ? "border-indigo-400 bg-indigo-50" : "border-slate-300 hover:bg-slate-50",
        ].join(" ")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 13v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6H3l9-9 9 9h-2ZM5 11v8h14v-8l-7-7-7 7Zm7 3a1 1 0 0 0-1 1v3h2v-3a1 1 0 0 0-1-1Z" />
        </svg>
        <div className="text-sm text-slate-600">
          Arrastra y suelta un <b>PDF</b> aquí, o haz clic para seleccionar
        </div>
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
      </label>

      <div className="mt-3 text-sm text-slate-700">
        {fileName ? (
          <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            {fileName}
          </span>
        ) : (
          <span className="text-slate-500">Ningún archivo seleccionado</span>
        )}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={onProcess}
          disabled={loading || !fileName}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Procesando…" : "Procesar"}
        </button>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Recomendación: archivos &lt; 20 MB se envían inline; para archivos grandes se debe usar Files API.
      </p>
    </div>
  );
}
