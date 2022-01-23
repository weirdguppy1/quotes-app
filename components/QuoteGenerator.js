import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { modalOpenAtom } from "../atoms";
import { useAtom } from "jotai";
import SearchModal from "./SearchModal";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setOpen] = useAtom(modalOpenAtom);

  useEffect(() => {
    handleRandomQuote();
  }, []);

  function openModal() {
    setOpen(true);
  }

  const handleRandomQuote = async () => {
    setLoading(true);
    await axios.get("https://api.quotable.io/random").then((res) => {
      const data = res.data;
      setQuote(`"${data.content}" - ${data.author}`);
    });
    setLoading(false);
  };

  const handleQOD = async () => {
    setLoading(true);
    await axios.get("https://quotes.rest/qod").then((res) => {
      console.log(res.data);
      const data = res.data;
      setQuote(
        `"${data.contents.quotes[0].quote}" - ${
          data.contents.quotes[0].author || "Anonymous"
        }`
      );
    });
    setLoading(false);
  };

  

  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-2xl">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex space-x-4 justify-center w-full">
          <button
            onClick={handleRandomQuote}
            disabled={loading}
            className="bg-gray-100 text-coca rounded py-2 px-3"
          >
            Random 🎲
          </button>
          <button
            disabled={loading}
            onClick={handleQOD}
            className="bg-gray-100 text-coca rounded py-2 px-3"
          >
            Quote of Day ☀️
          </button>
          <button onClick={() => openModal()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <h1 className="max-w-2xl mt-5 p-6 transform-all transition duration-500 hover:shadow-2xl rounded-lg hover:shadow-pink-400">
        {quote}
      </h1>

      {/* -- Modal -- */}

      <SearchModal />
    </div>
  );
};

export default QuoteGenerator;
