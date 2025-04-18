import { seedTransactions } from "@/actions/seed";

export async function GET() {
    try {
      const result = await seedTransactions();
      return Response.json(result);
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to seed transactions" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }