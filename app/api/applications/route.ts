import { database } from '@/db/raw';
import { applicationSchema } from '@/lib/application-validation';
export const dynamic='force-dynamic';
const reply=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(!origin||origin!==new URL(request.url).origin)return reply({error:'신청 페이지에서 다시 제출해 주세요.'},403);
 if(!request.headers.get('content-type')?.includes('application/json'))return reply({error:'입력 형식을 확인해 주세요.'},415);
 let parsed;try{const text=await request.text();if(text.length>12000)return reply({error:'입력 내용이 너무 깁니다.'},413);parsed=applicationSchema.safeParse(JSON.parse(text));}catch{return reply({error:'입력 내용을 확인해 주세요.'},400)}
 if(!parsed.success)return reply({error:'주소, 문제 내용, 휴대전화번호와 동의 여부를 확인해 주세요.'},400);
 const data=parsed.data;try{const db=database();const exists=await db.prepare('SELECT id FROM applications WHERE id = ? AND phone = ?').bind(data.id,data.phone).first();if(exists)return reply({id:data.id,received:true});
 const recent=await db.prepare('SELECT COUNT(*) AS total FROM applications WHERE phone = ? AND created_at > ?').bind(data.phone,Date.now()-86400000).first<{total:number}>();if((recent?.total??0)>=5)return reply({error:'오늘 같은 연락처로 여러 건의 신청이 접수되었습니다. 잠시 후 다시 확인해 주세요.'},429);
 await db.prepare('INSERT INTO applications (id, website, problem, ai_usage, phone, consent_version, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)').bind(data.id,data.website,data.problem,data.aiUsage,data.phone,'2026-09-11',Date.now()).run();return reply({id:data.id,received:true},201);
 }catch(error){console.error('Application storage failed',error instanceof Error?error.name:'StorageError');return reply({error:'신청을 저장하지 못했습니다. 입력 내용은 그대로 있으니 잠시 후 다시 제출해 주세요.'},503)}
}
