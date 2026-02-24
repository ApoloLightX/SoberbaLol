import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

/**
 * SOBERBA RIFT - Serviço de IA Unificado
 * Suporta Groq (primário) e Gemini (fallback)
 * Ambas as APIs são gratuitas e ultrarrápidas
 */

const groqApiKey = import.meta.env.VITE_GROQ_API_KEY || "";
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

let groqClient: Groq | null = null;
let geminiClient: GoogleGenerativeAI | null = null;

if (groqApiKey && groqApiKey !== "") {
  groqClient = new Groq({ apiKey: groqApiKey });
}

if (geminiApiKey && geminiApiKey !== "") {
  geminiClient = new GoogleGenerativeAI(geminiApiKey);
}

/**
 * Obtém análise estratégica da IA
 * Tenta Groq primeiro, depois Gemini como fallback
 */
export const getAdaptiveAdvice = async (prompt: string): Promise<string> => {
  // Tenta Groq primeiro (mais rápido e gratuito)
  if (groqClient) {
    try {
      console.log("[AI Service] Tentando Groq...");
      const response = await groqClient.chat.completions.create({
        model: "mixtral-8x7b-32768", // Modelo poderoso e gratuito da Groq
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        console.log("[AI Service] ✅ Groq respondeu com sucesso");
        return content;
      }
    } catch (groqError: any) {
      console.error("[AI Service] Erro no Groq:", groqError.message);
      // Continua para o fallback
    }
  }

  // Fallback: Tenta Gemini
  if (geminiClient) {
    try {
      console.log("[AI Service] Tentando Gemini como fallback...");
      const model = geminiClient.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        },
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (text) {
        console.log("[AI Service] ✅ Gemini respondeu com sucesso");
        return text;
      }
    } catch (geminiError: any) {
      console.error("[AI Service] Erro no Gemini:", geminiError.message);
    }
  }

  // Se ambas falharem, retorna mensagem de erro
  if (!groqClient && !geminiClient) {
    return "Erro: Nenhuma chave de API foi configurada. Configure VITE_GROQ_API_KEY ou VITE_GEMINI_API_KEY no Vercel.";
  }

  return "O Coach está processando... Tente novamente em alguns segundos.";
};

/**
 * Verifica qual API está disponível
 */
export const getAvailableAI = (): string => {
  if (groqClient) return "Groq (Ultrarrápido)";
  if (geminiClient) return "Gemini (Fallback)";
  return "Nenhuma API configurada";
};
