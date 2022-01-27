import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { modalOpenAtom, modalOpenProfileAtom } from "../atoms";
import { useAtom } from "jotai";
import SearchModal from "./SearchModal";
import { HeartIcon } from "./Hearts";
import ProfileModal from "./ProfileModal";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setOpen] = useAtom(modalOpenAtom);
  const [, setOpenProfile] = useAtom(modalOpenProfileAtom);

  const [currentQuote, setCurrentQuote] = useState({});

  useEffect(() => {
    handleRandomQuote();
  }, []);

  function openModal() {
    setOpen(true);
  }

  function openProfileModal() {
    setOpenProfile(true);
  }

  const handleRandomQuote = async () => {
    setLoading(true);
    await axios.get("https://api.quotable.io/random").then((res) => {
      const data = res.data;
      setQuote(`"${data.content}" - ${data.author}`);
      setCurrentQuote({
        author: data.author,
        content: data.content,
        id: data._id,
      });
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
      setCurrentQuote({
        author: data.contents.quotes[0].author,
        content: data.contents.quotes[0].quote,
        id: data.contents.quotes[0].id,
      });
    });
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-2xl">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex space-x-4 justify-center w-full">
          <button
            disabled={loading}
            onClick={handleRandomQuote}
            className="bg-gray-100 text-coca rounded py-2 px-3 disabled:cursor-not-allowed"
          >
            Random 🎲
          </button>
          <button
            disabled={loading}
            onClick={handleQOD}
            className="bg-gray-100 text-coca rounded py-2 px-3 disabled:cursor-not-allowed"
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
          <button onClick={() => openProfileModal()}>
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
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="max-w-2xl mt-5 p-6 transform-all transition duration-500 hover:shadow-2xl rounded-lg hover:shadow-pink-400">
          {quote}
        </h1>

        <HeartIcon quote={currentQuote} />
      </div>

      {/* -- Modal -- */}

      <SearchModal />
      <ProfileModal />
    </div>
  );
};

export default QuoteGenerator;
