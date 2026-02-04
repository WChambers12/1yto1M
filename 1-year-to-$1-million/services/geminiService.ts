import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, PlanData } from "../types";

// Schema definition for structured output
const planSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A motivational summary of the personalized plan (max 2 sentences).",
    },
    phases: {
      type: Type.ARRAY,
      description: "Breakdown of the year into 4 quarterly phases.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Phase title (e.g., 'Foundation & Outreach')" },
          duration: { type: Type.STRING, description: "Duration (e.g., 'Month 1-3')" },
          focus: { type: Type.STRING, description: "Primary strategic focus for this phase." },
          habits: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 key daily/weekly habits for this phase."
          }
        },
        required: ["title", "duration", "focus", "habits"],
      }
    },
    dailyRoutine: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A generic effective daily schedule based on their time commitment."
    },
    wellnessTip: {
      type: Type.STRING,
      description: "A specific mental health or wellness tip for preventing burnout."
    }
  },
  required: ["summary", "phases", "dailyRoutine", "wellnessTip"]
};

export const generatePersonalizedPlan = async (user: UserProfile): Promise<PlanData> => {
  if (!process.env.API_KEY) {
    console.warn("API Key missing, returning fallback plan.");
    return getFallbackPlan(user);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Create a 1 Year to $1 Million roadmap for a Real Estate Agent.
      
      User Context:
      - Name: ${user.name}
      - Financial Goal: ${user.goal}
      - Daily Time Commitment: ${user.dailyCommitment}
      
      Philosophy: "The 1Y-1M path isn't a sprint; it's a balanced marathon. We build wealth so we can live, not live so we can build wealth."
      
      Requirements:
      1. Focus on high-leverage activities (lead gen, prospecting).
      2. Strictly adhere to the ${user.dailyCommitment} time constraint.
      3. Include mental health/wellness balance.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: planSchema,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as PlanData;
    }
    throw new Error("No response text");

  } catch (error) {
    console.error("Gemini generation failed:", error);
    return getFallbackPlan(user);
  }
};

// Fallback logic if API fails or key is missing (ensures app works offline/without key)
const getFallbackPlan = (user: UserProfile): PlanData => {
  return {
    summary: `Welcome to the marathon, ${user.name}. Achieving ${user.goal} with ${user.dailyCommitment} daily requires laser focus on high-income activities without sacrificing your health.`,
    phases: [
      {
        title: "Phase 1: The Foundation",
        duration: "Months 1-3",
        focus: "Building your database and establishing daily prospecting rituals.",
        habits: ["Add 5 new contacts daily", "30 mins social media engagement", "1 hour power-dialing"]
      },
      {
        title: "Phase 2: Momentum",
        duration: "Months 4-6",
        focus: "Nurturing leads and starting to scale via systems.",
        habits: ["Weekly newsletter", "Follow-up Friday calls", "Attend 2 networking events/month"]
      },
      {
        title: "Phase 3: Leverage",
        duration: "Months 7-9",
        focus: "Hiring admin support or automating workflows.",
        habits: ["Document 1 process weekly", "Focus only on $500/hr tasks", "Strategic partnerships"]
      },
      {
        title: "Phase 4: Mastery",
        duration: "Months 10-12",
        focus: "Refining the machine and maximizing referrals.",
        habits: ["Client appreciation events", "Review ROI on all lead sources", "Plan next year's vision"]
      }
    ],
    dailyRoutine: [
      "08:00 AM - Mindset & Planning",
      "09:00 AM - Lead Generation (The One Thing)",
      "10:30 AM - Follow-ups",
      "11:00 AM - Admin/Email",
      "12:00 PM - Disconnect & Recharge"
    ],
    wellnessTip: "Remember to take full weekends off once a month. Burnout costs more than missed leads."
  };
};
