import Image from "next/image";
import * as React from "react";
import { NavBar, HomeButton } from "@/components/ui/navigation-menu";



export default function About() {
  const teamMembers = [
    {
      name: "Daniel Kim",
      bio: "Daniel Kim is 3rd year Computer Science and Statistics major working in the Software Engineering Industry.",
      image: "/dan.jpeg", 
    },
    {
      name: "Parinita Gupta",
      bio: "Parinita Gupta is a 4th year computational Cognitive Science major with minors in computer science and neuroscience, doing research with computer vision and medical imaging. She aims to work as a software engineer in the medtech industry.",
      image: "/pari2.jpeg", 
    },
    {
      name: "Priyanshi Singh",
      bio: "Priyanshi Singh is a 3rd Computational Cognitive Science and Data Science major looking to work in the medtech field",
      image: "/priyanshi.jpeg", 
    },
    {
      name: "Abhinav Tata",
      bio: "Abhinav Tata is a 3rd year Computer Science and Statistics major aspiring to work in AI and Product Management.",
      image: "/tata.jpeg", 
    },
  ];

  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="absolute top-4 left-8">
          <HomeButton />
        </div>
        <div className="absolute top-4 right-8">
          <NavBar />
        </div>

        <h1 className="text-4xl sm:text-5xl text-center font-size:300px sm:text-left font-[family-name:var(--font-geist-poppins)]">
          <strong>About Us</strong>
        </h1>

        <p className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-2">
          Meet the team behind the Parkinson's Classifier—a dedicated group of
          innovators combining expertise in machine learning, design, and
          healthcare to make early diagnosis accessible to all.
        </p>

        <div className="grid gap-8 sm:grid-cols-4 w-full">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center sm:text-left p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full"
              />
              <h2 className="text-lg font-bold mt-4">{member.name}</h2>
              <p className="text-sm mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
