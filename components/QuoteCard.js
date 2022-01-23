import React from "react";

const QuoteCard = (props) => {
  const { author, content } = props;

  return (
    <div className="flex flex-col space-y-2 border-2 w-full p-3 rounded-xl shadow-lg hover:shadow-pink-400 transform-all transition duration-500">
      <div className="flex justify-between">
        <h1 className="text-xl">{author}</h1>

        <button>
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <p className="text-sm">"{content}"</p>
    </div>
  );
};
export default QuoteCard;
