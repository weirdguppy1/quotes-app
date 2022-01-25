import { writeStorage } from "@rehooks/local-storage";

export const handleQuoteLike = (likedQuote) => {
  let currentValue = JSON.parse(localStorage.getItem("quotes:liked"));

  if (currentValue) {
    currentValue.push(likedQuote);
  } else {
    currentValue = [];
    currentValue.push(likedQuote);
  }

  writeStorage("quotes:liked", currentValue);
};

export const handleQuoteDislike = (likedQuote) => {
  let currentValue = JSON.parse(localStorage.getItem("quotes:liked"));
  if (!currentValue) return;

  const id = likedQuote.id;

  currentValue = currentValue.filter((e) => e.id !== id);
  console.log(currentValue);

  writeStorage("quotes:liked", currentValue);
};
