export default async function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).json({ message: "API fonctionne 🚀" });
  }

  if (req.method === "POST") {
    return res.status(200).json({ message: "POST reçu ✅" });
  }

  return res.status(405).json({ error: "Méthode non autorisée" });
}
