import useLocalStorage from "@rehooks/local-storage";
import { handleQuoteDislike, handleQuoteLike } from "../functions";

export const FilledHeart = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-red-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const OpenHeart = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="hover:text-red-500 h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
};

export const HeartIcon = (props) => {
  const { quote } = props;
  const [likedQuotes] = useLocalStorage("quotes:liked");

  return (
    <>
      {(() => {
        if (likedQuotes == null) {
          return (
            <button onClick={() => handleQuoteLike(quote)}>
              <OpenHeart />
            </button>
          );
        } else if (likedQuotes.some((e) => e.id == quote.id)) {
          return (
            <button onClick={() => handleQuoteDislike(quote)}>
              <FilledHeart />
            </button>
          );
        } else {
          return (
            <button onClick={() => handleQuoteLike(quote)}>
              <OpenHeart />
            </button>
          );
        }
      })()}
    </>
  );
};
