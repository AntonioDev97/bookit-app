import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MenuSideNav from "./components/MenuSideNav";
import Footer from "./components/Footer";
import Head from "./head";
import Content from "./components/Content/Content.component";
import { GlobalProvider } from "./GlobalProvider";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "APP - NextJS Boilerplate",
  description: "Generated by create next app as a nextjs, carbon, typescript and sso auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <GlobalProvider>
          <MenuSideNav />
          <Content>
            {children}
          </Content>
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
