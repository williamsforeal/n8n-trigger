export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const webhook = process.env.N8N_WEBHOOK_URL;
    const secret = process.env.N8N_TRIGGER_SECRET;
  
    if (!webhook || !secret) {
      return res.status(500).json({ error: "Missing env vars" });
    }
  
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-trigger-secret": secret,
      },
      body: JSON.stringify(req.body ?? {}),
    });
  
    const text = await response.text();
    return res.status(200).send(text);
  }
  