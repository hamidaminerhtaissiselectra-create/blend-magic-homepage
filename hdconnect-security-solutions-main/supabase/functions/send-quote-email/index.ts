import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const TARGET_EMAIL = "kamal@hdconnect.fr";
const SENDER_EMAIL = "onboarding@resend.dev"; // Utilisez votre domaine vérifié

// CORS headers - restricted to specific origins in production
const ALLOWED_ORIGINS = [
  "https://hdconnect.fr",
  "https://www.hdconnect.fr",
  "https://blend-magic-homepage.lovable.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
};

// Rate limiting with in-memory store (resets on function cold start)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // 5 requests
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour

function checkRateLimit(clientIP: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(clientIP);

  if (!record || record.resetAt <= now) {
    rateLimitStore.set(clientIP, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

// Input validation and sanitization
const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_BODY_SIZE = 50 * 1024; // 50KB

function sanitizeString(input: unknown, maxLength: number = MAX_FIELD_LENGTH): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function validatePhone(phone: string): boolean {
  // Allow common phone formats
  const phoneRegex = /^[\d\s\-\+\(\)\.]{6,20}$/;
  return phoneRegex.test(phone);
}

function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ status: "error", message: "Method Not Allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  // Rate limiting
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("cf-connecting-ip") || 
                   "unknown";
  
  const rateCheck = checkRateLimit(clientIP);
  if (!rateCheck.allowed) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ 
        status: "error", 
        message: "Trop de demandes. Veuillez réessayer plus tard." 
      }),
      { 
        status: 429, 
        headers: { 
          "Content-Type": "application/json",
          "Retry-After": "3600",
          ...corsHeaders 
        } 
      }
    );
  }

  try {
    // Check body size
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
      return new Response(
        JSON.stringify({ status: "error", message: "Requête trop volumineuse" }),
        { status: 413, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const formData = await req.json();
    
    // Validate and sanitize all inputs
    const sanitizedData = {
      requestType: sanitizeString(formData.requestType, 50),
      selectedService: sanitizeString(formData.selectedService, 100),
      selectedProblem: sanitizeString(formData.selectedProblem, 100),
      name: sanitizeString(formData.name || formData.clientInfo?.name, 100),
      email: sanitizeString(formData.email || formData.clientInfo?.email, 255),
      phone: sanitizeString(formData.phone || formData.clientInfo?.phone, 20),
      address: sanitizeString(formData.address || formData.clientInfo?.address, 200),
      message: sanitizeString(formData.message || formData.clientInfo?.message, MAX_MESSAGE_LENGTH),
      timeline: sanitizeString(formData.timeline || formData.clientInfo?.timeline, 100),
      budget: sanitizeString(formData.budget || formData.clientInfo?.budget, 50),
      description: sanitizeString(formData.description, MAX_MESSAGE_LENGTH),
      urgency: sanitizeString(formData.urgency, 50),
    };

    // Validate required fields based on request type
    if (sanitizedData.email && !validateEmail(sanitizedData.email)) {
      return new Response(
        JSON.stringify({ status: "error", message: "Format d'email invalide" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (sanitizedData.phone && !validatePhone(sanitizedData.phone)) {
      return new Response(
        JSON.stringify({ status: "error", message: "Format de téléphone invalide" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // 1. Construction du corps de l'e-mail (using escaped values)
    let subject = `[HD Connect - Demande] `;
    let body = `Nouvelle demande reçue via le formulaire du site.\n\n`;

    // Logique pour déterminer le type de demande et construire le sujet/corps
    if (sanitizedData.requestType === 'quote') {
      const serviceLabel = escapeHtml(sanitizedData.selectedService || 'Devis Général');
      subject += `Devis: ${serviceLabel}`;
      body += `--- Demande de Devis ---\n`;
      body += `Service: ${serviceLabel}\n\n`;
      
      // Détails du projet (QuoteFunnel)
      if (formData.quoteData?.details) {
        body += `--- Détails du Projet ---\n`;
        for (const [key, value] of Object.entries(formData.quoteData.details)) {
          const safeKey = escapeHtml(sanitizeString(key, 50));
          const safeValue = escapeHtml(sanitizeString(String(value), MAX_FIELD_LENGTH));
          body += `${safeKey}: ${safeValue}\n`;
        }
        body += `\n`;
      }
      
      // Informations Client
      body += `--- Informations Client ---\n`;
      body += `Nom: ${escapeHtml(sanitizedData.name || 'N/A')}\n`;
      body += `Téléphone: ${escapeHtml(sanitizedData.phone || 'N/A')}\n`;
      body += `Email: ${escapeHtml(sanitizedData.email || 'N/A')}\n`;
      body += `Adresse (Ville/CP): ${escapeHtml(sanitizedData.address || 'N/A')}\n`;
      body += `Période souhaitée: ${escapeHtml(sanitizedData.timeline || 'N/A')}\n`;
      body += `Budget: ${escapeHtml(sanitizedData.budget || 'Non spécifié')}\n`;
      body += `Message: ${escapeHtml(sanitizedData.message || 'Aucun')}\n`;

    } else if (sanitizedData.requestType === 'intervention') {
      const problemLabel = escapeHtml(sanitizedData.selectedProblem || 'Intervention Générale');
      subject += `Intervention: ${problemLabel}`;
      body += `--- Demande d'Intervention ---\n`;
      body += `Type de Problème: ${problemLabel}\n`;
      
      // Détails de l'intervention (QuoteFunnel)
      if (formData.interventionData) {
        body += `--- Détails du Problème ---\n`;
        body += `Description: ${escapeHtml(sanitizeString(formData.interventionData.description, MAX_MESSAGE_LENGTH) || 'N/A')}\n`;
        body += `Fonctionnait avant: ${escapeHtml(sanitizeString(formData.interventionData.workedBefore, 50) || 'N/A')}\n`;
        body += `Lieu: ${escapeHtml(sanitizeString(formData.interventionData.locationType, 100) || 'N/A')}\n`;
        body += `Urgence: ${escapeHtml(sanitizedData.urgency || 'N/A')}\n\n`;
      }

      // Informations Client
      body += `--- Informations Client ---\n`;
      body += `Nom: ${escapeHtml(sanitizedData.name || 'N/A')}\n`;
      body += `Téléphone: ${escapeHtml(sanitizedData.phone || 'N/A')}\n`;
      body += `Email: ${escapeHtml(sanitizedData.email || 'N/A')}\n`;
      body += `Adresse (Ville/CP): ${escapeHtml(sanitizedData.address || 'N/A')}\n`;
      body += `Message: ${escapeHtml(sanitizedData.message || 'Aucun')}\n`;
    } else {
      // Cas du QuoteFunnelSimple ou contact simple
      subject += `Demande de contact`;
      body += `--- Demande de Contact ---\n`;
      body += `Service: ${escapeHtml(sanitizedData.selectedService || 'N/A')}\n`;
      body += `Problème: ${escapeHtml(sanitizedData.selectedProblem || 'N/A')}\n\n`;
      body += `--- Informations Client ---\n`;
      body += `Nom: ${escapeHtml(sanitizedData.name || 'N/A')}\n`;
      body += `Téléphone: ${escapeHtml(sanitizedData.phone || 'N/A')}\n`;
      body += `Email: ${escapeHtml(sanitizedData.email || 'N/A')}\n`;
      body += `Adresse (Ville/CP): ${escapeHtml(sanitizedData.address || 'N/A')}\n`;
      body += `Période souhaitée: ${escapeHtml(sanitizedData.timeline || 'N/A')}\n`;
      body += `Budget: ${escapeHtml(sanitizedData.budget || 'Non spécifié')}\n`;
      body += `Description: ${escapeHtml(sanitizedData.description || 'Aucune')}\n`;
      body += `Urgence: ${escapeHtml(sanitizedData.urgency || 'N/A')}\n`;
      body += `Message: ${escapeHtml(sanitizedData.message || 'Aucun')}\n`;
    }

    // Add metadata for tracking
    body += `\n--- Métadonnées ---\n`;
    body += `IP Client: ${clientIP}\n`;
    body += `Date: ${new Date().toISOString()}\n`;
    body += `Origine: ${origin || 'Inconnue'}\n`;

    // 2. Envoi de l'e-mail via Resend
    const replyToEmail = sanitizedData.email && validateEmail(sanitizedData.email) 
      ? sanitizedData.email 
      : undefined;

    const emailResponse = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [TARGET_EMAIL],
      subject: subject,
      text: body,
      reply_to: replyToEmail,
    });

    console.log("Email sent successfully:", { 
      id: emailResponse.data?.id,
      clientIP,
      requestType: sanitizedData.requestType 
    });

    return new Response(
      JSON.stringify({ status: "success", message: "Email envoyé avec succès" }),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": String(rateCheck.remaining),
          ...corsHeaders 
        } 
      }
    );

  } catch (error) {
    console.error("Function Error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(
      JSON.stringify({ 
        status: "error", 
        message: "Erreur lors de l'envoi de l'email. Veuillez réessayer." 
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
