import type { APIContext } from 'astro';
export const prerender=false;
import { sameOrigin } from '@/lib/server/manage-auth';
export async function POST({request}:APIContext){if(!sameOrigin(request))return new Response(null,{status:403});return Response.json({ok:true},{headers:{'Set-Cookie':'seonbiz_manage=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0','Cache-Control':'no-store'}})}
