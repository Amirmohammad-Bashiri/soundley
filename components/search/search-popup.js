import { useState } from "react";
import { motion } from "framer-motion";

import SearchPopupTabs from "./search-popup-tabs";
import SearchResults from "./search-results";
import { useSearch } from "@hooks/useSearch";

const dropIn = {
  hidden: {
    y: "10vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 50,
      stiffness: 500,
    },
  },
  exit: {
    y: "10vh",
    opacity: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 50,
      stiffness: 500,
    },
  },
};

function SearchPopup({ searchVal, setSearchVal }) {
  const [activeTab, setActiveTab] = useState("track");

  const { data, isLoading } = useSearch(activeTab, searchVal);

  return (
    <motion.div
      key="search-popup"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute z-10 left-0 w-[500px] max-h-[500px] overflow-y-scroll min-h-[500px] bg-gray-800 rounded top-20">
      <SearchPopupTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <SearchResults
        activeTab={activeTab}
        searchResult={data}
        setSearchVal={setSearchVal}
        isLoading={isLoading}
      />
    </motion.div>
  );
}

export default SearchPopup;
