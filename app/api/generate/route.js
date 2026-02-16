export const runtime = "nodejs";

import OpenAI from "openai";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export async function POST(req) {
  try {
    const body = await req.json();

    const { budget, temps, type, competences, risque, objectif } = body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Tu es un expert en création de business réaliste pour le marché francophone.

Génère EXACTEMENT 3 idées adaptées à ce profil :

Budget : ${budget}
Temps disponible : ${temps}
Type préféré : ${type}
Compétences : ${competences}
Tolérance au risque : ${risque}
Objectif : ${objectif}

Retourne uniquement un tableau JSON avec 3 objets.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8
    });

    return new Response(completion.choices[0].message.content, {
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erreur génération" }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: corsHeaders
  });
}
