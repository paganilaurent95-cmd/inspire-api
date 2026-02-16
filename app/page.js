"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);

  const testAPI = async () => {
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
    setResult(data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Test API</h1>
      <button onClick={testAPI}>Tester génération</button>

      {result && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
