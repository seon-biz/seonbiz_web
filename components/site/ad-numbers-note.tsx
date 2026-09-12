import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const landingChecks = [
  '광고한 상품이나 서비스가 첫 화면에 바로 보이는가',
  '비용과 이용 조건을 찾을 수 있는가',
  '문의나 주문 버튼이 작동하는가',
  '페이지가 오래 기다리지 않아도 열리는가',
  '광고 문구와 도착한 페이지의 내용이 일치하는가',
];

const platformTerms = [
  { label: '눌린 횟수', naver: '클릭수', google: '클릭수', meta: '링크 클릭' },
  { label: '기록된 성과', naver: '전환수·총 전환수', google: '전환수', meta: '결과' },
  { label: '쓴 돈', naver: '총비용', google: '비용', meta: '지출 금액' },
];

export function AdLandingChecklist() {
  return (
    <>
      <fieldset className="note-publish-checklist">
        <legend>도착한 화면에서 확인할 다섯 가지</legend>
        <div>{landingChecks.map((check, i) => (
          <label key={check} htmlFor={'ad-landing-check-' + i}>
            <Checkbox id={'ad-landing-check-' + i} className="note-publish-checkbox" />
            <span>{check}</span>
          </label>
        ))}</div>
      </fieldset>
      <p>고객이 다음 행동을 하기 어려운 곳부터 메모해둡니다. 광고비를 늘려도 끊어진 버튼이나 빠진 안내가 저절로 고쳐지지는 않습니다. 먼저 고칠 곳을 정해두세요.</p>
    </>
  );
}

export function AdPlatformTerms() {
  return (
    <div className="ad-platform-terms">
      <h3 id="ad-platform-terms-title">광고 화면에서 찾을 이름</h3>
      <Table aria-labelledby="ad-platform-terms-title">
        <TableCaption>화면에서 찾을 수 있는 이름의 예입니다. 광고 유형과 선택한 항목에 따라 표시가 달라질 수 있습니다.</TableCaption>
        <TableHeader><TableRow><TableHead scope="col">확인할 것</TableHead><TableHead scope="col">네이버 검색광고</TableHead><TableHead scope="col">구글 애즈</TableHead><TableHead scope="col">메타 광고</TableHead></TableRow></TableHeader>
        <TableBody>{platformTerms.map((row) => <TableRow key={row.label}><TableHead scope="row">{row.label}</TableHead><TableCell>{row.naver}</TableCell><TableCell>{row.google}</TableCell><TableCell>{row.meta}</TableCell></TableRow>)}</TableBody>
      </Table>
      <p>메타의 ‘결과’는 광고 목표에 따라 뜻이 달라집니다. 숫자 아래의 행동 이름을 함께 보고, 문의나 구매를 뜻하는지 확인하세요. 클릭수와 링크 클릭도 세는 범위가 달라 플랫폼 간 숫자를 그대로 비교하지 않습니다.</p>
      <p className="ad-platform-sources">공식 도움말: <a href="https://ads.naver.com/help/faq/1460" target="_blank" rel="noopener noreferrer">네이버 성과지표</a> · <a href="https://support.google.com/google-ads/answer/6270625?hl=ko" target="_blank" rel="noopener noreferrer">구글 전환수</a> · <a href="https://support.google.com/google-ads/answer/10029865?hl=ko" target="_blank" rel="noopener noreferrer">구글 측정 설정 점검</a></p>
    </div>
  );
}
