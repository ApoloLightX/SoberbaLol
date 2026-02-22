import { GoogleGenerativeAI } from "@google/generative-ai";

// Esta linha garante que o código use a chave VITE_ que você salvou
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export const getAdaptiveAdvice = async (prompt: string) => {
  if (!apiKey) {
    console.error("API Key não encontrada no ambiente VITE.");
    return "Erro: Chave de API não configurada corretamente.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro na chamada do Gemini:", error);
    return "O Soberba Rift está com instabilidade na conexão. Tente novamente em instantes.";
  }
};
