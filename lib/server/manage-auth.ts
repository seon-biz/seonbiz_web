import { env } from 'cloudflare:workers';
export function adminKey(){return env.SEONBIZ_ADMIN_KEY||''}
async function sign(value:string){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(adminKey()),{name:'HMAC',hash:'SHA-256'},false,['sign']);return Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(value)))).map(n=>n.toString(16).padStart(2,'0')).join('')}
export function equal(a:string,b:string){if(a.length!==b.length)return false;let difference=0;for(let i=0;i<a.length;i++)difference|=a.charCodeAt(i)^b.charCodeAt(i);return difference===0}
export async function createSession(){const expires=String(Date.now()+8*3600000);return `${expires}.${await sign(expires)}`}
export async function isAdmin(request:Request){if(!adminKey())return false;const token=request.headers.get('cookie')?.split(';').map(part=>part.trim()).find(part=>part.startsWith('seonbiz_manage='))?.slice('seonbiz_manage='.length);if(!token)return false;const [expires,signature]=token.split('.');if(!expires||!signature||!/^\d{13}$/.test(expires)||Number(expires)<Date.now()||Number(expires)>Date.now()+8*3600000)return false;return equal(signature,await sign(expires))}
export function sameOrigin(request:Request){return request.headers.get('origin')===new URL(request.url).origin}
