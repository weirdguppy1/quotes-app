import Navbar from "@/components/Navbar";
import { useAtom } from "jotai";
import Head from "next/head";
import { modalOpenAtom, modalOpenProfileAtom } from "../atoms";
import QuoteGenerator from "../components/QuoteGenerator";

export default function Home() {
  const [isSearchOpen] = useAtom(modalOpenAtom);
  const [isOpenProfile] = useAtom(modalOpenProfileAtom);

  return (
    <div
      className={`h-screen flex flex-col items-center justify-center text-coca p-4 tranisition-all transform duration-500 ${
        (isSearchOpen || isOpenProfile) && "blur-md"
      }`}
    >
      <Head>
        <title>Quote App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center space-y-4">  
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br bright from-pink-400 to-tan transform-all transition duration-200 hover:brightness-125">
          Quote App
        </h1>
        <p>Get your daily dose of inspiration. ❤️</p>
        <QuoteGenerator />
      </div>
    </div>
  );
}
