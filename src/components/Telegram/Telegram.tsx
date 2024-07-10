import {FC, useEffect} from 'react';
import {useGetTokenMutation, useRegisterUserMutation} from "@/Store/api/telegramDataApi";
import {clearToken, setToken} from "@/Store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/Store/store";

const TelegramApp: FC = () => {
  const [registerUser] = useRegisterUserMutation();
  const [getToken] = useGetTokenMutation();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      dispatch(setToken(tokenFromStorage));
    } else {
      handleTelegramAuth();
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      validateToken();
    } else {
      handleTelegramAuth();
    }
  }, [token]);

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

  const validateToken = async () => {
    try {
      console.log('Token is valid');
    } catch (error) {
      dispatch(clearToken());
      localStorage.removeItem('token');
      handleTelegramAuth();
    }
  };
  return(
    <>
    </>
  );

};

export default TelegramApp;
