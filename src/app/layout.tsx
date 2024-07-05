"use client";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import { Provider } from "react-redux";
import { store } from "@/Store/store";
import Layout from "@/components/Layout/Layout";
import {useEffect} from "react";


const montserrat = Montserrat({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  useEffect(()=> {
    // @ts-ignore
    const tg= window.Telegram.WebApp;
    tg.ready();
      })

  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <Provider store={store}>
        <body className={montserrat.className}>
        <div>
          {children}
        </div>
          <Layout/>
        </body>
      </Provider>
    </html>
  );
}
