"use client";
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronDown, LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { businessTypes, businessTypeLabels, type BusinessType } from '@/lib/application-options';
import { z } from 'zod';

const draftSchema = z.object({businessType:z.enum(businessTypes).optional(),website:z.string().max(500).optional(),problem:z.string().max(3000).optional(),aiUsage:z.string().max(500).optional(),phone:z.string().max(20).optional()}).strict();
const emptyFields = {businessType:'' as BusinessType | '',website:'',problem:'',aiUsage:'',phone:''};

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
        description:'Fill the visible consultation form for the user to review. Business type is required to submit; website is optional. Does not give consent, submit, or store an application.',
        inputSchema:{type:'object',properties:{businessType:{type:'string',enum:businessTypes},website:{type:'string',maxLength:500},problem:{type:'string',maxLength:3000},aiUsage:{type:'string',maxLength:500},phone:{type:'string',maxLength:20}},additionalProperties:false},
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
      setError('하시는 일을 선택해 주세요.');
      form.current?.querySelector<HTMLButtonElement>('[role="radio"]')?.focus();
      return;
    }
    if (!consent) {setError('개인정보 수집·이용 안내를 확인하고 동의해 주세요.');return;}
    const payload = {
      ...fields,
      website: fields.website.trim(),
      problem: fields.problem.trim(),
      aiUsage: fields.aiUsage.trim(),
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
        <legend id="business-type-label">하시는 일 <span className="optional-label">(필수)</span></legend>
        <RadioGroup name="businessType" value={fields.businessType} onValueChange={value=>setFields({...fields,businessType:value as BusinessType})} required aria-labelledby="business-type-label" className="business-options">
          {businessTypes.map(value => <label className="business-option" key={value} htmlFor={'business-'+value}>
            <RadioGroupItem id={'business-'+value} value={value} className="business-radio" />
            <span>{businessTypeLabels[value]}</span>
          </label>)}
        </RadioGroup>
      </fieldset>
      <div className="form-field">
        <label htmlFor="website">사이트 또는 판매처 주소 <span className="optional-label">(선택)</span></label>
        <p id="website-help">쇼핑몰·홈페이지·사업용 블로그 주소를 적어주세요. 스마트스토어, 쿠팡, 네이버 플레이스 주소도 괜찮습니다. 아직 없다면 비워두셔도 됩니다.</p>
        <Input id="website" name="website" type="url" maxLength={500} placeholder="https://" autoComplete="url" aria-describedby="website-help" value={fields.website} onChange={e=>setFields({...fields,website:e.target.value})} />
      </div>
      <div className="form-field">
        <label htmlFor="problem">상담하고 싶은 내용</label>
        <p id="problem-help">하고 싶은 일이나 어려운 점을 10자 이상 적어주세요. 자세한 내용은 상담하면서 여쭤보겠습니다.</p>
        <Textarea id="problem" name="problem" required minLength={10} maxLength={3000} rows={5} aria-describedby="problem-help" placeholder="예: 상품 설명과 블로그 글을 직접 쓰고 싶습니다. AI를 써봤는데 문장이 어색해서 고치는 데 시간이 오래 걸립니다." value={fields.problem} onChange={e=>setFields({...fields,problem:e.target.value})} />
      </div>
      <div className="form-field">
        <label htmlFor="aiUsage">AI 사용 경험</label>
        <p id="ai-help">써본 프로그램과 용도를 적어주세요. 처음이시면 ‘사용한 적 없음’이라고 적어주시면 됩니다.</p>
        <Textarea id="aiUsage" name="aiUsage" required maxLength={500} rows={2} aria-describedby="ai-help" value={fields.aiUsage} onChange={e=>setFields({...fields,aiUsage:e.target.value})} />
      </div>
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
              <div><dt>필수 입력</dt><dd>하시는 일, 휴대전화번호, 상담 내용, AI 사용 경험</dd></div>
              <div><dt>선택 입력</dt><dd>사이트 또는 판매처 주소. 비워두셔도 신청할 수 있습니다.</dd></div>
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
      <button type="submit" disabled={pending} className="button button-coral submit-button">{pending?<><LoaderCircle className="spin" size={20} /> 접수 중</>:<>1시간 무료 상담 신청하기 <ArrowUpRight size={20} /></>}</button>
      <p className="meta submit-note">상담 신청 시 결제되는 금액은 없습니다.<br />1영업일 이내 카카오톡으로 연락드리고, 상담 일정을 함께 정합니다.</p>
    </form>
  );
}
