"use client";
import { NavBar, HomeButton } from "@/components/ui/navigation-menu";
import { useState } from "react";
import { saveAs } from "file-saver";

export default function Demo() {
  const [inputs, setInputs] = useState({
    HNR: "",
    NHR: "",
    ShimmerAPQ3: "",
    MDVPShimmerdB: "",
    MDVPJitterPercent: "",
    spread2: "",
  });

  const [errors, setErrors] = useState({
    HNR: false,
    NHR: false,
    ShimmerAPQ3: false,
    MDVPShimmerdB: false,
    MDVPJitterPercent: false,
    spread2: false,
  });

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Handle manual input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isValid = /^\d*\.?\d*$/.test(value);
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  // Handle CSV download
  const handleGenerateCSV = () => {
    if (Object.values(errors).some((error) => error)) {
      alert("Please ensure all inputs are valid numbers.");
      return;
    }

    const rows = [
      ["HNR", "NHR", "Shimmer:APQ3", "MDVP:Shimmer(dB)", "MDVP:Jitter(%)", "spread2"],
      [inputs.HNR, inputs.NHR, inputs.ShimmerAPQ3, inputs.MDVPShimmerdB, inputs.MDVPJitterPercent, inputs.spread2],
    ];

    const csvContent = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "demo-inputs.csv");
  };

  // Handle CSV file upload
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

  // Handle analysis of uploaded CSV
  const handleAnalyze = async () => {
    if (!file) {
      setUploadError("Please upload a CSV file before running the analysis.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Replace the URL with your backend API endpoint
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result); // Assume `data.result` contains the ML output (e.g., "Positive" or "Negative").
        setUploadError(null);
      } else {
        const errorData = await response.json();
        setUploadError(errorData.message || "An error occurred while analyzing the file.");
      }
    } catch (err) {
      setUploadError("An unexpected error occurred. Please try again.");
    }
  };

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
          <strong>Demo & Analysis</strong>
        </h1>
        <p className="text-base text-center sm:text-left">
          Enter the six values manually or upload a CSV file to analyze data for Parkinson's disease.
        </p>
        <div className="grid grid-cols-2 gap-20">
          {/* Manual Input Section */}
          <div className="w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Manual Input</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "HNR ", name: "HNR" },
                { label: "NHR", name: "NHR" },
                { label: "Shimmer:APQ3", name: "ShimmerAPQ3" },
                { label: "MDVP:Shimmer(dB)", name: "MDVPShimmerdB" },
                { label: "MDVP:Jitter(%)", name: "MDVPJitterPercent" },
                { label: "spread2", name: "spread2" },
              ].map((field, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={inputs[field.name as keyof typeof inputs]}
                    onChange={handleChange}
                    className={`border rounded-md p-2 w-full ${
                      errors[field.name as keyof typeof errors] ? "border-red-500" : ""
                    }`}
                    placeholder={`Enter ${field.label}`}
                  />
                  {errors[field.name as keyof typeof errors] && (
                    <span className="text-red-500 text-xs">Invalid number format.</span>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleGenerateCSV}
              className="mt-6 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Download CSV
            </button>
          </div>

          {/* CSV Upload Section */}
          <div className="w-full max-w-lg mt-8 space-y-5">
            <h2 className="text-lg font-semibold mb-10">Upload CSV</h2>
            <div>
              <label
                htmlFor="csv-upload"
                className="cursor-pointer rounded-md border border-dashed border-gray-400 p-8 text-center text-sm text-gray-600 hover:border-gray-800 hover:text-gray-800"
              >
                {file ? `File Uploaded: ${file.name}` : "Click here to browse or drop your CSV file here"}
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <div className ="mt-10">
                {uploadError && <span className="text-red-500 text-sm mt-5">{uploadError}</span>}
              </div>
            </div>
            <button
              onClick={handleAnalyze}
              className="mt-4 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Analyze CSV
            </button>
          </div>
          <div>
            {/* Analysis Result */}
            {result && (
              <div className="mt-8 p-4 border rounded-md bg-green-100 text-green-800">
                <strong>Analysis Result:</strong> {result}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
