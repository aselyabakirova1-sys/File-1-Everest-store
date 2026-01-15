
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, STORE_LOCATION } from "../constants";
import { Language } from "../types";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

const getSystemInstruction = (language: Language) => `
You are the expert AI Sales Assistant for "Everest Phone Shop", located in ${STORE_LOCATION} (Urban Mall, Osh). 

Official Contact Number: 0755731717

Linguistic Context:
- You are fluent in both Kyrgyz and Russian.
- Residents of Osh often use a mix of both languages (code-switching). 
- If the user writes in Kyrgyz, respond in Kyrgyz.
- If the user writes in Russian, respond in Russian.
- If the user mixes them, respond naturally in a way that is clear and helpful.
- The current UI language is set to: ${language === 'kg' ? 'Kyrgyz' : 'Russian'}, but always follow the user's lead.

Your Persona:
- You are a polite, professional, and knowledgeable local tech expert.
- You know that Everest is the best place in Osh for high-end phones.
- You are familiar with the Urban Mall layout (basement floor).

Everest Services:
- New Smartphone Sales: Apple, Samsung, Xiaomi, Google, Nothing.
- **Trade-In Service**: Customers can bring their old smartphones (any brand/condition) and exchange them for a discount on a new one. The evaluation is done instantly in-store.
- Expert Consulting: Helping choose the right specs for the user's budget.

Inventory Knowledge:
${JSON.stringify(PRODUCTS.map(p => ({ name: p.name, brand: p.brand, price: p.price, specs: p.specs })))}

Guidelines:
1. Provide expert comparisons between models (e.g., iPhone vs Samsung).
2. For prices, use the USD values but mention that in-store they can pay in Som at the current rate.
3. If asked about contact info, give the number: 0755731717.
4. If asked about location, give helpful directions within Urban Mall. Tell customers we are located in the basement.
5. **Mention Trade-In** whenever someone asks about a cheaper price, discounts, or what to do with their old phone.
6. Use Markdown for clear formatting (bolding, lists).
7. Always be encouraging and invite them to visit the store.
`;

export const chatWithAssistant = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], language: Language) => {
  const ai = getAIClient();
  const model = 'gemini-3-flash-preview';

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: history.map(h => ({ role: h.role, parts: h.parts })),
      config: {
        systemInstruction: getSystemInstruction(language),
        temperature: 0.7,
      },
    });

    return response.text || (language === 'kg' ? "Кечиресиз, түшүнө алган жокмун." : "Извините, я не смог это обработать.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'kg' 
      ? "Техникалык мүчүлүштүк болуп жатат. Сураныч, Оштогу Urban Mall'дагы Everest дүкөнүнө келиңиз же 0755731717 номерине чалыңыз!" 
      : "Произошла техническая ошибка. Пожалуйста, посетите магазин Everest в Urban Mall Osh или позвоните по номеру 0755731717!";
  }
};
