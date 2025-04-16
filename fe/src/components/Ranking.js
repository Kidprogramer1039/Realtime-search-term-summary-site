import { useEffect, useState } from 'react';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    // 실제 API 대신 mock 데이터 사용
    const mockData = [
      { name: '홍길동' },
      { name: '김철수' },
      { name: '박영희' }
    ];
    setRanking(mockData);
  }, []);

  return (
    <div>
      <h3>오늘의 랭킹</h3>
      <ul>
        {ranking.map((user, idx) => (
          <li key={idx}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
