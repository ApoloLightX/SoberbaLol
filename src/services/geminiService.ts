import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * No Vite, variáveis de ambiente são acessadas via import.meta.env.
 * Para que funcionem em produção (Vercel), elas devem começar com VITE_.
 */

// Prioridade: VITE_GEMINI_API_KEY (Padrão Vite) -> GEMINI_API_KEY (Fallback Vercel)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

let genAI: GoogleGenerativeAI | null = null;

if (apiKey && apiKey !== "") {
  genAI = new GoogleGenerativeAI(apiKey);
}

export const getAdaptiveAdvice = async (prompt: string) => {
  if (!apiKey || apiKey === "") {
    console.error("Soberba Rift: VITE_GEMINI_API_KEY não encontrada.");
    return "Erro: A chave de API da IA não foi configurada no Vercel. Por favor, adicione VITE_GEMINI_API_KEY nas configurações do projeto.";
  }

  if (!genAI) {
    return "Erro: Serviço de IA não inicializado.";
  }

  try {
    // Usando gemini-1.5-flash - Este é o nome de modelo mais comum e suportado
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
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
    
    const errorMessage = error.message || "";
    
    // Tratamento de erros específicos
    if (errorMessage.includes("API key not valid") || errorMessage.includes("INVALID_ARGUMENT")) {
      return "Erro: A chave de API do Gemini é inválida ou não foi configurada. Verifique-a no painel do Vercel.";
    }
    if (errorMessage.includes("quota") || errorMessage.includes("RESOURCE_EXHAUSTED")) {
      return "Limite de requisições atingido. Tente novamente em instantes.";
    }
    
    // Se falhar com 1.5-flash, tenta o gemini-pro como fallback automático
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await fallbackModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (fallbackError) {
      return "O Coach está analisando... Tente novamente em alguns segundos.";
    }
  }
};
