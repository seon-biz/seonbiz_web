import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const situations = {
  agency: [
    '오픈 날짜가 정해져 있어 제작과 검수를 맡길 도움이 필요하다',
    '예약·결제·회원 관리 등 별도 개발이나 여러 서비스 연동이 필요하다',
    '페이지 수가 많고 디자인을 처음부터 새로 구성해야 한다',
    '내용 변경이 적고, 직접 만드는 데 쓸 시간이 부족하다',
  ],
  self: [
    '소개 글과 사진을 자주 바꾼다',
    '작업 사례나 후기를 계속 올릴 생각이다',
    '우선 서비스 소개와 문의 접수부터 필요하다',
    '만들고 확인할 시간이 있으며, 수정하는 방법을 익혀두고 싶다',
  ],
};

const comparisons = [
  { criterion: '오픈 기한', agency: '자료·검수까지 납기 합의', self: '제작·검토할 시간 확보' },
  { criterion: '필요한 기능', agency: '별도 개발·연동 범위 협의', self: '소개·문의부터 시작' },
  { criterion: '내용 변경', agency: '편집 권한·수정 비용 확인', self: '글·사진을 자주 수정' },
  { criterion: '이후 관리', agency: '직접 편집 또는 유지보수 계약', self: '직접 수정·점검할 시간 필요' },
  { criterion: '계정 소유', agency: '본인 명의·권한 인수 확인', self: '본인 계정·이전 범위 확인' },
];

export function WebsiteChoiceSituations({ kind }: { kind: 'agency' | 'self' }) {
  return <ul className="website-choice-situations">{situations[kind].map((situation) => <li key={situation}>{situation}</li>)}</ul>;
}

export function WebsiteChoiceComparison() {
  return (
    <div className="website-choice-comparison">
      <h3 id="website-choice-comparison-title">다섯 가지 기준으로 비교해보세요</h3>
      <Table aria-labelledby="website-choice-comparison-title">
        <TableCaption>제작 방식만으로 수정 권한이나 소유권이 정해지지는 않습니다. 계약과 도구의 조건을 함께 확인하세요.</TableCaption>
        <TableHeader><TableRow><TableHead scope="col">확인할 것</TableHead><TableHead scope="col">맡기기</TableHead><TableHead scope="col">직접 만들기</TableHead></TableRow></TableHeader>
        <TableBody>{comparisons.map((row) => <TableRow key={row.criterion}><TableHead scope="row">{row.criterion}</TableHead><TableCell>{row.agency}</TableCell><TableCell>{row.self}</TableCell></TableRow>)}</TableBody>
      </Table>
    </div>
  );
}
