import GoogleLoginButton from '../components/GoogleLoginButton';

const Home = () => (
  <div style={{ position: 'relative' }}>
    {/* 우측 상단 고정 버튼 */}
    <div style={{ position: 'absolute', top: 0, right: 0 }}>
      <GoogleLoginButton />
    </div>

    <h1>참견해주세요</h1>
    <p>자극적인 것을 좋아하는 현대인을 위한 소셜 피드백 플랫폼</p>
  </div>
);

export default Home;
