import { NavBar, HomeButton } from "@/components/ui/navigation-menu";

export default function Introduction() {
  return (
    <div className="relative min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="absolute top-4 left-8">
          <HomeButton />
        </div>
      <div className="absolute top-4 right-8">
        <NavBar />
      </div>

      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-[family-name:var(--font-geist-poppins)]">
          <strong>Introduction</strong>
        </h1>

        <section className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold">What is Parkinson's Disease?</h2>
          <p className="text-base leading-relaxed">
            Parkinson's disease is a progressive neurological disorder that
            affects movement. It occurs when certain nerve cells in the brain
            deteriorate, leading to a reduction in dopamine—a key neurotransmitter
            responsible for controlling movement. Common symptoms include
            tremors, stiffness, and difficulty with balance and coordination.
          </p>
          <p className="text-base leading-relaxed">
            Early diagnosis is critical, as it allows for timely intervention
            that can improve the quality of life for patients. However,
            Parkinson's disease can be challenging to diagnose in its early
            stages, as symptoms may be subtle or mistaken for other conditions.
          </p>
        </section>

        <section className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold">What Does Our Model Do?</h2>
          <p className="text-base leading-relaxed">
            Our model leverages state-of-the-art machine learning techniques to
            analyze audio data for early detection of Parkinson's disease. By
            examining subtle variations in voice patterns and other relevant
            features, our model can assist healthcare providers in identifying
            potential cases of Parkinson's disease with higher accuracy and
            speed.
          </p>
          <p className="text-base leading-relaxed">
            Specifically, our model focuses on analyzing audio samples to detect
            early signs of vocal impairment, which is often an early indicator of
            Parkinson's disease. With this technology, we aim to provide a
            non-invasive, accessible, and scalable diagnostic tool that supports
            clinicians in their efforts to diagnose and treat this condition.
          </p>
        </section>

        <div className="flex gap-4 mt-8">
          <a
            href="/readme/installation"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Learn How to Use the Model
          </a>
          <a
            href="https://github.com/pgupta125/ParkinsonsEarlyDiagnosis"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-background text-foreground gap-2 hover:bg-[#f0f0f0] dark:hover:bg-[#444] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            View Code on GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
