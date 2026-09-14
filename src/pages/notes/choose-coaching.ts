import type { APIRoute } from 'astro';
export const prerender = false;
export const GET: APIRoute = ({ request }) => Response.redirect(new URL('/process#pricing', request.url), 308);
