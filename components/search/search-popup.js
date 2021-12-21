import { motion } from "framer-motion";

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
  return (
    <motion.div
      key="search-popup"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-0 w-[500px] min-h-[500px] bg-gray-700 rounded top-20"></motion.div>
  );
}

export default SearchPopup;
