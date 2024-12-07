import Image from "next/image";
import * as React from "react"
import Link from "next/link"
import { NavBar } from "@/components/ui/navigation-menu"


export default function Home() {
  return (

    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
   
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <NavBar/>

        <h1 className="text-4xl sm:text-5xl text-center font-size:300px sm:text-left font-[family-name:var(--font-geist-poppins)]">
          <strong>
            Parkinson's Classifier
          </strong>  
        </h1>

        <text className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-2">
        A Parkinsons disease classifier that can uses your audio data and uses that data to help diagnose early
        </text>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/demo"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Try it out!
          </a>
        </div>
      </main>   
    </div>
  );
}
