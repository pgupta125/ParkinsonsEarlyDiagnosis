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
          <strong>Installation</strong>
        </h1>

        <section className="max-w-4xl space-y-6">
          {/* <h2 className="text-2xl font-semibold">Installation</h2> */}
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
              Open two terminals. Navigate to the project directory in each:
              <pre className="bg-gray-100 p-4 rounded-md text-sm">
                <code>cd ParkinsonsEarlyDiagnosis</code>
              </pre>
            </li>
            <li>
              For the first terminal:
              <pre className="bg-gray-100 p-4 rounded-md text-sm">
                <code>
                    {`# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the environment
source venv/bin/activate

# install required packages
pip install -r requirements.txt

python app.py`}
                </code>
              </pre>
            </li>
            <li>
              For the second terminal:
              <pre className="bg-gray-100 p-4 rounded-md text-sm">
                <code>
                    {`# Navigate to the frontend directory
cd frontend

# Install the Node Package Manager
npm install

# Launch the frontend
npm run dev`}
                </code>
              </pre>
            </li>
          </ol>
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
