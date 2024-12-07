import { NavBar, HomeButton } from "@/components/ui/navigation-menu";

export default function Installation() {
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
          <strong>Installation & Usage</strong>
        </h1>

        <section className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold">Installation</h2>
          <p className="text-base leading-relaxed">
            To install and use our Parkinson's Classifier model, follow the steps below. Ensure you have Python 3.8 or above installed on your machine.
          </p>
          <ol className="list-decimal ml-6 space-y-4">
            <li>
              Clone the repository:
              <pre className="bg-gray-100 p-4 rounded-md text-sm">
                <code>git clone https://github.com/pgupta125/ParkinsonsEarlyDiagnosis.git</code>
              </pre>
            </li>
            <li>
              Navigate to the project directory:
              <pre className="bg-gray-100 p-4 rounded-md text-sm">
                <code>cd ParkinsonsEarlyDiagnosis</code>
              </pre>
            </li>
            <li>
              Create and activate a virtual environment (optional but recommended):
              <pre className="bg-gray-100 p-4 rounded-md text-sm">
                <code>
                    {`# Create a virtual environment
                    python -m venv .venv

                    # Activate the environment (Windows)
                    .venv\\Scripts\\activate

                    # Activate the environment (macOS/Linux)
                    source .venv/bin/activate`}
                </code>
              </pre>
            </li>
            <li>
              Install the required packages:
              <pre className="bg-gray-100 p-4 rounded-md text-sm">
                <code>pip install -r requirements.txt</code>
              </pre>
            </li>
          </ol>
        </section>

        <section className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold">Usage</h2>
          <p className="text-base leading-relaxed">
            After successful installation, you can use the classifier to analyze audio data. Follow the steps below to run the model:
          </p>
          <ol className="list-decimal ml-6 space-y-4">
            <li>
              Prepare your data. Ensure it is in the correct format (.csv).
            </li>
            <li>
              Run the model with your data:
              <pre className="bg-gray-100 p-4 rounded-md text-sm">
                <code>python main.py --input path/to/data.csv</code>
              </pre>
            </li>
          </ol>
        </section>

        <section className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold">Dependencies</h2>
          <p className="text-base leading-relaxed">
            Ensure you have the following dependencies installed (these will be handled by <code>requirements.txt</code>):
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Python 3.8 or above</li>
            <li>TensorFlow ({">"}=2.8)</li>
            <li>Librosa</li>
            <li>NumPy</li>
            <li>Pandas</li>
            <li>Scikit-learn</li>
            <li>Matplotlib</li>
          </ul>
        </section>

        <div className="flex gap-4 mt-8">
          <a
            href="/demo"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Try out the model now!
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
