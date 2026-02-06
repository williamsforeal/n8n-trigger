// Maximum allowed payload size (100KB)
const MAX_BODY_SIZE = 1024 * 100;

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const webhook = process.env.N8N_WEBHOOK_URL;
    const secret = process.env.N8N_TRIGGER_SECRET;
  
    if (!webhook || !secret) {
      return res.status(500).json({ error: "Missing env vars" });
    }
  
    // Validate payload size to prevent memory exhaustion
    const bodyString = JSON.stringify(req.body ?? {});
    if (bodyString.length > MAX_BODY_SIZE) {
      return res.status(413).json({ error: "Payload too large" });
    }
  
    try {
      // Add timeout to prevent indefinite hangs
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout
  
      const response = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-trigger-secret": secret,
        },
        body: bodyString,
        signal: controller.signal,
      });
  
      clearTimeout(timeout);
  
      const text = await response.text();
      
      // Forward the actual response status instead of always returning 200
      return res.status(response.status).send(text);
    } catch (error) {
      // Log full error details for debugging (server-side only)
      console.error("Webhook error:", error.message, error);
      
      // Handle timeout errors specifically
      if (error.name === "AbortError") {
        return res.status(504).json({ 
          error: "Gateway timeout",
          message: "The webhook request timed out"
        });
      }
      
      // Return sanitized error message without exposing internal details
      return res.status(503).json({ 
        error: "Service unavailable",
        message: "Unable to reach webhook service"
      });
    }
  }
  