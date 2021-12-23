import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import SearchInput from "./search-input";
import SearchPopup from "./search-popup";

function SearchWrapper() {
  const [searchVal, setSearchVal] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const searchHandler = e => {
    setSearchVal(e.target.value);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="relative">
      <SearchInput
        searchVal={searchVal}
        searchHandler={searchHandler}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />

      <AnimatePresence>
        {searchVal ? <SearchPopup searchVal={searchVal} /> : null}
      </AnimatePresence>
    </div>
  );
}

export default SearchWrapper;
