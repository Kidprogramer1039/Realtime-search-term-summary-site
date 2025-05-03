import client from './client';

/**
 * 광고 전용 게시판 글 목록 가져오기
 * @returns {Promise<Array<{ id, title, content, views, likes, writer, createdAt }>>}
 */
export async function getAdsList() {
  const res = await client.get('/ads');
  return res.data;
}

/**
 * 내가 보유한 광고권(구매횟수) 조회
 * @returns {Promise<number>}
 */
export const getAdsPurchaseCount = () =>
  client.get('/shop/purchases/count')
        .then(res => res.data);   // { count: number } 형태로 받아옵니다.

/**
 * 광고글 쓰기
 * - 광고권이 없는 경우 400 에러
 * @param {{ title: string, content: string }} payload
 * @returns {Promise<{ id: string, title: string, content: string, ... }>}
 */
export async function postAd({ title, content }) {
  const res = await client.post('/ads', { title, content });
  return res.data;
}
