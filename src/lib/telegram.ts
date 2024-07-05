// lib/telegram.ts
export function initializeTelegram() {
  if (typeof window !== 'undefined' && 'Telegram' in window) {
    return (window as any).Telegram.WebApp;
  }
  return null;
}
