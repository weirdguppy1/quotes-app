import useLocalStorage from "@rehooks/local-storage";
import React from "react";
import { handleQuoteDislike, handleQuoteLike } from "../functions";
import { FilledHeart, OpenHeart } from "./Hearts";

const QuoteCard = (props) => {
  const { author, content, id } = props;
  const currentQuote = { author: author, content: content, id: id };

  const [likedQuotes] = useLocalStorage("quotes:liked");

  return (
    <div className="flex flex-col space-y-2 border-2 w-full p-3 rounded-xl shadow-lg hover:shadow-pink-400 transform-all transition duration-500">
      <div className="flex justify-between">
        <h1 className="text-xl">{author}</h1>
        {(() => {
          if (likedQuotes == null || !Array.isArray(likedQuotes)) {
            return (
              <button onClick={() => handleQuoteLike(currentQuote)}>
                <OpenHeart />
              </button>
            );
          } else if (likedQuotes.some((e) => e.id === id)) {
            return (
              <button onClick={() => handleQuoteDislike(currentQuote)}>
                <FilledHeart />
              </button> 
            );
          } else {
            return (
              <button onClick={() => handleQuoteLike(currentQuote)}>
                <OpenHeart />
              </button>
            );
          }
        })()}
      </div>
      <p className="text-sm">&quot;{content}&quot;</p>
    </div>
  );
};
export default QuoteCard;
