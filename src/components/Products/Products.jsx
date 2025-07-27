import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchProducts, setSearchProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");

  async function getProducts() {
    setIsLoading(true);
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setAllProducts(res.data);
      setSearchProducts(res.data);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  }

  function newSearchProducts(value) {
    if (value.trim() == "") {
      setSearchProducts(allProducts);
    } else {
      const newProducts = structuredClone(allProducts);
      const filteredProducts = newProducts.filter((product) => {
        return product.title.toLowerCase().includes(value.toLowerCase());
      });
      setSearchProducts(filteredProducts);
    }
  }

  useEffect(() => {
    const productsAfterSorting = [...searchProducts];
    if (sortBy === "name") {
      productsAfterSorting.sort((a, b) => a.title.localeCompare(b.title));
      setSearchProducts(productsAfterSorting);
    } else if (sortBy === "priceLtH") {
      productsAfterSorting.sort((a, b) => a.price - b.price);
      setSearchProducts(productsAfterSorting);
    } else if (sortBy === "priceHtL") {
      productsAfterSorting.sort((a, b) => b.price - a.price);
      setSearchProducts(productsAfterSorting);
    } else {
      setSearchProducts(allProducts);
    }
  }, [sortBy]);

  useEffect(() => {
    getProducts();
  }, []);

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8f9fa] dark:bg-gray-900">
        <p className="text-[#BEA190] text-lg">
          <span className="text-2xl font-semibold text-[#BEA190] mb-4">
            Oops!
          </span>{" "}
          Something went wrong while loading products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center bg-[#f8f9fa] dark:bg-gray-900">
          <span className="loader">Load&nbsp;ng</span>
        </div>
      ) : (
        <div className="container py-10 ">
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center dark:text-gray-100">
              Our Products
            </h1>
            <div className="flex gap-6 justify-between items-center pt-4 pb-8 px-4">
              <div className="flex-grow">
                <form className="max-w-lg">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-[#A68A82] dark:text-[#A68A82]"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-3 ps-10 text-sm text-gray-900 border border-[#BEA190] rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#BEA190] focus:border-[#BEA190] focus:outline-none dark:bg-gray-800 dark:text-white"
                      placeholder="Search Products..."
                      required
                      onInput={(e) => newSearchProducts(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="flex-shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-[#BEA190] rounded-lg px-4 py-2 text-sm text-gray-900 bg-gray-50 focus:ring-2 focus:ring-[#BEA190] focus:border-[#BEA190] focus:outline-none dark:bg-gray-800 dark:text-white"
                >
                  <option value="">No sorting</option>
                  <option value="name">Sort By: Name (A-Z)</option>
                  <option value="priceLtH">Sort By: Price (Low to High)</option>
                  <option value="priceHtL">Sort By: Price (High to Low)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchProducts?.map((product) => (
                <Card product={product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
