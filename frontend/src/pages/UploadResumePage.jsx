import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

export const API_URL = "http://localhost:5000";

const UploadResumePage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    const savedRes = sessionStorage.getItem("aiResponse");
    if (savedRes) {
      setAiResult(JSON.parse(savedRes));
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setAiResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post(`${API_URL}/resume/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAiResult(response.data.text);
      sessionStorage.setItem("aiResponse", JSON.stringify(response.data.text));
    } catch (error) {
      console.error(error);
      alert("Failed to analyse.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen p-10 bg-white"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-black">Upload Resume</h1>
        <p className="text-gray-600 mt-1 text-lg">
          Upload your resume and get instant AI-powered feedback.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mt-4 max-w-3xl shadow-md border-gray-200">
          <CardContent className="p-6">
            <label className="text-gray-700 font-medium text-sm">Upload PDF</label>

            <Input
              type="file"
              accept="application/pdf"
              className="mt-2 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {file && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: <span className="font-semibold">{file.name}</span>
              </p>
            )}

            <motion.div whileHover={{ scale: 1.03 }} className="mt-5">
              <Button
                onClick={handleUpload}
                disabled={!file || loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing…
                  </span>
                ) : (
                  "Upload & Analyze Resume"
                )}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mt-10 max-w-3xl p-6 shadow-md">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </Card>
        </motion.div>
      )}

      {aiResult && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mt-10 max-w-3xl shadow-md border-gray-200">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-semibold text-black">AI Feedback</h3>
              <h3 className="text-2xl font-semibold text-green-700">{aiResult.intro}</h3>

              <div>
                <h4 className="text-xl font-bold text-black mb-2">Summary</h4>
                <p className="text-gray-900 text-lg leading-relaxed">{aiResult.summary}</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-2">Improvement Suggestions</h4>
                <ul className="space-y-2 list-disc list-inside text-gray-900 text-lg">
                  {aiResult.improvements?.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-2">Additional Suggestions</h4>
                <ul className="space-y-2 list-disc list-inside text-gray-900 text-lg">
                  {aiResult.suggestions?.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UploadResumePage;
