import {FC, useEffect} from 'react';
import {useGetTokenMutation, useRegisterUserMutation} from "@/Store/api/telegramDataApi";
import {setToken} from "@/Store/slices/authSlice";
import {useDispatch} from "react-redux";

const TelegramApp: FC = () => {
  const [registerUser] = useRegisterUserMutation();
  const [getToken] = useGetTokenMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken(token));
    } else {
      handleTelegramAuth();
    }
  }, [dispatch, registerUser, getToken]);

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
          password: 'user_password', // В реальном приложении пароль должен быть получен безопасным способом
        };

        const response = await getToken(tokenData).unwrap();
        localStorage.setItem('token', response.access_token);
        dispatch(setToken(response.access_token));

        console.log('User registered and authenticated successfully');
      } catch (error) {
        console.error('Registration or authentication failed:', error);
      }
    }
  };
  return(
    <>
    </>
  );

};

export default TelegramApp;
