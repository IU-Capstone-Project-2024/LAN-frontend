import {FC, useEffect} from 'react';
import {useGetTokenMutation, useRegisterUserMutation} from "@/Store/api/telegramDataApi";

const TelegramApp: FC = () => {
  const [registerUser] = useRegisterUserMutation();
  const [getToken] = useGetTokenMutation();

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
          await registerUser(authData).unwrap();

          const tokenData = {
            grant_type: 'password',
            username: user.username,
            password: 'user_password',
          };

          const response = await getToken(tokenData).unwrap();
          localStorage.setItem('token', response.access_token);

          console.log('User registered and authenticated successfully');
        } catch (error) {
          console.error('Registration or authentication failed:', error);
        }
      }
    };

    handleTelegramAuth();
  }, [registerUser, getToken]);

  return(
    <>
    </>
  );

};

export default TelegramApp;
