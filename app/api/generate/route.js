import OpenAI from "openai";

export async function POST(req) {
  const body = await req.json();

  const { budget, temps, type, competences, risque, objectif } = body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
Tu es un expert en création de business réaliste pour le marché francophone.

Génère 7 idées de business adaptées à ce profil :

Budget : ${budget}
Temps disponible : ${temps}
Type préféré : ${type}
Compétences : ${competences}
Tolérance au risque : ${risque}
Objectif : ${objectif}

Retourne uniquement du JSON sous forme de tableau.

Chaque idée doit contenir :
{
  "nom": "",
  "description": "",
  "pourquoi_cest_adapte": "",
  "budget_estime": "",
  "temps_par_semaine": "",
  "premiere_action": "",
  "potentiel_mensuel_estime": "",
  "niveau_difficulte": ""
}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8
  });

  return new Response(completion.choices[0].message.content, {
    headers: { "Content-Type": "application/json" }
  });
}
