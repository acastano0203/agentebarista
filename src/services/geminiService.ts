import { GoogleGenAI, Type } from "@google/genai";
import type { CoffeeProfile } from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing VITE_GEMINI_API_KEY in environment (set it in a .env file or your host environment)");
}

const ai = new GoogleGenAI({ apiKey });

export const getBaristaResponse = async (history: { role: string, parts: { text: string }[] }[]) => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: history,
    config: {
      systemInstruction: "Eres un Barista experto. Tu única misión es identificar el perfil de café del cliente. Sé EXTREMADAMENTE BREVE (máximo 20-30 palabras). Saluda cordialmente, haz una pregunta directa sobre sus gustos (notas, acidez o cuerpo) y deja que el sistema filtre. No des explicaciones largas.",
    },
  });
  const result = await model;
  return result.text;
};

export const profileUserTaste = async (chatHistory: string): Promise<CoffeeProfile> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analiza la siguiente conversación entre un barista y un cliente y extrae el perfil de sabor del cliente en formato JSON.
    
    Conversación:
    ${chatHistory}
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          preferredNotes: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Lista de notas de sabor preferidas (ej: chocolate, frutos rojos, cítricos)."
          },
          acidity: {
            type: Type.STRING,
            enum: ["Low", "Medium", "High"],
            description: "Preferencia de acidez."
          },
          body: {
            type: Type.STRING,
            enum: ["Light", "Medium", "Full"],
            description: "Preferencia de cuerpo del café."
          },
          summary: {
            type: Type.STRING,
            description: "Un resumen poético y experto del perfil del cliente."
          }
        },
        required: ["preferredNotes", "acidity", "body", "summary"]
      }
    }
  });

  return JSON.parse(response.text || "{}") as CoffeeProfile;
};
