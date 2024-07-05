"use client"
import { Montserrat } from "next/font/google";
import "../globals.css";
import {Provider} from "react-redux";
import {store} from "@/Store/store";

const montserrat = Montserrat({ subsets: ["latin"] });


export default function Layout_Settings({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Provider store={store}>
      <body className={montserrat.className}>
      <div>
        {children}
      </div>
      </body>
    </Provider>
    </html>
  );
}
