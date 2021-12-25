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
      className="absolute z-10 left-5 sm:left-2 md:-left-20 xl:left-0 w-[250px] max-h-[300px] min-h-[300px] sm:w-[300px] sm:max-h-[400px] sm:min-h-[400px] md:w-[500px] md:max-h-[500px] overflow-y-scroll md:min-h-[500px] bg-black rounded top-20">
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
