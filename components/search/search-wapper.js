import { useState } from "react";

import SearchInput from "./search-input";

function SearchWrapper() {
  const [searchVal, setSearchVal] = useState("");

  const searchHandler = e => {
    setSearchVal(e.target.value);
  };

  return (
    <div>
      <SearchInput searchVal={searchVal} searchHandler={searchHandler} />
    </div>
  );
}

export default SearchWrapper;
