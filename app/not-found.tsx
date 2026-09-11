import Link from 'next/link';
export default function NotFound(){return <main id="main" className="container section error-page"><p className="eyebrow">404</p><h1>이 페이지를<br/>찾을 수 없습니다.</h1><p>주소를 다시 확인하거나 홈에서 원하는 안내를 찾아보세요.</p><Link href="/" className="button button-coral">세온비즈 홈으로</Link></main>}
