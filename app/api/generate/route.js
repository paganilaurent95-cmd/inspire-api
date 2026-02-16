export const runtime = "nodejs";

import OpenAI from "openai";

export async function POST(req) {
  try {
    const body = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Donne-moi 3 idées de business simples pour quelqu’un avec :
          Budget: ${body.budget},
          Temps: ${body.temps},
          Type: ${body.type},
          Compétences: ${body.competences},
          Risque: ${body.risque},
          Objectif: ${body.objectif}.
          Retourne uniquement un JSON tableau.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return new Response(completion.choices[0].message.content, {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
