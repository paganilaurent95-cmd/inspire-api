export const runtime = "nodejs";

import OpenAI from "openai";

export async function POST(req) {
  try {
    const body = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Tu es un expert en création de business réaliste pour le marché francophone.

Génère EXACTEMENT 3 idées adaptées à ce profil :

Budget : ${body.budget}
Temps disponible : ${body.temps}
Type préféré : ${body.type}
Compétences : ${body.competences}
Tolérance au risque : ${body.risque}
Objectif : ${body.objectif}

IMPORTANT :
- Retourne UNIQUEMENT un tableau JSON
- Aucune phrase avant ou après
- Aucun markdown
- Pas de \`\`\`
- Format strictement :

[
  {
    "nom": "",
    "description": ""
  }
]
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 600
    });

    const raw = completion.choices[0].message.content.trim();

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      return new Response(
        JSON.stringify({
          error: "Réponse OpenAI invalide",
          raw: raw
        }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(parsed), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Erreur serveur:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
