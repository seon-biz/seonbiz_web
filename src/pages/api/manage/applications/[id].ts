import type { APIContext } from 'astro';
export const prerender=false;
import { database } from '@/db/raw';
import { isAdmin,sameOrigin } from '@/lib/server/manage-auth';
export async function DELETE({request,params}:APIContext){if(!sameOrigin(request)||!await isAdmin(request))return new Response(null,{status:403});const {id}=params;if(!id||!/^[0-9a-f-]{36}$/.test(id))return new Response(null,{status:400});try{await database().prepare('DELETE FROM applications WHERE id = ?').bind(id).run();return Response.json({deleted:true},{headers:{'Cache-Control':'no-store'}})}catch{return Response.json({error:'삭제하지 못했습니다. 다시 확인해 주세요.'},{status:503})}}
