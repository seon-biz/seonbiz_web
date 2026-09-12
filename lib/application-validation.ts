import { z } from 'zod';
export const applicationSchema=z.object({
 id:z.string().uuid(),website:z.string().trim().max(500).refine(v=>{if(v==='')return true;try{return ['http:','https:'].includes(new URL(v).protocol)}catch{return false}}),
 problem:z.string().trim().min(10).max(3000),aiUsage:z.string().trim().min(1).max(500),
 phone:z.string().transform(s=>s.replace(/[\s-]/g,'')).refine(s=>/^01[016789]\d{7,8}$/.test(s)),consent:z.literal(true),companyFax:z.string().max(0).optional()
});
