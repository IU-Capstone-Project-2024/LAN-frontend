import {FC, useEffect} from 'react';
import {useRegisterUserMutation} from "@/Store/api/telegramDataApi";

const TelegramApp: FC = () => {
  const [registerUser] = useRegisterUserMutation();

  useEffect(() => {
    const handleTelegramAuth = async () => {
      if (typeof window !== 'undefined' && (window as any).Telegram) {
        const telegram = (window as any).Telegram.WebApp;
        telegram.ready();

        const user = telegram.initDataUnsafe.user;
        const authData = {
          auth_date: telegram.initDataUnsafe.auth_date,
          hash: telegram.initDataUnsafe.hash,
          query_id: telegram.initDataUnsafe.query_id,
          user: {
            first_name: user.first_name,
            id: user.id,
            last_name: user.last_name,
            photo_url: user.photo_url,
            username: user.username,
          },
        };

        try {
          const response = await registerUser(authData).unwrap();
          console.log('User registered successfully:', response);
        } catch (error) {
          console.error('Registration failed:', error);
        }
      }
    };

    handleTelegramAuth();

  }, [registerUser]);

  return(
    <>
    </>
  );

};

export default TelegramApp;
