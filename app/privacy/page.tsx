export const metadata={title:'개인정보처리방침',description:'주식회사 티오엠이 운영하는 세온비즈의 상담 신청 정보 처리 목적, 수집 항목, 보관·삭제, 권리 행사 및 문의 방법을 안내합니다.'};
const contents=['처리 목적','수집 항목과 방법','보유기간과 파기','제3자 제공과 사용 서비스','권리 행사와 문의','안전조치','쿠키와 접속 정보','외부 상담·신고','방침 변경'];
export default function Privacy(){return <main id="main"><header className="article-header privacy-header"><p className="eyebrow">주식회사 티오엠 · 세온비즈</p><h1>개인정보처리방침</h1><p className="article-meta">시행일 2026년 9월 12일 · 상담 신청 정보에 관한 안내</p></header><article className="article-body legal-body">
<p className="article-intro">주식회사 티오엠은 세온비즈 상담 신청자의 개인정보를 아래와 같이 처리합니다. 이 방침은 웹사이트의 무료 상담 신청과 개인정보 관련 문의에 적용됩니다.</p>
<nav className="policy-toc" aria-label="개인정보처리방침 목차">{contents.map((item,i)=><a key={item} href={'#privacy-'+(i+1)}>{i+1}. {item}</a>)}</nav>
<section id="privacy-1"><h2>1. 개인정보를 사용하는 목적</h2><p>상담 신청을 검토하고 상담을 준비하며, 신청자에게 연락해 일정을 정하기 위해 사용합니다. 접수 확인, 중복 신청과 과다 접수 방지에도 신청번호와 연락처를 사용합니다. 개인정보 관련 문의를 받으면 본인 확인과 답변에 필요한 정보를 처리합니다.</p><p>상담 신청 정보를 광고 메시지 발송이나 판매 목적으로 사용하지 않습니다. 이용 목적이 달라지는 경우 필요한 안내와 절차를 먼저 진행합니다.</p></section>
<section id="privacy-2"><h2>2. 수집하는 항목과 방법</h2><div className="table-scroll"><table className="policy-table"><caption>무료 상담 신청서에서 처리하는 정보</caption><thead><tr><th scope="col">구분</th><th scope="col">항목</th><th scope="col">처리 목적</th></tr></thead><tbody><tr><th scope="row">필수 입력</th><td>하시는 일, 휴대전화번호, 상담하고 싶은 내용, AI 사용 경험</td><td>상담 준비, 연락 및 일정 조율</td></tr><tr><th scope="row">선택 입력</th><td>사이트·쇼핑몰·판매처·사업용 블로그 주소</td><td>사업 현황 확인과 상담 준비</td></tr><tr><th scope="row">접수 시 생성</th><td>신청번호, 접수 시각, 동의한 문서의 버전</td><td>접수·동의 이력 및 중복·과다 접수 확인</td></tr></tbody></table></div><p>정보는 신청자가 직접 입력한 신청서에서 수집합니다. 사이트 주소는 입력하지 않아도 신청할 수 있습니다. 필수 항목의 수집·이용에 동의하지 않을 수 있으나, 동의하지 않으면 이 신청서를 통한 접수는 어렵습니다.</p><p>이메일 문의 시에는 발신 이메일 주소와 문의 내용을 회신에 사용합니다. 비밀번호, 주민등록번호, 고객 명단 등 상담에 불필요한 개인정보는 보내지 마세요.</p></section>
<section id="privacy-3"><h2>3. 보유기간과 파기</h2><p>무료 상담 신청 정보는 상담 준비와 연락·일정 조율에 필요한 동안 보관합니다. 다음 중 하나에 해당하면 운영 담당자가 확인한 뒤 지체 없이 삭제합니다.</p><ul className="privacy-delete-list"><li>무료 상담을 마쳐 신청 정보의 이용 목적을 달성한 경우</li><li>신청자가 상담 신청이나 개인정보 수집·이용 동의를 철회한 경우</li><li>상담을 진행하지 않기로 확정한 경우</li></ul><p>개인정보 관련 문의는 답변과 권리 행사 요청의 처리가 끝나면 더 이상 필요하지 않은 정보를 지체 없이 삭제합니다.</p><p>전자 정보는 운영 담당자가 상담 접수 데이터베이스에서 해당 내역을 삭제합니다. 이메일이나 상담 연락 과정에서 별도로 보관한 정보도 목적이 끝나면 삭제합니다. 종이로 출력한 자료가 있다면 분쇄해 폐기합니다. 법령에 따라 보존해야 하는 자료는 해당 항목과 근거·기간을 별도로 안내하고 상담 자료와 구분해 관리합니다. 유료 계약과 결제 증빙은 무료 상담 신청서의 보관 범위와 구분합니다.</p></section>
<section id="privacy-4">
  <h2>4. 제3자 제공과 사용 서비스</h2>
  <p>세온비즈는 신청 정보를 다른 사업자의 마케팅이나 판매 목적으로 제공하지 않습니다. 법령에 따른 제공이 필요한 경우에는 해당 근거에 따라 처리합니다. 신청 내용을 별도의 AI 분석 도구로 자동 전송하지 않습니다.</p>
  <p>세온비즈 웹사이트는 OpenAI가 제공하는 ChatGPT Sites로 운영하며, 상담 신청 내역은 이 호스팅 환경에 연결된 Cloudflare D1 데이터베이스에 저장합니다.</p>
  <div className="table-scroll"><table className="policy-table">
    <caption>사용 서비스와 처리 업무</caption>
    <thead><tr><th scope="col">사용 서비스</th><th scope="col">처리 업무</th><th scope="col">관련 정보</th></tr></thead>
    <tbody>
      <tr><th scope="row">ChatGPT Sites<br />(OpenAI)</th><td>웹사이트 호스팅, 상담 신청 요청 처리</td><td>신청서 입력 내용과 접수 시 생성 정보</td></tr>
      <tr><th scope="row">Cloudflare D1</th><td>상담 신청 내역의 저장·조회·삭제</td><td>2번 항목에 안내한 상담 신청 정보</td></tr>
      <tr><th scope="row">카카오톡·문자</th><td>운영 담당자의 개별 연락과 상담 일정 조율</td><td>휴대전화번호와 상담 연락 내용</td></tr>
      <tr><th scope="row">Gmail</th><td>이메일 문의 접수와 회신</td><td>발신 이메일 주소와 문의 내용</td></tr>
    </tbody>
  </table></div>
  <p>상담 일정은 운영 담당자가 카카오톡으로 연락해 정합니다. 카카오톡 연결이 어려우면 문자로 연락합니다.</p>
</section>
<section id="privacy-5"><h2>5. 권리 행사와 문의 창구</h2><p>본인의 개인정보에 대해 열람, 정정, 삭제, 처리 정지, 동의 철회를 요청할 수 있습니다. 아래 이메일로 요청해 주시면 본인 확인에 필요한 최소한의 절차를 거쳐 처리하고 결과를 안내합니다. 대리인 요청 시에는 위임 여부를 확인할 수 있으며, 법령상 처리할 수 없는 요청은 그 이유를 알려드립니다.</p><dl className="contact-details"><div><dt>운영 주체</dt><dd>주식회사 티오엠</dd></div><div><dt>개인정보 보호업무·고충 처리</dt><dd>세온비즈 운영 담당</dd></div><div><dt>문의 이메일</dt><dd><a href="mailto:cobaltblue872@gmail.com">cobaltblue872@gmail.com</a></dd></div></dl></section>
<section id="privacy-6"><h2>6. 개인정보를 보호하는 조치</h2><p>상담 접수 내역은 업무상 필요한 운영 담당자만 접근하도록 관리하며, 관리자 접속 정보를 별도로 관리합니다. 제공되는 웹사이트는 HTTPS로 통신합니다. 개인정보가 담긴 자료를 불필요하게 복사하거나 공개하지 않습니다.</p></section>
<section id="privacy-7">
  <h2>7. 쿠키와 접속 정보</h2>
  <p>현재 세온비즈 페이지에는 광고 추적 도구나 GA4 방문 분석 도구를 설치하지 않았습니다.</p>
  <div className="table-scroll"><table className="policy-table">
    <caption>세온비즈가 직접 설정하는 관리자 로그인 쿠키</caption>
    <thead><tr><th scope="col">쿠키 이름</th><th scope="col">용도</th><th scope="col">유효기간</th></tr></thead>
    <tbody><tr><th scope="row">seonbiz_<wbr />manage</th><td>상담 접수 관리 화면의 로그인 상태 확인</td><td>로그인 후 최대 8시간<br />로그아웃 시 제거</td></tr></tbody>
  </table></div>
  <p>이 쿠키는 관리자가 로그인할 때 설정되며, 상담 신청 정보의 보유기간과는 별개입니다. 호스팅 서비스는 웹사이트 접근 인증과 보안 등 서비스 운영에 필요한 쿠키·접속 정보를 처리할 수 있습니다. 호스팅 서비스의 정보 처리에 관한 일반 안내는 <a href="https://help.openai.com/en/articles/20001339" target="_blank" rel="noopener noreferrer">ChatGPT Sites 공식 안내</a>에서 확인할 수 있습니다.</p>
  <p>브라우저의 개인정보 또는 사이트 설정에서 쿠키 저장을 제한하거나 삭제할 수 있습니다. 쿠키를 차단하면 관리자 로그인이나 웹사이트 접근 인증 등 일부 기능 이용이 제한될 수 있습니다.</p>
</section>
<section id="privacy-8"><h2>8. 외부 상담과 신고</h2><p>개인정보 침해 상담·신고는 <a href="https://privacy.kisa.or.kr/" target="_blank" rel="noopener noreferrer">개인정보침해 신고센터</a>(국번 없이 118), 분쟁 조정은 <a href="https://www.kopico.go.kr/" target="_blank" rel="noopener noreferrer">개인정보분쟁조정위원회</a>(1833-6972)를 이용할 수 있습니다.</p></section>
<section id="privacy-9"><h2>9. 방침의 변경</h2><p>수집 항목, 이용 목적, 보관 기준 등이 달라지면 이 페이지에 변경 내용과 적용 시점을 안내하고, 필요한 경우 별도의 동의를 받습니다. 기존 신청자가 동의한 기록은 새 버전으로 소급 변경하지 않습니다.</p><p className="meta">2026.09.12 (동의 안내 v2): 필수 항목에 하시는 일을 추가했습니다. 기존 접수의 동의 버전은 유지합니다.</p><p className="meta">2026.09.12: 최초 작성·시행. 운영 주체와 문의 창구, 수집 항목, 파기와 권리 행사 방법을 안내했습니다.</p><p className="meta">2026.09.12: 실제 사용 서비스와 처리 업무, 상담 종료 시 파기 기준, 관리자 로그인 쿠키의 용도와 유효기간을 구체화했습니다.</p></section>
<div className="article-next"><a href="/apply" className="text-link">상담 신청으로 돌아가기</a></div></article></main>}
