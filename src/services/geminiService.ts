import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * No Vite, variáveis de ambiente são acessadas via import.meta.env.
 * Para que funcionem em produção (Vercel), elas devem começar com VITE_.
 * No entanto, o vite.config.ts deste projeto está injetando GEMINI_API_KEY via 'define'.
 */

// @ts-ignore - process.env pode não estar definido no tipo, mas o Vite injeta via define
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '');

const genAI = new GoogleGenerativeAI(apiKey || "");

export const getAdaptiveAdvice = async (prompt: string) => {
  if (!apiKey) {
    console.error("Soberba Rift: GEMINI_API_KEY não encontrada. Verifique as variáveis de ambiente no Vercel.");
    return "Desculpe, o sistema de IA não está configurado. Verifique sua chave de API no painel do Vercel.";
  }

  try {
    // Usando gemini-1.5-flash para respostas rápidas e eficientes
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("Resposta vazia da IA");
    }
    
    return text;
  } catch (error: any) {
    console.error("Erro na chamada do Gemini:", error);
    
    // Tratamento de erros específicos
    const errorMessage = error.message || "";
    if (errorMessage.includes("API key not valid")) {
      return "Erro: A chave de API do Gemini é inválida. Atualize-a no Vercel.";
    }
    if (errorMessage.includes("quota")) {
      return "Limite de requisições atingido. Tente novamente em um minuto.";
    }
    
    return "Desculpe, não consegui processar sua solicitação estratégica no momento. Tente novamente.";
  }
};
