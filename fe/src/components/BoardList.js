import { useNavigate } from 'react-router-dom';

const BoardList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h4>게시판</h4>
      <ul>
        <li onClick={() => navigate('/info')}>정보 게시판</li>
        <li onClick={() => navigate('/free')}>자유 게시판</li>
        <li onClick={() => navigate('/community')}>커뮤니티 게시판</li>
      </ul>
    </div>
  );
};

export default BoardList;
