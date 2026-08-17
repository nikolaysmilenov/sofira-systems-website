"use client";

import { useEffect } from "react";
import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function GlobalError({ error, retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="bg">
      <body className="bg-black text-white">
        <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
          <title>Грешка | SOFIRA SYSTEMS</title>
          <p className="text-sm uppercase tracking-[0.28em] text-[#22c4ff]">
            Грешка
          </p>
          <h1 className="mt-4 text-3xl">Сайтът не можа да се зареди</h1>
          <p className="mt-4 text-white/70">
            Възникна проблем в основната структура на страницата. Опитайте да я
            заредите отново.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            className="mt-8 min-h-11 rounded-md bg-[#1a6dff] px-5 text-sm font-medium text-white"
          >
            Опитайте отново
          </button>
        </main>
      </body>
    </html>
  );
}
