"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setToken } from '@/Store/slices/authSlice';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken(token));
      router.push('/profile');
    } else {
      router.push('/auth/step_1');
    }
  }, [dispatch, router]);

  return <></>;
};
