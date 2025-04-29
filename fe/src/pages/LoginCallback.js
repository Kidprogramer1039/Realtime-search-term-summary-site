import React from 'react';
import { useAuthCallback } from '../hooks/useAuthCallback';

export default function LoginCallback() {
  useAuthCallback();
  return <p>로그인 처리 중입니다…</p>;
}
