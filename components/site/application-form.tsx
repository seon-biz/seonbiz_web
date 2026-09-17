"use client";
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronDown, LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { aiUsageLabels, aiUsageTypes, businessTypes, businessTypeLabels, problemTypeLabels, problemTypes, type AiUsageType, type BusinessType, type ProblemType } from '@/lib/application-options';
import { z } from 'zod';

const draftSchema = z.object({businessType:z.enum(businessTypes).optional(),website:z.string().max(500).optional(),problem:z.enum(problemTypes).optional(),problemOther:z.string().optional(),aiUsage:z.enum(aiUsageTypes).optional(),phone:z.string().max(20).optional()}).strict();
const emptyFields = {businessType:'' as BusinessType | '',website:'',problem:'' as ProblemType | '',problemOther:'',aiUsage:'' as AiUsageType | '',phone:''};

export function ApplicationForm() {
  const [fields,setFields] = useState(emptyFields);
  const [consent,setConsent] = useState(false);
  const [pending,setPending] = useState(false);
  const [error,setError] = useState('');
  const [receipt,setReceipt] = useState('');
  const submission = useRef<{ id: string; payload: string } | null>(null);
  const inFlight = useRef(false);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const context = (document as unknown as {modelContext?:{registerTool:(tool:unknown,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
    if (!context?.registerTool) return;
    const life = new AbortController();
    try {
      void Promise.resolve(context.registerTool({
        name:'prepare_consultation_application',title:'상담 신청 내용 준비',
        description:'Fill the visible consultation form for the user to review. The requested work is required to submit; a website URL is optional. Does not give consent, submit, or store an application.',
        inputSchema:{type:'object',properties:{businessType:{type:'string',enum:businessTypes},website:{type:'string',maxLength:500},problem:{type:'string',enum:problemTypes},problemOther:{type:'string'},aiUsage:{type:'string',enum:aiUsageTypes},phone:{type:'string',maxLength:20}},additionalProperties:false},
        annotations:{readOnlyHint:false,untrustedContentHint:false},
        async execute(input:unknown) {
          const parsed = draftSchema.safeParse(input);
          if (!parsed.success) return {prepared:false,error:'Invalid draft fields'};
          setFields(prev => ({...prev,...parsed.data}));
          setConsent(false);
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          return {prepared:true,submitted:false,requiresUserReview:true};
        },
      },{signal:life.signal})).catch(() => {});
    } catch {}
    return () => life.abort();
  },[]);

  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    setError('');
    if (!fields.businessType) {
      setError('필요한 작업을 선택해 주세요.');
      form.current?.querySelector<HTMLButtonElement>('[role="radio"]')?.focus();
      return;
    }
    if (!fields.problem) {
      setError('지금 가장 답답한 점을 선택해 주세요.');
      form.current?.querySelector<HTMLButtonElement>('[name="problem"]')?.focus();
      return;
    }
    if (!fields.aiUsage) {
      setError('AI 사용 경험을 선택해 주세요.');
      form.current?.querySelector<HTMLButtonElement>('[name="aiUsage"]')?.focus();
      return;
    }
    if (!consent) {setError('개인정보 수집·이용 안내를 확인하고 동의해 주세요.');return;}
    const payload = {
      ...fields,
      website: fields.website.trim(),
      problemOther: fields.problem === 'other' ? fields.problemOther.trim() : '',
      phone: fields.phone.replace(/[\s-]/g, ''),
      consent,
      companyFax: new FormData(event.currentTarget).get('companyFax') || '',
    };
    const serializedPayload = JSON.stringify(payload);
    if (!submission.current || submission.current.payload !== serializedPayload) {
      submission.current = { id: crypto.randomUUID(), payload: serializedPayload };
    }
    const id = submission.current.id;
    inFlight.current = true;
    setPending(true);
    try {
      const response = await fetch('/api/applications',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload,id})});
      const data = await response.json() as {id:string;received?:boolean;error?:string};
      if (!response.ok || !data.received || data.id !== id) throw new Error(data.error||'접수 여부를 확인하지 못했습니다. 입력한 내용은 남아 있으니 잠시 후 다시 제출해 주세요.');
      setReceipt(data.id);
      submission.current = null;
      setFields(emptyFields);
      setConsent(false);
    } catch(e) {
      setError(e instanceof Error?e.message:'연결을 확인하고 다시 제출해 주세요. 입력한 내용은 남아 있습니다.');
    } finally {inFlight.current = false;setPending(false);}
  }

  if (receipt) return (
    <div className="application-success" role="status">
      <CheckCircle2 size={36} aria-hidden="true" />
      <h2>상담 신청이 접수되었습니다.</h2>
      <p>1영업일 이내 카카오톡으로 연락드리겠습니다. 카카오톡 연결이 어려우면 남겨주신 번호로 문자 안내를 드립니다.</p>
      <p>연락을 드리면 상담 가능한 날짜와 시간을 말씀해주세요. 일정을 정한 뒤 Zoom으로 1시간 무료 상담을 진행합니다.</p>
      <p className="meta">접수번호 {receipt.slice(0,8).toUpperCase()}</p>
      <a href="/" className="button button-ink">홈으로 돌아가기</a>
    </div>
  );

  return (
    <form ref={form} onSubmit={submit} className="application-form" aria-label="무료 상담 신청서">
      <fieldset className="form-field business-field">
        <legend id="business-type-label">필요한 작업 <span className="optional-label">(필수)</span></legend>
        <RadioGroup name="businessType" value={fields.businessType} onValueChange={value=>setFields({...fields,businessType:value as BusinessType})} required aria-labelledby="business-type-label" className="business-options">
          {businessTypes.map(value => <label className="business-option" key={value} htmlFor={'business-'+value}>
            <RadioGroupItem id={'business-'+value} value={value} className="business-radio" />
            <span>{businessTypeLabels[value]}</span>
          </label>)}
        </RadioGroup>
      </fieldset>
      <div className="form-field">
        <label htmlFor="website">홈페이지 또는 사업용 채널 주소 <span className="optional-label">(선택)</span></label>
        <p id="website-help">현재 홈페이지나 사업용 블로그·SNS 주소를 적어주세요. 아직 없다면 비워두셔도 됩니다.</p>
        <Input id="website" name="website" type="url" maxLength={500} placeholder="https://" autoComplete="url" aria-describedby="website-help" value={fields.website} onChange={e=>setFields({...fields,website:e.target.value})} />
      </div>
      <fieldset className="form-field business-field">
        <legend id="problem-label">지금 가장 답답한 점</legend>
        <RadioGroup name="problem" value={fields.problem} onValueChange={value=>setFields({...fields,problem:value as ProblemType})} required aria-labelledby="problem-label" className="business-options">
          {problemTypes.map(value => <label className="business-option" key={value} htmlFor={'problem-'+value}>
            <RadioGroupItem id={'problem-'+value} value={value} className="business-radio" />
            <span>{problemTypeLabels[value]}</span>
          </label>)}
        </RadioGroup>
        {fields.problem === 'other'&&<div className="other-problem-field"><label htmlFor="problemOther">기타 내용 <span className="optional-label">(선택)</span></label><Textarea id="problemOther" name="problemOther" rows={4} placeholder="필요하시면 내용을 적어주세요." value={fields.problemOther} onChange={e=>setFields({...fields,problemOther:e.target.value})}/></div>}
      </fieldset>
      <fieldset className="form-field business-field">
        <legend id="ai-usage-label">AI 사용 경험</legend>
        <RadioGroup name="aiUsage" value={fields.aiUsage} onValueChange={value=>setFields({...fields,aiUsage:value as AiUsageType})} required aria-labelledby="ai-usage-label" className="business-options">
          {aiUsageTypes.map(value => <label className="business-option" key={value} htmlFor={'ai-usage-'+value}>
            <RadioGroupItem id={'ai-usage-'+value} value={value} className="business-radio" />
            <span>{aiUsageLabels[value]}</span>
          </label>)}
        </RadioGroup>
      </fieldset>
      <div className="form-field">
        <label htmlFor="phone">연락받으실 휴대전화번호</label>
        <p id="phone-help">1영업일 이내 카카오톡으로 연락해 상담 일정을 안내합니다. 연결이 어려우면 문자로 연락드립니다.</p>
        <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required pattern="01[016789][ -]?[0-9]{3,4}[ -]?[0-9]{4}" placeholder="010-0000-0000" aria-describedby="phone-help" value={fields.phone} onChange={e=>setFields({...fields,phone:e.target.value})} />
      </div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="companyFax">회사 팩스</label><input id="companyFax" name="companyFax" autoComplete="off" tabIndex={-1} /></div>
      <div className="privacy-consent">
        <div className="consent-choice"><Checkbox id="consent" checked={consent} onCheckedChange={value=>setConsent(value===true)} className="consent-checkbox" /><label htmlFor="consent">상담을 위한 개인정보 수집·이용에 동의합니다. <span>(필수)</span></label></div>
        <p>입력하신 정보는 운영자 이메일로 전달해 상담 준비와 일정 조율에 사용하며, 상담 목적을 달성하거나 신청을 철회하면 지체 없이 삭제합니다.</p>
        <Collapsible className="consent-details">
          <CollapsibleTrigger className="consent-details-trigger" aria-label="개인정보 수집·이용 더 보기">더 보기 <ChevronDown size={17} aria-hidden="true" /></CollapsibleTrigger>
          <CollapsibleContent className="consent-details-content">
            <p>주식회사 티오엠은 아래 정보를 상담 신청서에서 수집·이용합니다.</p>
            <dl>
              <div><dt>필수 입력</dt><dd>필요한 작업, 휴대전화번호, 상담 내용, AI 사용 경험</dd></div>
              <div><dt>선택 입력</dt><dd>홈페이지 또는 사업용 채널 주소. 비워두셔도 신청할 수 있습니다.</dd></div>
              <div><dt>접수 시 생성</dt><dd>신청번호, 접수 시각, 동의한 문서의 버전</dd></div>
              <div><dt>이용 목적</dt><dd>상담 검토·준비, 연락·일정 조율, 접수 확인과 과다 접수 방지</dd></div>
              <div><dt>전달·보관</dt><dd>신청 내용은 운영자 이메일로 전달하며, 웹사이트의 상담 데이터베이스에는 저장하지 않습니다. 상담 준비와 연락·일정 조율 목적을 달성할 때까지 이메일로 보관합니다.</dd></div>
              <div><dt>삭제</dt><dd>상담 목적을 달성하거나 신청을 철회하면 상담 신청 이메일을 지체 없이 삭제합니다.</dd></div>
            </dl>
            <p>개인정보 수집·이용에 동의하지 않을 수 있습니다. 다만 필수 항목의 수집·이용에 동의하지 않으면 이 신청서로 접수할 수 없습니다.</p>
          </CollapsibleContent>
        </Collapsible>
        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-link">개인정보처리방침 보기<span className="sr-only"> (새 탭)</span></a>
      </div>
      {error && <p role="alert" className="form-error">{error}</p>}
      <button type="submit" disabled={pending} className="button button-coral submit-button">{pending?<><LoaderCircle className="spin" size={20} /> 접수 중</>:<>1시간 무료 상담 신청하기 (결제 없음) <ArrowUpRight size={20} /></>}</button>
      <p className="meta submit-note">상담 신청 시 결제되는 금액은 없습니다.<br />1영업일 이내 카카오톡으로 연락드리고, 상담 일정을 함께 정합니다.</p>
    </form>
  );
}
