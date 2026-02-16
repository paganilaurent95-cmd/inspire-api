"use client";

import { useState } from "react";

export default function Home() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget: "500€",
          temps: "5h par semaine",
          type: "digital",
          competences: "aucune",
          risque: "faible",
          objectif: "revenu complémentaire"
        }),
      });

      const data = await res.json();
      setIdeas(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Générateur d'idées</h1>

      <button onClick={testAPI} disabled={loading}>
        {loading ? "Chargement..." : "Générer 3 idées"}
      </button>

      <div style={{ marginTop: 30 }}>
        {ideas.map((idea, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            padding: 20,
            marginBottom: 20,
            borderRadius: 10
          }}>
            <h2>{idea.nom || `Idée ${index + 1}`}</h2>
            <p>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
