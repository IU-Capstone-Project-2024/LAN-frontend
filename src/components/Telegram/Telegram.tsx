import {FC, useEffect} from 'react';
import {useGetTokenMutation, useRegisterUserMutation} from "@/Store/api/telegramDataApi";
import {clearToken, setToken} from "@/Store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/Store/store";
import { useRouter } from 'next/navigation';

const TelegramApp: FC = () => {
  const [registerUser] = useRegisterUserMutation();
  const [getToken] = useGetTokenMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      dispatch(setToken(tokenFromStorage));
    } else {
      handleTelegramAuth();
    }
  }, [dispatch]);

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
        await getTokenAndRedirect(user.username);
      } catch (error: any) {
        if (error.status === 409) {
          await getTokenAndRedirect(user.username);
        } else {
          console.error('Registration failed:', error);
        }
      }
    }
  };

  const getTokenAndRedirect = async (username: string) => {
    const telegram = (window as any).Telegram.WebApp;
    const user = telegram.initDataUnsafe.user;
    
    const tokenData = {
      grant_type: 'password',
      username: user.id,
      password: telegram.initDataUnsafe.auth_date,
    };

    try {
      const response = await getToken(tokenData).unwrap();
      localStorage.setItem('token', response.access_token);
      dispatch(setToken(response.access_token));
    } catch (error) {
      console.error('Token retrieval failed:', error);
    }
  };

  useEffect(() => {
    handleTelegramAuth();
  }, []);

  return(
    <>
    </>
  );

};

export default TelegramApp;