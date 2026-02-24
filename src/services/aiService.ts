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
  console.log("[AI Service] ✅ Groq Client inicializado");
}

if (geminiApiKey && geminiApiKey !== "") {
  geminiClient = new GoogleGenerativeAI(geminiApiKey);
  console.log("[AI Service] ✅ Gemini Client inicializado");
}

/**
 * Obtém análise estratégica da IA
 * Tenta Groq primeiro, depois Gemini como fallback
 */
export const getAdaptiveAdvice = async (prompt: string): Promise<string> => {
  console.log("[AI Service] Iniciando requisição de IA...");
  console.log("[AI Service] Groq disponível:", !!groqClient);
  console.log("[AI Service] Gemini disponível:", !!geminiClient);

  // Tenta Groq primeiro (mais rápido e gratuito)
  if (groqClient) {
    try {
      console.log("[AI Service] 🔄 Tentando Groq com modelo mixtral-8x7b-32768...");
      const response = await groqClient.chat.completions.create({
        model: "mixtral-8x7b-32768",
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
        console.log("[AI Service] ✅ Groq respondeu com sucesso!");
        return content;
      } else {
        console.warn("[AI Service] ⚠️ Groq retornou resposta vazia");
      }
    } catch (groqError: any) {
      console.error("[AI Service] ❌ Erro no Groq:", groqError.message || groqError);
      console.error("[AI Service] Stack:", groqError.stack);
    }
  } else {
    console.warn("[AI Service] ⚠️ Groq Client não inicializado (chave ausente)");
  }

  // Fallback: Tenta Gemini
  if (geminiClient) {
    try {
      console.log("[AI Service] 🔄 Tentando Gemini com modelo gemini-1.5-flash...");
      
      // Usa getGenerativeModel com a nomenclatura correta
      const model = geminiClient.getGenerativeModel({
        model: "gemini-1.5-flash", // Nome correto do modelo
      });

      console.log("[AI Service] Enviando prompt para Gemini...");
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        },
      });

      const response = await result.response;
      const text = response.text();

      if (text) {
        console.log("[AI Service] ✅ Gemini respondeu com sucesso!");
        return text;
      } else {
        console.warn("[AI Service] ⚠️ Gemini retornou resposta vazia");
      }
    } catch (geminiError: any) {
      console.error("[AI Service] ❌ Erro no Gemini:", geminiError.message || geminiError);
      console.error("[AI Service] Stack:", geminiError.stack);
      
      // Se for erro 404 de modelo, tenta com gemini-pro como último recurso
      if (geminiError.message?.includes("404") || geminiError.message?.includes("not found")) {
        console.log("[AI Service] 🔄 Tentando fallback com gemini-pro...");
        try {
          const fallbackModel = geminiClient.getGenerativeModel({
            model: "gemini-pro",
          });
          const fallbackResult = await fallbackModel.generateContent(prompt);
          const fallbackResponse = await fallbackResult.response;
          const fallbackText = fallbackResponse.text();
          
          if (fallbackText) {
            console.log("[AI Service] ✅ Gemini Pro respondeu com sucesso!");
            return fallbackText;
          }
        } catch (fallbackError: any) {
          console.error("[AI Service] ❌ Erro no Gemini Pro:", fallbackError.message || fallbackError);
        }
      }
    }
  } else {
    console.warn("[AI Service] ⚠️ Gemini Client não inicializado (chave ausente)");
  }

  // Se ambas falharem, retorna mensagem de erro
  if (!groqClient && !geminiClient) {
    const errorMsg = "Erro: Nenhuma chave de API foi configurada. Configure VITE_GROQ_API_KEY ou VITE_GEMINI_API_KEY no Vercel.";
    console.error("[AI Service] " + errorMsg);
    return errorMsg;
  }

  const fallbackMsg = "O Coach está processando... Tente novamente em alguns segundos.";
  console.warn("[AI Service] " + fallbackMsg);
  return fallbackMsg;
};

/**
 * Verifica qual API está disponível
 */
export const getAvailableAI = (): string => {
  if (groqClient) return "Groq (Ultrarrápido)";
  if (geminiClient) return "Gemini (Fallback)";
  return "Nenhuma API configurada";
};
