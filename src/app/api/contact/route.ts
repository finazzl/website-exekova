import { handleContact } from '@/site/server/contact';

export async function POST(request: Request) {
  return handleContact(request, {
    TURNSTILE_SECRET: process.env.TURNSTILE_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    LEAD_TO: process.env.LEAD_TO,
    LEAD_FROM: process.env.LEAD_FROM,
  });
}
