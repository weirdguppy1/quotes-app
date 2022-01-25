import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { modalOpenAtom } from "../atoms";
import { useAtom } from "jotai";
import axios from "axios";
import QuoteCard from "./QuoteCard";

const SearchModal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setOpen] = useAtom(modalOpenAtom);
  const [quotes, setQuotes] = useState([]);

  function closeModal() {
    setOpen(false);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchTerm("");
    await axios
      .get(`https://api.quotable.io/search/quotes?query=${searchTerm}`)
      .then((res) => {
        setQuotes(res.data.results);
      });
  };

  const handleSearchChange = async (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="mt-4 flex justify-between items-center">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Search For Quotes
                </Dialog.Title>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-2 flex flex-col items-center space-y-2">
                <form
                  onSubmit={handleSearch}
                  className="flex flex-col space-y-2 w-full"
                >
                  <input
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search for one term"
                    className="border-2 rounded-lg p-2 focus:ring focus:ring-blue-400 focus:outline-none transform-all transition duration-250"
                  />
                  <button
                    className="bg-gray-100 text-coca rounded py-2 px-3"
                    type="submit"
                  >
                    Search 🔍
                  </button>
                </form>
                <div className="flex flex-col items-start space-y-2">
                  {quotes === [] ? (
                    <h2 className="text-sm text-black">No results.</h2>
                  ) : (
                    quotes.map((value) => {
                        return <QuoteCard key={value._id} id={value._id} content={value.content} author={value.author} />
                    })
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearchModal;
