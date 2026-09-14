import type { APIContext } from 'astro';
import { env } from 'cloudflare:workers';
import { handleApplicationRequest, type ApplicationEmailBindings } from '@/lib/server/application-email';

export const prerender = false;

export async function POST({ request }: APIContext) {
  return handleApplicationRequest(request, env as ApplicationEmailBindings);
}
