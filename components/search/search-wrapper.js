import dynamic from "next/dynamic";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import SearchInput from "./search-input";

const SearchPopup = dynamic(() => import("./search-popup"));

function SearchWrapper() {
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <SearchInput searchTerm={searchTerm} searchHandler={searchHandler} />

      <AnimatePresence>
        {searchTerm ? (
          <SearchPopup setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default SearchWrapper;
