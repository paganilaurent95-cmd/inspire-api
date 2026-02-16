export async function GET() {
  return new Response(
    JSON.stringify({ message: "API fonctionne 🚀" }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
}
