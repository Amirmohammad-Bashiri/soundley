import { useState } from "react";
import { motion } from "framer-motion";
import SearchPopupTabs from "./search-popup-tabs";

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
  },
};

function SearchPopup() {
  const [activeTab, setActiveTab] = useState("track");

  return (
    <motion.div
      key="search-popup"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-0 w-[500px] min-h-[500px] bg-gray-700 rounded top-20">
      <SearchPopupTabs setActiveTab={setActiveTab} />
    </motion.div>
  );
}

export default SearchPopup;
