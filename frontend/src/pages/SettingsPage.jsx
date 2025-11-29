import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Oops! Page Under Construction
      </h1>
      <p className="text-lg text-gray-500 text-center max-w-md mb-6">
        We’re working hard to make this page awesome. Please check back later!
      </p>
      <Button
        onClick={() => navigate('/overview')}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Go Back Home
      </Button>
    </div>
  );
};

export default SettingsPage;
