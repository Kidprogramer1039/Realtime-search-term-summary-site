// 테스트할 때 이거랑 API_BASE만 localhost:8080으로 변경하고 

// 배포용 
// const API_BASE = process.env.REACT_APP_API_BASE_URL || window.location.origin;

// 테스트용
const API_BASE = `http://localhost:8080`;

export async function createPost(formData) {

      // 테스트용
      // window.location.href = `${API_BASE}/oauth2/authorization/google`;

      // 배포용    
      // window.location.href = `${API_BASE}:8080/oauth2/authorization/google`;

  // 배포용    
  //const res = await fetch(`${API_BASE}:8080/api/v1/board`, {

  // 테스트용
    const res = await fetch(`${API_BASE}/api/v1/board`, {
    method: 'POST',
    headers: {
      // JWT 토큰이 필요하면 여기에 추가
      // 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    },
    body: formData,
  });
  return res.json();
}

export async function fetchPosts(boardNumber) {
  const res = await fetch(`${API_BASE}/api/v1/board/${boardNumber}`, {
    headers: {
      // 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    },
  });
  return res.json();
}
