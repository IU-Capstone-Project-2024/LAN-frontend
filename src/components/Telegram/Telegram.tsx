// components/TelegramApp.tsx
import { useEffect, useState } from 'react';
import { initializeTelegram } from '@/lib/telegram';

const TelegramApp: React.FC = () => {
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    const telegram = initializeTelegram();
    if (telegram) {
      setTg(telegram);
      telegram.ready();
      console.log(tg.initDataUnsafe.toString())
    }
  }, []);



  return (
      <div>
        <h1>Welcome to Telegram Mini App</h1>
        {tg && <p>User: {tg.initData}</p>}
      </div>
  );
};

export default TelegramApp;
