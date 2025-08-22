// components/ResultsTable.tsx
"use client";

type Item = {
  tipo_proyecto: string | null;
  valor_proyecto: number | null;
  responsable_proyecto: string | null;
};

export function ResultsTable({ items }: { items: Item[] }) {
  if (!items?.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
        No hay resultados para mostrar.
      </div>
    );
  }

  const money = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <Th>tipo_proyecto</Th>
            <Th>valor_proyecto</Th>
            <Th>responsable_proyecto</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50">
              <Td>{row.tipo_proyecto ?? "—"}</Td>
              <Td>
                {row.valor_proyecto == null ? "—" : money.format(Number(row.valor_proyecto))}
              </Td>
              <Td>{row.responsable_proyecto ?? "—"}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 text-sm text-slate-800">{children}</td>;
}
