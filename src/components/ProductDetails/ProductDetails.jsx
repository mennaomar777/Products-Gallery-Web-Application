import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getProductDetails() {
    setIsLoading(true);
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProductDetails(res.data);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getProductDetails();
  }, [id]);
  if (isError) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#f8f9fa] dark:bg-gray-900">
        <p className="text-[#BEA190] text-lg">
          <span className="text-2xl font-semibold text-[#BEA190] mb-4">
            Oops!
          </span>{" "}
          Something went wrong while loading product details. Please try again
          later.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block bg-[#BEA190] text-white py-2 px-4 rounded-lg hover:bg-[#A68A82] hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#BEA190] focus:ring-offset-2"
        >
          Back to Products
        </Link>
      </div>
    );
  }
  return (
    <>
      {isLoading || !productDetails ? (
        <div className="h-screen flex items-center justify-center bg-[#f8f9fa] dark:bg-gray-900">
          <span className="loader">Load&nbsp;ng</span>
        </div>
      ) : (
        <div className="container py-10">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 dark:bg-gray-800">
            <div className="flex items-center justify-center group">
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                className="object-contain mx-auto w-full max-w-md h-96 rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {productDetails?.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm dark:text-gray-300">
                {productDetails?.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[#e3c1ad] font-semibold text-lg">
                  ${productDetails?.price}
                </span>
                <span className="text-sm text-gray-400 capitalize dark:text-gray-300">
                  {productDetails?.category}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                {Array.from({ length: 5 }, (_, i) => {
                  return productDetails.rating.rate >= i + 1 ? (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ) : productDetails.rating.rate > i &&
                    productDetails.rating.rate < i + 1 ? (
                    <FaStarHalfAlt
                      className="text-yellow-400 text-lg"
                      key={i}
                    />
                  ) : (
                    <FaRegStar className="text-yellow-400 text-lg" key={i} />
                  );
                })}
                <div className="text-md text-gray-500 dark:text-gray-300 ms-2">
                  {productDetails.rating.rate}
                </div>
              </div>
              <div className="flex space-x-4 ">
                <button
                  className="flex-1 py-2 bg-[#BEA190] text-white cursor-pointer rounded-lg hover:bg-[#A68A82] hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#BEA190] focus:ring-offset-2 dark:text-[#b4856b] dark:bg-gray-200 dark:hover:bg-gray-300 "
                  onClick={() => toast.success("Added to cart!")}
                >
                  Add to Cart
                </button>
                <Link
                  to="/"
                  className="flex-1 py-2 text-center bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 "
                >
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
