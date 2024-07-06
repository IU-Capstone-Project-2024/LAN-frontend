import { useEffect, useState } from 'react';
import {useSendTelegramDataMutation} from "@/Store/api/telegramDataApi";

const TelegramApp: React.FC = () => {
  const [tg, setTg] = useState<any>(null);
  const [sendTelegramData] = useSendTelegramDataMutation();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      const telegram = (window as any).Telegram.WebApp;
      setTg(telegram);
      telegram.ready();
    }
  }, []);

  const sendMessage = async () => {
    if (tg) {
      const { id, first_name, last_name, username, photo_url} = tg.initDataUnsafe.user;
      await sendTelegramData({ id, first_name, last_name, username, photo_url});
    }
  };

  return (
      <div>
        <h1>Welcome to Telegram Mini App</h1>
        {tg && (
            <div>
              <p>User: {tg.initDataUnsafe.user?.first_name}</p>
              <button onClick={sendMessage}>Send User Data</button>
            </div>
        )}
      </div>
  );
};

export default TelegramApp;
