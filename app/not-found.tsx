import Link from 'next/link';
export default function NotFound(){return <main id="main" className="container section error-page"><p className="eyebrow">404</p><h1>요청하신 페이지가<br/>보이지 않습니다.</h1><p>주소가 달라졌거나 없는 페이지일 수 있습니다. 홈에서 코칭 안내와 사례를 확인하실 수 있습니다.</p><Link href="/" className="button button-coral">세온비즈 홈으로</Link></main>}
