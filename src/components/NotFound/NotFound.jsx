import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-6xl font-bold text-gray-800 mb-4 animate-pulse dark:text-gray-200">
            404
          </h2>
          <p className="text-lg text-gray-600 mb-6 dark:text-gray-200">
            Oops! The page you’re looking for doesn’t exist.
          </p>
          <Link
            to="/"
            className="bg-[#BEA190] text-white font-medium py-3 my-3 px-6 rounded-lg hover:bg-[#A68A82] hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#BEA190] focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
