import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

export const getAdaptiveAdvice = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: "Você é um arquiteto sênior e designer de sistemas de MOBA competitivo, especialista em Wild Rift. Suas respostas devem ser estritamente em Português Brasileiro (PT-BR), técnicas, estratégicas e focadas exclusivamente nas mecânicas do Wild Rift (mapa menor, tempo mais rápido, itens exclusivos).",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return "Desculpe, não consegui processar sua solicitação estratégica no momento.";
  }
};
