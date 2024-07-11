import { AuthProvider } from "./Providers";
import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "constabledot n",
  description: "constable to learn the things",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header/>
          {children}
          <Footer/>
          </AuthProvider>
      </body>
    </html>
  );
}