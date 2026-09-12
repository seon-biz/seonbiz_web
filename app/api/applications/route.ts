import { database } from '@/db/raw';
import { applicationSchema } from '@/lib/application-validation';
import { applicationConsentVersion } from '@/lib/application-options';
export const dynamic='force-dynamic';
const reply=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(!origin||origin!==new URL(request.url).origin)return reply({error:'신청 페이지에서 다시 제출해 주세요.'},403);
 if(!request.headers.get('content-type')?.includes('application/json'))return reply({error:'입력 형식을 확인해 주세요.'},415);
 let parsed;try{const text=await request.text();if(text.length>12000)return reply({error:'입력 내용이 너무 깁니다.'},413);parsed=applicationSchema.safeParse(JSON.parse(text));}catch{return reply({error:'입력 내용을 확인해 주세요.'},400)}
 if(!parsed.success)return reply({error:'하시는 일을 선택해 주세요. 사이트 주소를 입력했다면 형식을 확인해 주세요. 상담 내용(10자 이상), AI 사용 경험, 휴대전화번호와 동의는 필수입니다.'},400);
 const data=parsed.data;try{const db=database();const exists=await db.prepare('SELECT id FROM applications WHERE id = ? AND phone = ?').bind(data.id,data.phone).first();if(exists)return reply({id:data.id,received:true});
 const recent=await db.prepare('SELECT COUNT(*) AS total FROM applications WHERE phone = ? AND created_at > ?').bind(data.phone,Date.now()-86400000).first<{total:number}>();if((recent?.total??0)>=5)return reply({error:'오늘 이 연락처로 여러 건이 접수되어 추가 신청이 제한됩니다. 이미 신청하셨다면 세온비즈의 연락을 기다려 주세요.'},429);
 await db.prepare('INSERT INTO applications (id, business_type, website, problem, ai_usage, phone, consent_version, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').bind(data.id,data.businessType,data.website,data.problem,data.aiUsage,data.phone,applicationConsentVersion,Date.now()).run();return reply({id:data.id,received:true},201);
 }catch(error){console.error('Application storage failed',error instanceof Error?error.name:'StorageError');return reply({error:'신청을 저장하지 못했습니다. 입력 내용은 그대로 있으니 잠시 후 다시 제출해 주세요.'},503)}
}
