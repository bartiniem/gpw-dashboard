// JavaScript
import { useEffect, useState } from 'react';

export function usePersistedWalletCode(key = 'walletCode', initial = null) {
  const [walletCode, setWalletCode] = useState(() => {
    try {
      return localStorage.getItem(key) || initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      if (walletCode == null) localStorage.removeItem(key);
      else localStorage.setItem(key, walletCode);
    } catch {
      // np. Safari w trybie prywatnym – ignoruj
    }
  }, [walletCode, key]);

  return [walletCode, setWalletCode];
}