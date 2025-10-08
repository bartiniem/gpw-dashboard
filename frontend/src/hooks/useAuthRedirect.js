import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Prosty dekoder exp z JWT
function isTokenExpired(token, graceSeconds = 30) {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payloadB64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const payloadJson =
      typeof atob === 'function'
        ? atob(payloadB64)
        : Buffer.from(payloadB64, 'base64').toString('binary');
    const payload = JSON.parse(payloadJson);
    if (!payload.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp <= now + graceSeconds;
  } catch {
    return true;
  }
}

export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token || isTokenExpired(token)) {
      // opcjonalnie: wyczyść token i inne dane
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }
  }, [navigate]);
};
