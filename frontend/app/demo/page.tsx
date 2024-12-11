"use client";
import { NavBar, HomeButton } from "@/components/ui/navigation-menu";
import { useState } from "react";
import { saveAs } from "file-saver";

type ParkinsonsData = {
  mdvp_fo_hz: string;
  mdvp_fhi_hz: string;
  mdvp_flo_hz: string;
  mdvp_jitter_percent: string;
  mdvp_jitter_abs: string;
  mdvp_rap: string;
  mdvp_ppq: string;
  jitter_ddp: string;
  mdvp_shimmer: string;
  mdvp_shimmer_db: string;
  shimmer_apq3: string;
  shimmer_apq5: string;
  mdvp_apq: string;
  shimmer_dda: string;
  nhr: string;
  hnr: string;
  rpde: string;
  dfa: string;
  spread1: string;
  spread2: string;
  d2: string;
  ppe: string;
};

const UNHEALTHY_DATA = {
  mdvp_fo_hz: "145.621834",
  mdvp_fhi_hz: "202.860612",
  mdvp_flo_hz: "120.609159",
  mdvp_jitter_percent: "0.007240",
  mdvp_jitter_abs: "0.000044",
  mdvp_rap: "0.003435",
  mdvp_ppq: "0.003103",
  jitter_ddp: "0.007534",
  mdvp_shimmer: "0.027022",
  mdvp_shimmer_db: "0.265502",
  shimmer_apq3: "0.016982",
  shimmer_apq5: "0.017518",
  mdvp_apq: "0.024678",
  shimmer_dda: "0.054957",
  nhr: "0.023385",
  hnr: "22.341600",
  rpde: "0.494590",
  dfa: "0.723209",
  spread1: "-5.570234",
  spread2: "0.223611",
  d2: "2.406577",
  ppe: "0.195045"
};


const HEALTHY_DATA = {
  mdvp_fo_hz: "153.162190",
  mdvp_fhi_hz: "206.443505",
  mdvp_flo_hz: "120.504630",
  mdvp_jitter_percent: "0.005547",
  mdvp_jitter_abs: "0.000041",
  mdvp_rap: "0.003376",
  mdvp_ppq: "0.003100",
  jitter_ddp: "0.009417",
  mdvp_shimmer: "0.032152",
  mdvp_shimmer_db: "0.279573",
  shimmer_apq3: "0.015997",
  shimmer_apq5: "0.017932",
  mdvp_apq: "0.024240",
  shimmer_dda: "0.049586",
  nhr: "0.024056",
  hnr: "21.631583",
  rpde: "0.490669",
  dfa: "0.715873",
  spread1: "-5.741013",
  spread2: "0.238425",
  d2: "2.388797",
  ppe: "0.193249"
};

const INITIAL_DATA: ParkinsonsData = {
  mdvp_fo_hz: "",
  mdvp_fhi_hz: "",
  mdvp_flo_hz: "",
  mdvp_jitter_percent: "",
  mdvp_jitter_abs: "",
  mdvp_rap: "",
  mdvp_ppq: "",
  jitter_ddp: "",
  mdvp_shimmer: "",
  mdvp_shimmer_db: "",
  shimmer_apq3: "",
  shimmer_apq5: "",
  mdvp_apq: "",
  shimmer_dda: "",
  nhr: "",
  hnr: "",
  rpde: "",
  dfa: "",
  spread1: "",
  spread2: "",
  d2: "",
  ppe: "",
};

type PredictionState = {
  result: string | null;
};

export default function Demo() {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<PredictionState>({ result: null });
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleGenerateExample = (type: 'healthy' | 'unhealthy') => {
    const data = type === 'healthy' ? HEALTHY_DATA : UNHEALTHY_DATA;
    const headers = Object.keys(data);
    const values = Object.values(data);
    
    const rows = [
      headers,
      values
    ];

    const csvContent = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `parkinsons-${type}-example.csv`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      if (uploadedFile.type === "text/csv") {
        setFile(uploadedFile);
        setUploadError(null);
      } else {
        setUploadError("Please upload a valid CSV file.");
        setFile(null);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setUploadError("Please upload a CSV file before running the analysis.");
      return;
    }
  
    try {
      const fileContent = await file.text();
      const rows = fileContent.split('\n');
      if (rows.length < 2) {
        setUploadError("Invalid CSV format: File must contain headers and data.");
        return;
      }
  
      const headers = rows[0].split(',').map(h => h.trim());
      const values = rows[1].split(',').map(v => v.trim());
  
      const data: Record<string, number> = {};
      headers.forEach((header, index) => {
        data[header] = parseFloat(values[index]);
      });
  
      const response = await fetch("http://0.0.0.0:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        setPrediction({
          result: result.has_parkinsons ? "Positive" : "Negative",
        });
        setUploadError(null);
      } else {
        const errorData = await response.json();
        setUploadError(errorData.message || "An error occurred while analyzing the file.");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setUploadError("An unexpected error occurred while processing the file. Please ensure the CSV format is correct.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <HomeButton />
          <NavBar />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Parkinson's Disease Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Download example data or upload your own voice data for analysis
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Example Downloads Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">1. Example Data</h2>
            <p className="text-gray-600 mb-6">
              Download example datasets to see the expected format
            </p>
            <div className="space-y-4">
              <button
                onClick={() => handleGenerateExample('healthy')}
                className="w-full bg-green-600 text-white rounded-lg py-3 px-4 hover:bg-green-700 transition-colors"
              >
                Download Healthy Example
              </button>
              <button
                onClick={() => handleGenerateExample('unhealthy')}
                className="w-full bg-red-600 text-white rounded-lg py-3 px-4 hover:bg-red-700 transition-colors"
              >
                Download Unhealthy Example
              </button>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">2. Upload & Analyze</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
              <label htmlFor="csv-upload" className="cursor-pointer block">
                <div className="text-gray-600">
                  {file ? (
                    <span className="text-blue-600">{file.name}</span>
                  ) : (
                    "Drop your CSV file here or click to browse"
                  )}
                </div>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            {uploadError && (
              <div className="text-red-500 text-sm mb-4">{uploadError}</div>
            )}
            <button
              onClick={handleAnalyze}
              disabled={!file}
              className={`w-full rounded-lg py-3 px-4 transition-colors ${
                file
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Analyze Data
            </button>
          </div>
        </div>

        {/* Results Section */}
        {prediction.result && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">Analysis Results</h2>
              <div className="text-center">
                <div className="text-gray-600 mb-2">Prediction</div>
                <div className={`text-3xl font-bold ${
                  prediction.result === 'Positive' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {prediction.result}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}