/**
 * SOBERBA RIFT - Serviço de IA Unificado (REST API)
 * Suporta Groq (primário) e Gemini (fallback)
 * Ambas as APIs são gratuitas e ultrarrápidas
 */

const groqApiKey = import.meta.env.VITE_GROQ_API_KEY || "";
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

console.log("[AI Service] Inicializando com chaves:");
console.log("[AI Service] VITE_GROQ_API_KEY:", groqApiKey ? "✅ Configurada" : "❌ Não configurada");
console.log("[AI Service] VITE_GEMINI_API_KEY:", geminiApiKey ? "✅ Configurada" : "❌ Não configurada");

/**
 * Chama a API do Groq via REST
 */
async function callGroqAPI(prompt: string): Promise<string | null> {
  if (!groqApiKey) {
    console.log("[AI Service] ⚠️ Groq: Chave não configurada");
    return null;
  }

  try {
    console.log("[AI Service] 🔄 Chamando Groq (mixtral-8x7b-32768)...");
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[AI Service] ❌ Groq Error:", response.status, errorData);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (content) {
      console.log("[AI Service] ✅ Groq respondeu com sucesso!");
      return content;
    } else {
      console.warn("[AI Service] ⚠️ Groq retornou resposta vazia");
      return null;
    }
  } catch (error: any) {
    console.error("[AI Service] ❌ Erro ao chamar Groq:", error.message);
    return null;
  }
}

/**
 * Chama a API do Gemini via REST
 */
async function callGeminiAPI(prompt: string): Promise<string | null> {
  if (!geminiApiKey) {
    console.log("[AI Service] ⚠️ Gemini: Chave não configurada");
    return null;
  }

  try {
    console.log("[AI Service] 🔄 Chamando Gemini (gemini-2.0-flash-exp)...");
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[AI Service] ❌ Gemini Error:", response.status, errorData);
      
      // Tenta com gemini-1.5-flash como fallback
      if (response.status === 404) {
        console.log("[AI Service] 🔄 Tentando gemini-1.5-flash como fallback...");
        return await callGeminiFallback(prompt);
      }
      return null;
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (content) {
      console.log("[AI Service] ✅ Gemini respondeu com sucesso!");
      return content;
    } else {
      console.warn("[AI Service] ⚠️ Gemini retornou resposta vazia");
      return null;
    }
  } catch (error: any) {
    console.error("[AI Service] ❌ Erro ao chamar Gemini:", error.message);
    return null;
  }
}

/**
 * Fallback para gemini-1.5-flash
 */
async function callGeminiFallback(prompt: string): Promise<string | null> {
  if (!geminiApiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("[AI Service] ❌ Gemini Fallback Error:", response.status);
      return null;
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (content) {
      console.log("[AI Service] ✅ Gemini Fallback respondeu com sucesso!");
      return content;
    }
    return null;
  } catch (error: any) {
    console.error("[AI Service] ❌ Erro no Gemini Fallback:", error.message);
    return null;
  }
}

/**
 * Obtém análise estratégica da IA
 * Tenta Groq primeiro, depois Gemini como fallback
 */
export const getAdaptiveAdvice = async (prompt: string): Promise<string> => {
  console.log("[AI Service] ========== INICIANDO REQUISIÇÃO DE IA ==========");

  // Tenta Groq primeiro (mais rápido e gratuito)
  if (groqApiKey) {
    const groqResponse = await callGroqAPI(prompt);
    if (groqResponse) {
      return groqResponse;
    }
  }

  // Fallback: Tenta Gemini
  if (geminiApiKey) {
    const geminiResponse = await callGeminiAPI(prompt);
    if (geminiResponse) {
      return geminiResponse;
    }
  }

  // Se ambas falharem
  const errorMsg = groqApiKey || geminiApiKey
    ? "O Coach está processando... Tente novamente em alguns segundos."
    : "Erro: Nenhuma chave de API foi configurada. Configure VITE_GROQ_API_KEY ou VITE_GEMINI_API_KEY no Vercel.";
  
  console.error("[AI Service] " + errorMsg);
  return errorMsg;
};

/**
 * Verifica qual API está disponível
 */
export const getAvailableAI = (): string => {
  if (groqApiKey) return "Groq (Ultrarrápido)";
  if (geminiApiKey) return "Gemini (Fallback)";
  return "Nenhuma API configurada";
};
