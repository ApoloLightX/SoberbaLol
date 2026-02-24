
/**
 * SOBERBA RIFT - AI ENGINE v3.0 (GROQ EXCLUSIVE)
 * Motor de decisão baseado em Llama 3.3 70B para análise de alta performance.
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function getAdaptiveAdvice(prompt: string): Promise<string> {
  if (!GROQ_API_KEY) {
    console.error("ERRO: VITE_GROQ_API_KEY não configurada.");
    return "Erro de configuração: Chave de API do Groq não encontrada. Verifique as variáveis de ambiente no Vercel.";
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Você é o SOBERBA AI, o coach de Wild Rift mais avançado do mundo. Sua especialidade é análise de dados, macrogame e builds adaptativas para o Patch 7.0c. Seja direto, técnico, e use terminologia de alto elo (Challenger). Responda sempre em Português do Brasil (PT-BR)."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro na API do Groq:", errorData);
      
      if (errorData.error?.code === "model_decommissioned") {
        return "Erro: O modelo de IA foi descontinuado. Por favor, atualize o sistema para usar o Llama 3.3.";
      }
      
      return `Erro na análise: ${errorData.error?.message || "Falha na comunicação com o servidor de IA."}`;
    }

    const data = await response.json();
    return data.choices[0].message.content || "Não foi possível gerar um diagnóstico no momento.";

  } catch (error) {
    console.error("Erro ao chamar a IA:", error);
    return "Falha crítica na conexão com o motor SOBERBA AI. Verifique sua internet ou o status do serviço Groq.";
  }
}

export const getAvailableAI = (): string => {
  return GROQ_API_KEY ? "Groq (Llama 3.3 70B)" : "Nenhuma API configurada";
};
