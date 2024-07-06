"use client";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import { Provider } from "react-redux";
import { store } from "@/Store/store";
import Layout from "@/components/Layout/Layout";


const montserrat = Montserrat({ subsets: ["latin"] });
export default function RootLayout({
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
        <Layout/>
        </body>
      </Provider>
      </html>
  );
}