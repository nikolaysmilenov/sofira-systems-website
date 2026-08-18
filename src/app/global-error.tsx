"use client";

import { useEffect } from "react";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function GlobalError({ error, retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="bg" className={`${inter.variable} ${manrope.variable}`}>
      <body className={`${inter.className} bg-white text-[#0c1730] antialiased`}>
        <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
          <title>Грешка | SOFIRA SYSTEMS</title>
          <p className="text-sm font-medium tracking-kicker text-[#1a6dff]">
            Грешка
          </p>
          <h1 className="mt-4 text-3xl">Сайтът не можа да се зареди</h1>
          <p className="mt-4 leading-relaxed text-[#4d5d78]">
            Възникна проблем в основната структура на страницата. Опитайте да я
            заредите отново.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            className="mt-8 min-h-11 rounded-md bg-[#1a6dff] px-5 text-sm font-semibold tracking-normal text-white"
          >
            Опитайте отново
          </button>
        </main>
      </body>
    </html>
  );
}
