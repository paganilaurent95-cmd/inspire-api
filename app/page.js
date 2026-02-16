"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);
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

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      setResult(text);
    } catch (err) {
      console.error("ERROR:", err);
      setResult("Erreur côté navigateur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Test API</h1>
      <button onClick={testAPI} disabled={loading}>
        {loading ? "Chargement..." : "Tester génération"}
      </button>

      {result && (
        <pre style={{ marginTop: 20 }}>
          {result}
        </pre>
      )}
    </div>
  );
}
