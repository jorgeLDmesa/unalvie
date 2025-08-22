// app/api/extract/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

export const runtime = "nodejs"; // Asegura Node en Vercel/Next

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Solo se aceptan PDFs" }, { status: 400 });
    }

    // Lee el PDF y lo convierte a base64 (modo inlineData recomendado <20MB)
    // Para >20MB, ver comentario más abajo (Files API).
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Esquema estrictamente tipado (salida = array de objetos)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                "Analiza el PDF y extrae todos los proyectos encontrados. " +
                "Devuelve un arreglo JSON donde cada elemento tiene exactamente " +
                "estas claves en snake_case: tipo_proyecto (string), " +
                "valor_proyecto (number; sin símbolos, en unidades monetarias), " +
                "responsable_proyecto (string). Si falta un dato, usa null.",
            },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              tipo_proyecto: { type: Type.STRING, nullable: true },
              valor_proyecto: { type: Type.NUMBER, nullable: true },
              responsable_proyecto: { type: Type.STRING, nullable: true },
            },
            required: ["tipo_proyecto", "valor_proyecto", "responsable_proyecto"],
            propertyOrdering: ["tipo_proyecto", "valor_proyecto", "responsable_proyecto"],
          },
        },
      },
    });

    // `response.text` trae el JSON como string
    let data: unknown = [];
    try {
      data = JSON.parse(response.text ?? "[]");
    } catch {
      // fallback: si por alguna razón no fue JSON válido
      data = [];
    }

    return NextResponse.json({ items: data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Error procesando el PDF", detail: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}

/**
 * NOTA para PDFs >20MB:
 * Usa Files API:
 *   const uploaded = await ai.files.upload({ file: <Blob|path>, config: { mimeType: "application/pdf" } });
 *   Luego en contents usa createPartFromUri(uploaded.uri, uploaded.mimeType).
 * Ver guía Files API de Gemini.
 */
